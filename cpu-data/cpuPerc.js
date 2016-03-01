var fs = require('fs');

var statTimeout;

function getStats(cpuReadData, stopReading) {

  if (stopReading) {
    console.log('stop timeout');
    return clearTimeout(statTimeout);
  }

  // firstRead, secondRead...will need to pass something in to this function?
  fs.readFile('/proc/stat', 'utf8', function(err, data) {
    var reads = [];
    var dataArr;
    var cpuLine;
    var cpuLineArr;
    var cpuRead = {};

    if (err) {
      console.log(err);
    }
    // var dataArr = data.split(' ');
    // var pcLoadNow = parseInt(dataArr[0]);

    // round to whole number
    // if (pcLoadNow > 0 && pcLoadNow < 1) {
    //   pcLoadNow = 1;

    // } else {
    //   pcLoadNow = Math.ceil(pcLoadNow);
    // }

    dataArr = data.split('\n');

    for (var i = 0; i < dataArr.length; i++) {
      if (dataArr[i].indexOf('cpu ') !== -1) {
        cpuLine = dataArr[i];
        break;
      }
    }

    cpuLineArr = cpuLine.split(' ');
    // console.log(cpuLineArr);

    cpuRead.userProcesses = parseInt(cpuLineArr[2]);
    cpuRead.niceProcesses = parseInt(cpuLineArr[3]);
    cpuRead.systemProcesses = parseInt(cpuLineArr[4]);
    cpuRead.idleProcesses = parseInt(cpuLineArr[5]);
    cpuRead.iowait = parseInt(cpuLineArr[6]);
    cpuRead.irq = parseInt(cpuLineArr[7]);
    cpuRead.softirq = parseInt(cpuLineArr[8]);
    cpuRead.steal = parseInt(cpuLineArr[9]);
    cpuRead.guest = parseInt(cpuLineArr[10]);
    cpuRead.guestNice = parseInt(cpuLineArr[11]);

    // ******* for timeout, what about execution of this....timeout 1 millisecond when called? not here??
    if (!cpuReadData) {
      reads.push(cpuRead);
      // need to get info after 1 sec
      // need to call this on timeout
      setTimeout(getStats, 1000, reads);
    } else {
      // add new snapshot, then calc
      cpuReadData.push(cpuRead);

      if (cpuReadData.length === 3) {
        // add new snapshot, remove old, then calc
        cpuReadData.shift();
      }
      // call this again to refresh data
      statTimeout = setTimeout(getStats, 1000, cpuReadData);
      return calcCpuPerc(cpuReadData);
    }
  });
}


function idleCalc(cpuReading) {
  return cpuReading.idleProcesses + cpuReading.iowait;
}

function nonIdleCalc(cpuReading) {
  return cpuReading.userProcesses + cpuReading.niceProcesses + cpuReading.systemProcesses
    + cpuReading.irq + cpuReading.softirq + cpuReading.steal;
}

function calcCpuPerc(cpuStates) {
  // get each index value in array and calc
  var read1 = cpuStates[0];
  var read2 = cpuStates[1];

  var firstIdle = idleCalc(read1);
  var secondIdle = idleCalc(read2);
  var firstNonIdle = nonIdleCalc(read1);
  var secondNonIdle = nonIdleCalc(read2);

  var firstTotal = firstIdle + firstNonIdle;
  var secondTotal = secondIdle + secondNonIdle;

  // differentiations
  var totalDiff = firstTotal - secondTotal;
  var idleDiff = firstIdle - secondIdle;

  var cpuPercentage = (totalDiff - idleDiff)/totalDiff;

  console.log('percentage', cpuPercentage);
  return cpuPercentage;
}

// test mode - stop doing this after 30 seconds
setTimeout(getStats, 6000, null, true);

module.exports = {
  getStats: getStats
};