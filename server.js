var http = require('http');
var path = require('path');
var fs = require('fs'); // put this in middleware??
var PORT = 8080;
var server = http.createServer(requestHandler);
var public = path.join(__dirname + '/public');
var stats = require('./cpu-data');

// server.on('request');******************** <-----

function requestHandler(req, res) {
  // console.log(req);

  // check for get request????

  switch(req.url) {
    case '/task-manager':
      taskManagerRoute(req, res, 'html');
      break;
    case '/taskManager.js':
      taskManagerRoute(req, res, 'js');
      break;
    case '/cpu-perc':
      sendCpuPerc(req, res);
      break;
    default:
      // redirect to root
      res.writeHead(302, { 'Location': '/task-manager' });
      res.end();
  }
}

// *** refactor this???
function taskManagerRoute(req, res, type) {
  var file;
  var headerType;

  switch(type) {
    case 'html':
      file = public + '/html/task-manager.html';
      headerType = 'text/html';
      break;
    case 'js':
      file = public + '/scripts/taskManager.js';
      headerType = 'text/javascript';
      break;
    // default?
  }

  fs.readFile(file, 'utf-8', function(err, contents) {
    if (err) {
      // return res.end(JSON.stringify(err));
      console.log(err);
    } else {
      res.setHeader('Content-Type', headerType);
      res.write(contents)
      res.end();
      // console.log('task m response', res);
    }
  });
}

function sendCpuPerc(req, res) {
  // returns undefined from getStats()....set to something?
  var currPerc = stats.percUsage.currCpuPerc() !== null ? stats.percUsage.currCpuPerc() : stats.percUsage.getStats();
// stats.percUsage.getStats();
console.log(currPerc);
// stats.percUsage.currCpuPerc(null, true);
  // console.log('currPerc', stats.percUsage.currCpuPerc);
  var perc = { data: currPerc };
  var respStr = JSON.stringify(perc);
  res.setHeader('Content-Type', 'application/json');
  // console.log(respStr);

  res.end(respStr);
}

server.listen(PORT, function() {
  console.log('server listening on port ' + PORT);
});



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