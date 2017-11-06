var Mta = require('mta-gtfs');
var mta = new Mta({
  key: '9b0444ee72bcbc313ab3306cd32bf6a0', // only needed for mta.schedule() method
  feed_id: 1                  // optional, default = 1
});


var jsonfile = require('jsonfile')


// LOAD ALL STOPS INTO STATIC JSON FILE STOPS.JSON
// mta.stop().then(function (result) {
//   var file = 'assets/stops.json';
//   var obj = result;
//   // var file1 = JSON.parse(file);
//   jsonfile.writeFile(file, obj, function (err) {
//     console.error(err)
//   });
//   // console.log(typeof JSON.stringify(obj));
// });

// mta.stop().then(function (result) {
//   mta.schedule(Object.keys(result)).then(function (result1) {
//     console.log(result1);
//   });
// });

mta.stop().then(function (result) {
  for (i=0;i<Object.keys(result).length;i++) {
    if (result[Object.keys(result)[i]]['parent_station'] === '') {
      var stationID = Object.keys(result)[i];
      mta.schedule(stationID).then(function(results){
        console.log(results);
      });
      // console.log(Object.keys(result)[i]);
    };
    // console.log(typeof Object.keys(result)[i]);
  };
});

mta.schedule('R20', 1).then(function (result) {
  console.log(result);
});
