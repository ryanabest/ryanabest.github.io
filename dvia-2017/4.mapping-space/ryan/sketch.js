// the dots we'll be adding to the map
var circles = [];

// table as the data set
var table;
var tableAll;
var tableJSON = [];
var eqEvents = [];
var circleRedList = [];
var index;

// dimension variables for timeline sketch and canvas
var hght = window.innerHeight*0.75;
var wdth = window.innerWidth*0.45;
var ymargin = hght/25;
var xmargin = wdth/15;
var zeroy = hght/10;
var zerox = wdth/10;
var ell;
var diam = 7;
var rad = diam/2;
var maxmag;
var rowcount;
var xdiff;
var ydiff;

// my leaflet.js map
var mymap;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("assets/1.0_month.csv", "csv", "header");
}

function setup() {
    loadData();

    // create your own map
    mymap = L.map('quake-map', {zoomControl:false,attributionControl:false}).setView([10.00, 0.00], 2);

    // load a set of map tiles (you shouldn't need to touch this)
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(mymap);

    for (let e=0;e<eqEvents.length;e++) {
      let EQ = eqEvents[e];
      EQ.drawLeafletPoint();
    }
}

function mousePressed() {
  if (mouseX<wdth) {
    for (let r=0;r<circleRedList.length;r++) {
      mymap.removeLayer(circleRedList[r]);
    }
    for (let e=0;e<eqEvents.length;e++) {
      let EQ = eqEvents[e];
      EQ.clicked(mouseX,mouseY);
      EQ.drawP5Circles();
      // ellipse(EQ.x,EQ.y,EQ.d);
      // console.log(EQ.d);
    }
  }
}

function draw() {
  sketchsetup();
  let hoverMag = [];
  let hoverFreq = 0;
  for (let e=0;e<eqEvents.length;e++) {
    let EQ = eqEvents[e];
    EQ.drawP5Circles();
    if (dist(mouseX,mouseY,EQ.x,EQ.y)<EQ.d) {
      if ($.inArray(EQ.dataRow.mag,hoverMag) === -1) {
        hoverMag.push(EQ.dataRow.mag);
      }
    }
  }
  for (let e=0;e<eqEvents.length;e++) {
    let EQ = eqEvents[e];
    for (let h=0;h<hoverMag.length;h++) {
      if (EQ.dataRow.mag===hoverMag[h]) {
        hoverFreq = hoverFreq + 1;
      }
    }
  }
  // console.log(hoverMag);

  if (hoverMag.length === 1) {
    fill(255);
    text(hoverMag+' ('+hoverFreq+' events)',mouseX+10,mouseY-20);
    text("Click to see on map",mouseX+10,mouseY-5);
  } else if (hoverMag.length > 1) {
    fill(255);
    var l = hoverMag.length-1;
    text(hoverMag[l]+' to '+hoverMag[0]+' ('+hoverFreq+' events)',mouseX+10,mouseY-20);
    text("Click to see on map",mouseX+10,mouseY-5);
  }
  // if (hoverMag) {
  //   fill(255);
  //   text(hoverMag+' ('+hoverFreq+' events)',mouseX+10,mouseY-20);
  //   text("Click to see on map",mouseX+10,mouseY-5);
  // }
}

class dataPoint {
  constructor(row,id) {
    this.dataRow = row;
    this.id = id;
    this.minmag = 0;
    this.x = xmargin+zerox+(xdiff*this.id);
    this.y = hght-ymargin-zeroy-(ydiff*this.dataRow.mag);
    this.d = diam;
    this.r = this.d/2;
    this.col = color(255,50);
  }
  drawP5Circles() {
    strokeWeight(0);
    fill(this.col);
    ellipse(this.x,this.y,this.d);
  }

  clicked(px,py) {
    if (px<wdth) {
      let clickMag = [];
      for (let e=0;e<eqEvents.length;e++) {
        let EQ = eqEvents[e];
        if (dist(px,py,EQ.x,EQ.y)<EQ.d) {
          if ($.inArray(EQ.dataRow.mag,clickMag) === -1) {
            clickMag.push(EQ.dataRow.mag);
          }
        }
      }
      if ($.inArray(this.dataRow.mag,clickMag) !== -1) {
        this.col = color(255,0,0);
        for (let c=0;c<circles.length;c++) {
          if (circles[c]['options']['mag'] === this.dataRow.mag) {
            let circleRed = L.circle([this.dataRow.latitude,this.dataRow.longitude], {
              color: 'red',
              fillOpacity:1,
              radius:10000,
            });
            circleRed.addTo(mymap);
            var tooltipText = "<div id='tooltip'><h1>"+this.dataRow.place+'</h1><h2>'+this.dataRow.time+'</h2><p>Magnitude: '+this.dataRow.mag+'</p></div>';
            circleRed.bindTooltip(tooltipText);
            circleRedList.push(circleRed);
          }
        }
      } else {
        this.col = color(255,50);
      }
    }
  }

  drawLeafletPoint() {
    strokeWeight(5);
    stroke(255,255,255);
    var circle = L.circle([this.dataRow.latitude, this.dataRow.longitude], {
        stroke: false,      // the dot stroke color
        fillColor: '#ffffff', // the dot fill color
        fillOpacity: 0.3,  // use some transparency so we can see overlaps
        radius: 1,
        id: this.id,
        mag: this.dataRow.mag
    });

    // place it on the map
    circle.addTo(mymap) //.on("click",showClickedCircleOnTimeline(i));
    // save a reference to the circle for later
    circles.push(circle)
  }

  showMagnitude(px,py) {
    text(this.dataRow.mag,px+10,py-10);
  }
}

function loadData() {
  for (i=0;i<table.rows.length;i++) {
    tableJSON.push(table.rows[i].obj);
  }
  tableJSON = _.orderBy(tableJSON,"mag","desc")
  // console.log(table.rows[0].obj);
  sortedtime = sort(table.getColumn("time"));
  rowcount = table.getRowCount();

  maxmag = tableJSON[0]['mag'];
  xdiff = (wdth-(2*xmargin)-(2*zerox))/(rowcount-1);
  ydiff = (hght-(2*ymargin)-(2*zeroy))/maxmag;

  for (let j=0;j<tableJSON.length;j++) {
    let eqEvent = new dataPoint(tableJSON[j],j);
    eqEvents.push(eqEvent);
  }
}

function sketchsetup() {
  var canv = createCanvas(wdth,hght);
  canv.parent('p5-sketch');
  background(0);
  stroke(155);
  strokeWeight(2);
  //x-axis
  line(xmargin+(zerox/2),hght-ymargin-zeroy,wdth-(xmargin+(zerox/2)),hght-ymargin-zeroy);
  //y-axis
  line(xmargin+(zerox/2),hght-(ymargin+(zeroy/2)),xmargin+(zerox/2),ymargin+(zeroy/2));
  textAlign(CENTER);
  strokeWeight(0);
  fill(255);
  text("Magnitude",xmargin,ymargin+(1*zeroy/3));
  textAlign(LEFT);
  text("    Each event ordered my magnitude (descending) →", xmargin+(zerox/2),hght-ymargin-(3*zeroy/4));
  for (let i=0;i<maxmag;i++) {
    let y = hght-ymargin-zeroy-(ydiff*i);
    let x1 = xmargin+(zerox/2);
    let x2 = wdth-(xmargin+(zerox/2));
    strokeWeight(0.15);
    line(x1,y,x2,y);
    strokeWeight(0);
    text(i,xmargin,y);
  }

}


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
