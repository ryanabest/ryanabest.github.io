// list of all stops to map
var stops;

var colors = [];
var circles = [];

var currentlat = 40.76;
var currentlon = -73.96;

// JQuery to adjust buttons for train direction


function preload() {
  var url = 'assets/stops.json';
  stops = loadJSON(url);
  // console.log(url);
}

_.mixin({
    'sortKeysBy': function (obj, comparator) {
        var keys = _.sortBy(_.keys(obj), function (key) {
            return comparator ? comparator(obj[key], key) : key;
        });

        return _.zipObject(keys, _.map(keys, function (key) {
            return obj[key];
        }));
    }
});

function setup() {
  // create your own map
  mymap = L.map('subway-map', { zoomControl:false }).setView([currentlat, currentlon], 12);

  // load a set of map tiles – choose from the different providers demoed here:
  // https://leaflet-extras.github.io/leaflet-providers/preview/
  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 19,
      // id: 'mapbox.streets',
      // accessToken: 'pk.eyJ1IjoicnlhbmFiZXN0IiwiYSI6ImNqOTdzdWRpcjBhNnMzMmxzcHMyemxkMm0ifQ.ot3NoRC2w8zCbVOCkv2e_w'
  }).addTo(mymap);

  // place current latlon marker
  // var marker = L.marker([currentlat,currentlon]).addTo(mymap);

  assignAllColors();
  colors = _.groupBy(colors,'id');
  // draw stops as circles
  for (i=0;i<Object.keys(stops).length;i++) {
    if (stops[Object.keys(stops)[i]]['parent_station'] === '') {
      var lat = stops[Object.keys(stops)[i]]['stop_lat'];
      var lon = stops[Object.keys(stops)[i]]['stop_lon'];
      var name = stops[Object.keys(stops)[i]]['stop_name'];
      var id = Object.keys(stops)[i];
      drawStop(lat,lon,name,id);
      // console.log(Object.keys(stops)[i])
    }
  };
  mapCircles();
  console.log(circles);
};

function draw() {
  resizeAllCircles();
  // console.log(((Math.random() * 0.5) - 0.25));
}


// Random delay status (placeholder)
function col(num) {
  var stopColor;
  if (num === 1) {
    stopColor = 'green'
  } else if (num === 2) {
    stopColor = 'yellow'
  } else if (num === 3) {
    stopColor = 'red'
  } else if (num === 4) {
    stopColor = 'white'
  };
  return stopColor;
};

function status(num) {
  var stopStatus;
  if (num === 1) {
    stopStatus = 'MTA Reports Good Service'
  } else if (num === 2) {
    stopStatus = 'MTA Reports Minor Delays'
  } else if (num === 3) {
    stopStatus = 'MTA Reports Major Delays'
  } else if (num === 4) {
    stopStatus = 'MTA Delay Status Unknown'
  };
  return stopStatus;
}

function assignAllColors() {
  function assignColor(id) {
    var colorNum = Math.floor((Math.random() * 4) + 1);
    var colorPoint  = {
      id: id,
      color: col(colorNum),
      status: status(colorNum)
    };
    colors.push(colorPoint);
  }
  for (i=0;i<Object.keys(stops).length;i++) {
    if (stops[Object.keys(stops)[i]]['parent_station'] === '') {
      assignColor(Object.keys(stops)[i]);
    }
  }
}


// draw each stop and add to circles list
function drawStop (lat,lon,name,id) {
  colorNum = Math.floor((Math.random() * 4) + 1);
  var distUnit = 'K';
  // var currentDist = distance(lat,lon,currentlat,currentlon,distUnit);
  // console.log(currentDist);
  var circle = L.circleMarker([lat,lon], {
    color: colors[id][0]['color'],
    // fillColor: '#f03',
    fillOpacity: 1,
    stopId: id,
    // stopDist: currentDist,
    stopName: name,
    radius: Number(Math.random() * 4)
  });
  var popUpText = '<font color = "white" size ="6"><b>' + name + '</b></font><br><font size = "4" color="' + colors[id][0]['color'] + '">' + colors[id][0]['status'] + '</font>'
  // circle.addTo(mymap);
  circle.bindPopup(popUpText);
  circles.push(circle);
};

function mapCircles() {
  // circles = _.sortBy(circles,'_radius','desc');
  circles.forEach(function(circle, i){
    circle.addTo(mymap);
  });
}


function removeAllCircles(){
    // remove each circle from the map and empty our array of references
    circles.forEach(function(circle, i){
        mymap.removeLayer(circle);
    })
    circles = [];
};

function resizeAllCircles() {
  circles.forEach(function(circle, i) {
    var resizeNum = resize(circle['_radius']);
    circle.setRadius(resizeNum);
    circle['_radius'] = resizeNum;
  })
}

function resize(num) {
  num = num + ((Math.random() * 0.4) - 0.2);
  if (num < 0) {
    num = 0
  }
  if (num > 10) {
    num = 0
  }
  return num;
}

// function reorder() {
//   circles = _.
// }
