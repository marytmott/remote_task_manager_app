var http = require('http');
var fs = require('fs');
var PORT = 8080;

function readInterval() {
  fs.readFile('/proc/loadavg', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    var dataArr = data.split(' ');
    var pcLoadNow = parseInt(dataArr[0]);

    // round to whole number
    // if (pcLoadNow > 0 && pcLoadNow < 1) {
    //   pcLoadNow = 1;

    // } else {
    //   pcLoadNow = Math.ceil(pcLoadNow);
    // }
    console.log(dataArr);
    console.log(pcLoadNow);
  });
}

function stopReading() {
  clearInterval(intervalReading);
  console.log('done');
}

// read the file every second
var intervalReading = setInterval(readInterval, 1000);

// test mode - stop doing this after 30 seconds
setTimeout(stopReading, 6000);


http.createServer(function(req, res) {

});

// http.listen(8080);

var currentSysInfo = {
  cpuUsagePoints: null,
  utlization: null,
  processes: null,
  threads: null,
  handles: null,
  upTime: null
};

var staticSysInfo = {
  cpu: null,
  maximumSpeed: null,
  sockets: null,
  cores: null,
  logicalProcessors: null,
  virtualization: true,
  l1Cache: null,
  l2Cache: null,
  l3Cache: null
};