console.log('hi');
var percEls = document.getElementsByClassName('cpu-perc');
console.log(percEls);
var polyline = document.getElementsByTagName('polyline')[0];
console.log(polyline);
var points = [];



function getPercXHR() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '/cpu-perc')
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // console.log(xhr.response.data);
      var data = JSON.parse(xhr.response);
      data = data.data
      // console.log(data);
      if (data >= 0) {
        updatePerc(data);
        updatePoints(data);
      }
    }
  };
  xhr.send();
}

function updatePerc(data) {
  for (var i = 0; i < percEls.length; i++) {
    percEls[i].innerHTML = data + '%';
  }
}

// get length of last one, pop off first if higher than 60
function updatePoints(data) {
  var pointsStr = '';
  var xCoord = 300 - (data * 3);
  var newPoint = [600, xCoord];
  var lastPoint = points[points.length - 1];
  points.push(newPoint);

  if (points.length > 60) {
    points.shift();
  }

  for (var i = 0; i < points.length - 1; i++) {
    points[i][0] -= 10;
    pointsStr += points[i].join(',') + ' ';
  }
  pointsStr = pointsStr.trim();
  console.log(pointsStr);
  // get last point
  polyline.setAttribute('points', pointsStr);
}

window.setInterval(getPercXHR, 1000);