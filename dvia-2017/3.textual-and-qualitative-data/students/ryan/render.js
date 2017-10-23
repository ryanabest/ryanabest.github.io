#!/usr/bin/env node
var fs = require('fs'),
    _ = require('lodash'),
    handlebars = require('handlebars');

var tmplSource = fs.readFileSync('template.html', 'utf-8'),
    template = handlebars.compile(tmplSource),
    data = JSON.parse(fs.readFileSync('assets/shows.json', 'utf-8'));
    pop = JSON.parse(fs.readFileSync('assets/popularity.json','utf-8'));

var byArtist = _.groupBy(data, 'artist');
    byVenue = _.groupBy(data, 'venue'),
    names = _.uniq(_.map(data, 'artist')).sort();
    venues = _.uniq(_.map(data, 'venue')).sort();

pop = _.sortBy(pop,'visits').reverse();

var venuesorted = _.sortBy(pop,function(item) {
  return venues.indexOf(item.visits)
})

// names.forEach(function(name){
//   shows.push(byArtist[name])
// })

var places = []
for (i=0;i<venuesorted.length;i++) {
  places.push(_.map(venuesorted,'venue')[i])
}

for (i=0;i<Object.keys(byVenue).length;i++) {
  for (j=0;j<byVenue[Object.keys(byVenue)[i]].length;j++) {
    var ampm = byVenue[Object.keys(byVenue)[i]][j]['schedule']['start'].slice(-2);
    if (ampm === 'AM') {
      byVenue[Object.keys(byVenue)[i]][j]['time']['startHour'] = byVenue[Object.keys(byVenue)[i]][j]['time']['startHour'] + 24;
    };
  };
  byVenue[Object.keys(byVenue)[i]] = _.orderBy(byVenue[Object.keys(byVenue)[i]],['time[day]','time[startHour]','time[startMinute]'],['asc','asc','asc'])
}


// console.log(places);

var byVenueEachDay = []
for (i=0;i<places.length;i++) {
  for (j=0;j<4;j++) {
    for (k=0;k<byVenue[places[i]].length;k++) {
      var venue = places[i];
      var band = ' '
      var settime = ' '
      if (byVenue[places[i]][k]['time']['day'] === j) {
        venue = places[i];
        band = byVenue[places[i]][k]['artist'];
        settime = byVenue[places[i]][k]['schedule']['start'] + '  ........  ' + byVenue[places[i]][k]['schedule']['end'];
        var byVenueEachDayObj = {place:venue, day:j, artistname:band, showtime:settime};
        byVenueEachDay.push(byVenueEachDayObj);
      }
    }
    var venue = places[i];
    var band = ' '
    var settime = ' '
    var byVenueEachDayObj = {place:venue, day:j, artistname:band, showtime:settime};
    byVenueEachDay.push(byVenueEachDayObj);
  }
}

// byVenueEachDay = _.groupBy(byVenueEachDay,'day')

// console.log(byArtist['Kamasi Washington'][0]['venue']);
// for (i=0;i<byVenueEachDay.length;i++) {
//   if (byVenueEachDay[i]['place'] === 'Brooklyn Bowl') {
//     console.log(byVenueEachDay[i]);
//   };
// }

// day one
var day_one_shows = []
 for (j=0;j<byVenueEachDay.length;j++) {
   var venue1;
   var band1;
   var settime1;
   if (byVenueEachDay[j]['day'] == 0) {
     venue1 = byVenueEachDay[j]['place'];
     band1 = byVenueEachDay[j]['artistname'];
     showtime1 = byVenueEachDay[j]['showtime'];
     var day_one_shows_obj = {place1: venue1, artistname1: band1, settime1: showtime1}
     day_one_shows.push(day_one_shows_obj);
   }
 };

var day_one_shows_grouped = _.groupBy(day_one_shows,'place1')


 // console.log(day_one_shows_grouped);

 // day two
 var day_two_shows = []
  for (j=0;j<byVenueEachDay.length;j++) {
    var venue2;
    var band2;
    var settime2;
    if (byVenueEachDay[j]['day'] == 1) {
      venue2 = byVenueEachDay[j]['place'];
      band2 = byVenueEachDay[j]['artistname'];
      showtime2 = byVenueEachDay[j]['showtime'];
      var day_two_shows_obj = {place2: venue2, artistname2: band2, settime2: showtime2}
      day_two_shows.push(day_two_shows_obj);
    }
  };

 var day_two_shows_grouped = _.groupBy(day_two_shows,'place2')

 // console.log(day_two_shows_grouped);

  // day three
  var day_three_shows = []
   for (j=0;j<byVenueEachDay.length;j++) {
     var venue3;
     var band3;
     var settime3;
     if (byVenueEachDay[j]['day'] == 2) {
       venue3 = byVenueEachDay[j]['place'];
       band3 = byVenueEachDay[j]['artistname'];
       showtime3 = byVenueEachDay[j]['showtime'];
       var day_three_shows_obj = {place3: venue3, artistname3: band3, settime3: showtime3}
       day_three_shows.push(day_three_shows_obj);
     }
   };

  var day_three_shows_grouped = _.groupBy(day_three_shows,'place3')


   // day four
   var day_four_shows = []
    for (j=0;j<byVenueEachDay.length;j++) {
      var venue4;
      var band4;
      var settime4;
      if (byVenueEachDay[j]['day'] == 3) {
        venue4 = byVenueEachDay[j]['place'];
        band4 = byVenueEachDay[j]['artistname'];
        showtime4 = byVenueEachDay[j]['showtime'];
        var day_four_shows_obj = {place4: venue4, artistname4: band4, settime4: showtime4}
        day_four_shows.push(day_four_shows_obj);
      }
    };

   var day_four_shows_grouped = _.groupBy(day_four_shows,'place4')

// for (i=0;i<places.length;i++) {
//   console.log(places[i]);
//   for (j=0;j<day_one_shows.length;j++) {
//     if (places[i] === day_one_shows[j]['venue']) {
//       console.log(day_one_shows[j]['artist']);
//     }
//   }
// }


var byVenueEachDayGrouped = _.groupBy(byVenueEachDay,'place')

 // console.log(byVenueEachDay);

 for (i=0;i<Object.keys(byVenueEachDayGrouped).length;i++) {
   byVenueEachDayGrouped[Object.keys(byVenueEachDayGrouped)[i]] = _.groupBy(byVenueEachDayGrouped[Object.keys(byVenueEachDayGrouped)[i]],'day');
  //  console.log(byVenueEachDayGrouped[Object.keys(byVenueEachDayGrouped)[i]]);
 }

 console.log(byVenueEachDayGrouped['Brooklyn Bowl']);

var markup = template({byVenueEachDay: byVenueEachDayGrouped})
fs.writeFileSync('site/index.html', markup)
