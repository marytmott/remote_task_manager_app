var http = require('http');
var PORT = 8080;
var server = http.createServer(requestHandler);
var rs = require('./middleware/cpuPerc');

rs.getStats();

function requestHandler(req, res) {

}

// server.listen(PORT, function() {
//   console.log('server listening on port ' + PORT);
// });



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