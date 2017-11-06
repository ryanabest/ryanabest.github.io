// list of all stops to map
var stops;

var circles = [];

var currentlat = 40.735310;
var currentlon = -73.994393;

// JQuery to adjust buttons for train direction
var trainDirection = 'uptown';
$(document).ready(function(){
  $("#uptown").click(function(){
    $("#uptown").css('background-color','white');
    $("#uptown").css('color','black');
    $("#downtown").css('background-color','black');
    $("#downtown").css('color','white');
    $(".stopi").css('color','red');
    $(".stopii").css('color','green');
    $(".stopiii").css('color','green');
    $(".stopiv").css('color','white');
    $(".stopv").css('color','green');
    trainDirection = 'uptown';
    return trainDirection;
  });
  $("#downtown").click(function(){
    $("#downtown").css('background-color','white');
    $("#downtown").css('color','black');
    $("#uptown").css('background-color','black');
    $("#uptown").css('color','white');
    $(".stopi").css('color','white');
    $(".stopii").css('color','red');
    $(".stopiii").css('color','red');
    $(".stopiv").css('color','white');
    $(".stopv").css('color','red');
    trainDirection = 'downtown';
    return trainDirection;
  });
});


function preload() {
  var url = 'assets/stops.json';
  stops = loadJSON(url);
  // console.log(url);
}

function setup() {
  // create your own map
  mymap = L.map('subway-map').setView([currentlat, currentlon], 15);

  // load a set of map tiles – choose from the different providers demoed here:
  // https://leaflet-extras.github.io/leaflet-providers/preview/
  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 19,
      // id: 'mapbox.streets',
      // accessToken: 'pk.eyJ1IjoicnlhbmFiZXN0IiwiYSI6ImNqOTdzdWRpcjBhNnMzMmxzcHMyemxkMm0ifQ.ot3NoRC2w8zCbVOCkv2e_w'
  }).addTo(mymap);

  // draw stops as circles
  for (i=0;i<Object.keys(stops).length;i++) {
    if (stops[Object.keys(stops)[i]]['parent_station'] === '') {
      var colorNum;
      var lat = stops[Object.keys(stops)[i]]['stop_lat'];
      var lon = stops[Object.keys(stops)[i]]['stop_lon'];
      var name = stops[Object.keys(stops)[i]]['stop_name'];
      var id = Object.keys(stops)[i];
      drawStop(lat,lon,name,id);
      // console.log(Object.keys(stops)[i])
    }
  };
  // place current latlon marker
  var marker = L.marker([currentlat,currentlon]).addTo(mymap);

  // noLoop();
  closestStops();

  // create canvas
};

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
    stopStatus = 'Good Service'
  } else if (num === 2) {
    stopStatus = 'Minor Delays'
  } else if (num === 3) {
    stopStatus = 'Major Delays'
  } else if (num === 4) {
    stopStatus = 'Delay Status Unknown'
  };
  return stopStatus;
}

// distance between two lat lon points per http://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

// draw each stop and add to circles list
function drawStop (lat,lon,name,id) {
  colorNum = Math.floor((Math.random() * 4) + 1);
  var distUnit = 'K';
  var currentDist = distance(lat,lon,currentlat,currentlon,distUnit);
  // console.log(currentDist);
  var circle = L.circle([lat,lon], {
    color: col(colorNum),
    // fillColor: '#f03',
    fillOpacity: 1,
    stopId: id,
    stopDist: currentDist,
    stopName: name
  });
  var popUpText = '<font size ="6"><b>' + name + '</b></font><br>' + status(colorNum) + '<br><img src = "assets/TwitterDelayExample.png"/>'
  circle.addTo(mymap);
  circle.bindPopup(popUpText);
  circles.push(circle);
};

function draw() {
  // console.log(trainDirection);
}

function closestStops(hbColorNum) {
  stopList = [];
  for (i=0;i<Object.keys(stops).length;i++) {
    if (stops[Object.keys(stops)[i]]['parent_station'] === '') {
      var hbColorNum = Math.floor((Math.random() * 4) + 1);
      var stopList_lat = stops[Object.keys(stops)[i]]['stop_lat'];
      var stopList_lon = stops[Object.keys(stops)[i]]['stop_lon'];
      var stopList_distUnit = 'K';
      var stopList_data = {
        stopList_id: Object.keys(stops)[i],
        stopList_name: stops[Object.keys(stops)[i]]['stop_name'],
        stopList_dist: distance(stopList_lat,stopList_lon,currentlat,currentlon,stopList_distUnit),
        stopList_color: col(hbColorNum),
        stopList_status: status(hbColorNum)
      }
      stopList.push(stopList_data);
    };
  };
  stopList = _.orderBy(stopList,['stopList_dist'],['asc']);
  var hbStopList = [];
  for (j=0;j<5;j++){
    hbStopList_data = {
      hbStopList_id: stopList[j]['stopList_id'],
      hbStopList_name: stopList[j]['stopList_name'],
      hbStopList_dist: stopList[j]['stopList_dist'],
      hbStopList_color: stopList[j]['stopList_color'],
      hbStopList_status: stopList[j]['stopList_status']
    };
    hbStopList.push(hbStopList_data);
  };
  console.log(hbStopList);
  return(hbStopList);
};
