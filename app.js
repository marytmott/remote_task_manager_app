// var http = require('http');
var fs = require('fs');
// var PORT = 8080;


function readInterval() {

}

// function calc(dataArr) {
//   // if first time calling
//   if (!dataArr.length) {
//     calcStats(null);
//   } else if (dataArr.length === 1) {
//     calcStats
//   }
// }


function getStats(cpuReadData) {
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
      if (dataArr[i].indexOf('cpu ') !== -1){
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

    // we need total time and idle time

    // control what to do with input

    // if no data yet
    // + call new function
    // add to new array and call again

    // ******* for timeout, what about execution of this....timeout 1 millisecond when called? not here??
    // DRY THIS UP!
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
      console.log(cpuReadData);
      // call this again to refresh data
      setTimeout(getStats, 1000, cpuReadData);
      calcCpuPerc(cpuReadData);
    }
  });
}


// another function to calc both

function calcCpuPerc(cpuStates) {
  // get each index value in array and calc
  console.log('calculating');
}



// one snapshot
// second snapshot

function stopReading() {
  clearInterval(intervalReading);
  console.log('done');
}

getStats();
// read the file every second
// var intervalReading = setInterval(getStats, 1000);

// test mode - stop doing this after 30 seconds
// setTimeout(stopReading, 6000);


// http.createServer(function(req, res) {

// });

// http.listen(8080);

// var currentSysInfo = {
//   cpuUsagePoints: null,
//   utlization: null,
//   processes: null,
//   threads: null,
//   handles: null,
//   upTime: null
// };

// var staticSysInfo = {
//   cpu: null,
//   maximumSpeed: null,
//   sockets: null,
//   cores: null,
//   logicalProcessors: null,
//   virtualization: true,
//   l1Cache: null,
//   l2Cache: null,
//   l3Cache: null
// };