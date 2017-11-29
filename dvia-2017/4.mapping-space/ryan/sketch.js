// an array for the magnitude
var magnitudes;
// an array for depth
var depths;
// an array for lat & long
var latitudes, longitudes;

// minimum and maximum values for magnitude and depth
var magnitudeMin, magnitudeMax;
var depthMin, depthMax;

// the dots we'll be adding to the map
var circles = [];

// table as the data set
var table;
var tableJSON = [];

// dimension variables for timeline sketch and canvas
var hght = window.innerHeight*0.3;
var wdth = window.innerWidth;
var ymargin = hght/15;
var xmargin = wdth/20;
var zeroy = hght/10;
var zerox = wdth/10;
var ell;

// my leaflet.js map
var mymap;

var val;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("assets/all_month.csv", "csv", "header");
    // table = loadTable("assets/significant_month.csv", "csv", "header");
}

function setup() {
    loadData();

    /*
    LEAFLET CODE

    In this case "L" is leaflet. So whenever you want to interact with the leaflet library
    you have to refer to L first.
    so for example L.map('mapid') or L.circle([lat, long])
    */

    // create your own map
    mymap = L.map('quake-map').setView([10.00, 0.00], 2);

    // load a set of map tiles (you shouldn't need to touch this)
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19,
    }).addTo(mymap);

    // draw p5 sketch
    sketchsetup()
    sketch()
    for (i=0;i<tableJSON.length;i++) {
      console.log(tableJSON[i].latitude);
    }

    // call our function (defined below) that populates the maps with markers based on the table contents
    drawDataPoints();
}

function draw() {
  // P5 sketch
}

function loadData() {
  for (i=0;i<table.rows.length;i++) {
    tableJSON.push(table.rows[i].obj);
  }
  tableJSON = _.orderBy(tableJSON,"mag","desc")
  // console.log(table.rows[0].obj);
  sortedtime = sort(table.getColumn("time"));
  rowcount = table.getRowCount();
  return tableJSON;
  return rowcount;
}

function sketchsetup() {
  var canv = createCanvas(wdth,hght);
  canv.parent('p5-sketch');
  background(0);
  stroke(155);
  strokeWeight(2);
  //x-axis
  line(xmargin+(zerox/2),hght-(ymargin+(zeroy/2)),wdth-(xmargin+(zerox/2)),hght-(ymargin+(zeroy/2)));
  //y-axis
  line(xmargin+(zerox/2),hght-(ymargin+(zeroy/2)),xmargin+(zerox/2),ymargin+(zeroy/2));

}

function sketch() {

  var rowcount = tableJSON.length;

  // get max and mix magnitudes
  var maxmag = tableJSON[0].mag;
  var minmag = 0;

  // determine increments for each new data point
  var xdiff = (wdth-(2*xmargin)-(2*zerox))/(rowcount-1);
  var ydiff = (hght-(2*ymargin)-(2*zeroy))/maxmag;

  // circle diameter
  var diam = 5;
  // if (xdiff > 10) {
  //   diam = 10;
  // } else {
  //   diam = xdiff;
  // };
  var rad = diam/2;


  // draw circles on sketch
  for (i=0;i<rowcount;i++) {
    strokeWeight(0);
    fill(255,255,255);
    var x = xmargin+zerox+(xdiff*i);
    var y = hght-ymargin-zeroy-(ydiff*tableJSON[i].mag);
    var rand = Math.pow(1.2,tableJSON[i].mag);
    ellipse(x,y,diam);
    // if (mouseX <= x+rad && mouseX >= x-rad && mouseY <= y+rad && mouseY >= y-rad) {
    //   ellipse(x+random(-rand,rand),y+random(-rand,rand),diam);
    // } else {
    //   ellipse(x,y,diam);
    // }
  }

  // function draw rectancle() {
  //   var
  // }

  // old code for "tooltip"
  // strokeWeight(0);
  // textStyle(BOLD);
  // fill(0);
  // text(table.getString(r,"time"),wdth/2,ymargin/3);
  // text(table.getString(r,"place"),wdth/2,2*ymargin/3);
  // text("Depth: "+table.getString(r,"depth") + "km, Mag:"+table.getString(r,"mag")+table.getString(r,"magType"),wdth/2,ymargin);
};

function drawDataPoints(){
    strokeWeight(5);
    stroke(255,255,255);

    // cycle through the parallel arrays and add a dot for each event
    for(var i=0; i<tableJSON.length; i++){
        // create a new dot
        var circle = L.circle([tableJSON[i].latitude, tableJSON[i].longitude], {
            color: 'white',      // the dot stroke color
            // fillColor: '#D3D3D3', // the dot fill color
            fillOpacity: 1,  // use some transparency so we can see overlaps
            radius: 1
        });

        // place it on the map
        circle.addTo(mymap) //.on("click",showClickedCircleOnTimeline(i));

        // save a reference to the circle for later
        circles.push(circle)
    }
}

function drawHighlightedCircle(i) {
  for (r=0;r<rowcount;r++) {
    if (sortedtime[i] === table.get(r,"time")) {
      var circle = L.circle([latitudes[i], longitudes[i]], {
          color: 'red',      // the dot stroke color
          fillColor: 'red', // the dot fill color
          fillOpacity: 1,  // use some transparency so we can see overlaps
          radius: 10
      });

      // place it on the map
      circle.addTo(mymap);

      // save a reference to the circle for later
      circles.push(circle)

    }
  }
};

// function showClickedCircleOnTimeline(j) {
//   for (r=0;r<rowcount;r++) {
//     if (sortedtime[j] === table.get(r,"time")) {
//       fill(255,255,255,150);
//       //console.log(Date(table.get(r,"time")));
//       var maxy = hght - ymargin - (zeroy/2);
//       var miny = ymargin + (zeroy/2);
//       var ydiff = (maxy-miny)/(maxd-mind);
//       var magscale = 3;
//       var rdate = new Date(sortedtime[j]);
//       var maxdate = new Date(table.get(0,"time"));
//       var mindate = new Date(sortedtime[0]);
//       var totdatediff = (maxdate - mindate);
//       var xdifftime = (wdth-(2*xmargin)-(2*zerox))/(totdatediff);
//       var rdatediff = (rdate - mindate);
//       // console.log(rdatediff);
//       var x = xmargin+zerox+(xdifftime*(rdatediff));
//       var y = ymargin+zeroy+(table.getNum(r,"depth")*ydiff);
//       var diam = (table.getNum(r,"mag")-2)*magscale;
//       var rad = diam/2;
//       var rand = Math.pow(1.5,table.getNum(r,"mag"));
//       ellipse(x+random(-rand,rand),y+random(-rand,rand),diam);
//     }
//   }
// }

function removeAllCircles(){
    // remove each circle from the map and empty our array of references
    circles.forEach(function(circle, i){
        mymap.removeLayer(circle);
    })
    circles = [];
}

// get the maximum value within a column
function getColumnMax(columnName){
    // get the array of strings in the specified column
    var colStrings = table.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the max value by manually stepping through the list and replacing `m` each time we
    // encounter a value larger than the biggest we've seen so far
    var m = 0.0;
    for(var i=0; i<colValues.length; i++){
        if (colValues[i] > m){
            m = colValues[i];
        }
    }
    return m;
    // or do it the 'easy way' by using lodash:
    // return _.max(colValues);
}

// function draw() {
//   console.log(magslider.value());
// }
