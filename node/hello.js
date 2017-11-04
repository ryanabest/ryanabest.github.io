// var Mta = require('mta-gtfs');
var mta = new Mta({
  key: '9b0444ee72bcbc313ab3306cd32bf6a0', // only needed for mta.schedule() method
  feed_id: 1                  // optional, default = 1
});

function setup() {

  var stops = [];
  // adding a map to put stops onto

  // create your own map
  mymap = L.map('subway-map').setView([40.74, -73.98], 12);

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


};

mta.stop().then(function (result) {
  for (var i=0;i<Object.keys(result).length;i++) {
    L.circle([40.680596, -73.955827], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(mymap);
  };
});

// result[Object.keys(result)[i]]['stop_lat'],result[Object.keys(result)[i]]['stop_lon']

// function drawstop(lat,lon) {
//   var stop = L.circle([lat,lon], {
//     color:red,
//     fillColor: '#f03',
//     fillOpacity: 1,
//     radius: 500,
//   })
//
//   stop.addTo(mymap);
//   stops.push(stop);
// }

// console.log(stops);

// mta.status('subway').then(add_delayed_lines);
//
// function add_delayed_lines(result) {
//   var lines = []
//   for (var i=0; i<result.length;i++) {
//     lines.push(result[i]['name']);
//   }
//   console.log(lines);
// };
//
// mta.stop(635).then(function (result) {
//   console.log(result);
// }).catch(function (err) {
//   console.log(err);
// });

// mta.schedule(635).then(function (result) {
//   console.log(Date(result['schedule'][635]['N'][0]['arrivalTime']));
// });
