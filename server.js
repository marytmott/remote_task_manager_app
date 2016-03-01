var http = require('http');
var path = require('path');
var fs = require('fs'); // put this in middleware??
var PORT = 8080;
var server = http.createServer(requestHandler);
var rs = require('./middleware/cpuPerc');
var htmlDir = path.join(__dirname + '/html/');
console.log(htmlDir);

// rs.getStats();

// server.on('request');******************** <-----

// redirects for non-routes!!

function requestHandler(req, res) {
  console.log(req.url);

  // check for get request????

  switch(req.url) {
    case '/task-manager':
      sendTaskManager(req, res);
      break;
    default:
      // redirect to root
      res.writeHead(302, { 'Location': '/task-manager' });
      res.end();
  }
  // res.end('got it!');

  // if (req.url.indexOf('task-manager') !== -1) {
    // sendTaskManager(req, res);
  // }



  // parse URL
  // if (req.url.indexOf('') !== -1) {

  // } else if (req.url....)

  // get header
}

// *** refactor this???
function sendTaskManager(req, res) {
  fs.readFile(htmlDir + 'task-manager.html', 'utf-8', function(err, html) {
    if (err) {
      // return res.end(JSON.stringify(err));
      console.log(err);
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.write(html)
      res.end();
      console.log('task m response', res);
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