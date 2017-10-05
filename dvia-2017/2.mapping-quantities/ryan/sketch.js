// define a global variable to hold our USGS data
var table;
var hght = 600;
var wdth = 1200;
var ymargin = hght/15;
var xmargin = wdth/20;
var zeroy = hght/10;
var zerox = wdth/10;

function preload() {
  // load data from either a local copy of one of the USGS CSVs or directly:
  table = loadTable("assets/significant_month.csv", "csv", "header");
  // or (while you're designing) from the feed itself:
  // table = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv", "csv", "header");
}
var ell;
function setup() {
  createCanvas(wdth,hght);
}

function draw() {
  background(240);
  strokeWeight(6);
  //rect(xmargin,ymargin,wdth-(2*xmargin),hght-(2*ymargin));
  line(xmargin+zerox,ymargin+zeroy,wdth-xmargin-zerox,ymargin+zeroy);

  strokeWeight(3);
  //width
  rowcount = table.getRowCount();
  xdiff = (wdth-(2*xmargin)-(2*zerox))/(rowcount-1)

  //get max and mix depths
  maxd = table.getNum(0,"depth");
  mind = table.getNum(0,"depth");

  function getmaxdepth() {
    if (table.getNum(r,"depth") > maxd) {
      maxd = table.getNum(r,"depth")
    }
    return maxd
  };
  function getmindepth() {
    if (table.getNum(r,"depth") < mind) {
      mind = table.getNum(r,"depth")
    }
    return mind
  };

  for (r=0;r<rowcount;r++) {
    getmindepth();
    getmaxdepth();
  }


  var maxy = hght - ymargin - (zeroy/2);
  var miny = ymargin + (zeroy/2);
  var ydiff = (maxy-miny)/(maxd-mind);
  var magscale = xdiff/7;

  sortedtime = sort(table.getColumn("time"));
  // console.log(sortedtime);
  for (t=0;t<sortedtime.length;t++) {
    for (r=0;r<rowcount;r++) {
      if (sortedtime[t] === table.get(r,"time")) {
        //console.log(Date(table.get(r,"time")));
        Date.daysBetween = function( date1, date2 ) {
          //Get 1 day in milliseconds
          var one_day=1000*60*60*24;

          date1 = Date.parse(date1);
          date2 = Date.parse(date2);

          // Convert both dates to milliseconds
          var date1_ms = date1.getTime();
          var date2_ms = date2.getTime();

          // Calculate the difference in milliseconds
          var difference_ms = date2_ms - date1_ms;

          // Convert back to days and return
          return difference_ms/one_day;
        }
        datediff = Date.daysBetween(Date(sortedtime[t]),Date(table.get(0,"time")));
        console.log(datediff);
        var x = xmargin+zerox+(xdiff*(t));
        var y = ymargin+zeroy+(table.getNum(r,"depth")*ydiff);
        var diam = (table.getNum(r,"mag")-2)*magscale;
        var rad = diam/2;
        var rand = Math.pow(1.5,table.getNum(r,"mag"));

        line(x,ymargin+zeroy,x,y);
        if (mouseX <= x+rad && mouseX >= x-rad && mouseY <= y+rad && mouseY >= y-rad) {
          ellipse(x+random(-rand,rand),y+random(-rand,rand),diam);
          strokeWeight(0);
          textStyle(BOLD);
          text(table.getString(r,"time"),wdth/2,ymargin/3);
          text(table.getString(r,"place"),wdth/2,2*ymargin/3);
          text("Depth: "+table.getString(r,"depth") + "km, Mag:"+table.getString(r,"mag")+table.getString(r,"magType"),wdth/2,ymargin);
        } else {
          ellipse(x,y,diam);
        };
        strokeWeight(3);
      }
    }
  };

  //axes
  textAlign(LEFT);
  textStyle(NORMAL);
  text("Chronological →",xmargin+zerox,ymargin);
  translate(xmargin+(zerox/2),ymargin+zeroy);
  rotate(3*PI/2);
  textAlign(CENTER);
  text("0",0,0);
  text("← Depth (km)",-150,0);
  text(maxd,-(maxd*ydiff),0);
  rotate(-3*PI/2);
  translate(-(xmargin+(zerox/2)),-(ymargin+zeroy));

  textAlign(CENTER);
  text("Magnitude",wdth-((xmargin+zerox)/2),hght-ymargin-zeroy);

  if (mouseX <= wdth-2*xdiff+(xdiff/2) && mouseX >= wdth-2*xdiff-(xdiff/2) && mouseY <= hght-(xdiff/2)-5+(xdiff/24) && mouseY >= hght-(xdiff/2)-5-(xdiff/24)) {
    ellipse(wdth-2*xdiff+random(-Math.pow(1.5,3),Math.pow(1.5,3)),hght-(xdiff/2)-5+random(-Math.pow(1.5,3),Math.pow(1.5,3)),magscale);
  } else {
    ellipse(wdth-2*xdiff,hght-(xdiff/2)-5,magscale);
  };
  text("3",wdth-2*xdiff,hght-(xdiff/2)+15 );

  if (mouseX <= wdth-xdiff+(xdiff/2) && mouseX >= wdth-xdiff-(xdiff/2) && mouseY <= hght-5 && mouseY >= hght-5-xdiff) {
    ellipse(wdth-xdiff+random(-Math.pow(1.5,9),Math.pow(1.5,9)),hght-(xdiff/2)-5+random(-Math.pow(1.5,9),Math.pow(1.5,9)),xdiff);
  } else {
    ellipse(wdth-xdiff,hght-(xdiff/2)-5,xdiff);
  }
  text("9",wdth-xdiff,hght-(xdiff/2)-5)

};
