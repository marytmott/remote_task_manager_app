var http = require('http');
var path = require('path');
var fs = require('fs'); // put this in middleware??
var PORT = 8080;
var server = http.createServer(requestHandler);
var stats = require('./cpu-data');
var public = path.join(__dirname + '/public');

stats.percUsage.getStats();

// server.on('request');******************** <-----

function requestHandler(req, res) {
  console.log(req);

  // check for get request????

  switch(req.url) {
    case '/task-manager':
      taskManagerRoute(req, res, 'html');
      break;
    case '/taskManager.js':
      taskManagerRoute(req, res, 'js');
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