// define a global variable to hold our USGS data
var table;
var hght = window.innerHeight;
var wdth = window.innerWidth;
var ymargin = hght/15;
var xmargin = wdth/20;
var zeroy = hght/10;
var zerox = wdth/10;

var ydiff;
var magscale;

var eqDict = [];
var hoverList = [];

function preload() {
  // load data from either a local copy of one of the USGS CSVs or directly:
  table = loadTable("assets/significant_month.csv", "csv", "header");
  // or (while you're designing) from the feed itself:
  // table = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv", "csv", "header");
}
var ell;
function setup() {
  createCanvas(wdth,hght);
  for (let r=0;r<table.getRowCount();r++) {
    eqDict.push(table.getRow(r)['obj']);
  }
  eqDict = _.orderBy(eqDict,['mag','time'],['desc','asc']);

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
  ydiff = (maxy-miny)/(maxd-mind);
  magscale = xdiff/7;

  sortedtime = sort(table.getColumn("time"));
}

function draw() {
  background(240);
  strokeWeight(6);

  let maxDate = new Date(table.get(0,"time"));
  let minDate = new Date(sortedtime[0]);
  let totDateDiff = (maxDate - minDate);
  let xDiffTime = (wdth-(2*xmargin)-(2*zerox))/(totDateDiff);

  //AXES

  line(xmargin+zerox,ymargin+zeroy,wdth-xmargin-zerox,ymargin+zeroy);
  strokeWeight(0);
  fill(0);
  textAlign(CENTER);
  textStyle(BOLD);
  // text("Chronological →",xmargin+zerox,ymargin);
  text("Magnitude",wdth-((xmargin+zerox)/2)-20,hght-ymargin-zeroy);
  text("Depth (km)",zerox/2,(zeroy+ymargin) + ((hght-ymargin-zeroy)/2));
  textStyle(NORMAL);
  text("3",wdth-2*xdiff,(ymargin+zeroy)+(195*ydiff));
  text("9",wdth-xdiff,(ymargin+zeroy)+(182*ydiff));

  for (let w=0;w<4;w++) {
    let tickDate = new Date('2017-09-' + String((w*7)+3));
    let tickDiffTime = (tickDate - minDate);
    console.log(tickDiffTime);
    console.log(tickDate);
    let xTick = xmargin+zerox+(xDiffTime*(tickDiffTime));
    strokeWeight(0.75);
    stroke(50);
    textAlign(RIGHT);
    line(xTick,15*(ymargin+zeroy)/16,xTick,11*(ymargin+zeroy)/16);
    strokeWeight(0);
    fill(50);
    textAlign(RIGHT);
    text(tickDate.toLocaleDateString() + '  ',xTick,3*(ymargin+zeroy)/4);
  }

  textAlign(LEFT);
  for (let i=0;i<maxd;i+=25) {
    text(i,3*(zerox+xmargin)/4,(ymargin+zeroy)+(i*ydiff));
    strokeWeight(0.25);
    stroke(175);
    line(zerox+xmargin,(ymargin+zeroy)+(i*ydiff),wdth-(zerox+xmargin),(ymargin+zeroy)+(i*ydiff));
    // console.log(i);
  }
  stroke(0);
  strokeWeight(3);
  //width
  // console.log(sortedtime);


  for (let e=0;e<eqDict.length;e++) {
    let eventDate = new Date(eqDict[e]['time']);
    let eventDateDiff = (eventDate - minDate);
    let x = xmargin+zerox+(xDiffTime*(eventDateDiff));
    let y = ymargin+zeroy+(eqDict[e]['depth']*ydiff);
    line(x,ymargin+zeroy,x,y);
  }

  for (let e=0;e<eqDict.length;e++) {
    let eventDate = new Date(eqDict[e]['time']);
    let eventDateDiff = (eventDate - minDate);
    let x = xmargin+zerox+(xDiffTime*(eventDateDiff));
    let y = ymargin+zeroy+(eqDict[e]['depth']*ydiff);
    let diam = (eqDict[e]['mag']-2)*magscale;
    let rad = diam/2;
    let rand = Math.pow(1.5,eqDict[e]['mag']);
    // if (mouseX <= x+rad && mouseX >= x-rad && mouseY <= y+rad && mouseY >= y-rad) {
    //   // fill(255);
    //   // ellipse(x+random(-rand,rand),y+random(-rand,rand),diam);
    // } else {
    //   // hoverList = [];
    //   // console.log(x);
    fill(255);
    ellipse(x,y,diam);
    // }
  }
  // rect(wdth/3,0,(wdth)/3,zeroy);

  function drawShake() {
    hoverList = [];
    for (let e=0;e<eqDict.length;e++) {
      let eventDate = new Date(eqDict[e]['time']);
      let eventDateDiff = (eventDate - minDate);
      let x = xmargin+zerox+(xDiffTime*(eventDateDiff));
      let y = ymargin+zeroy+(eqDict[e]['depth']*ydiff);
      let diam = (eqDict[e]['mag']-2)*magscale;
      let rad = diam/2;
      if (mouseX <= x+rad && mouseX >= x-rad && mouseY <= y+rad && mouseY >= y-rad) {
        hoverList = [];
        hoverList.push(eqDict[e]);
      } else {
        // hoverList = [];
      }
    }
  }

  drawShake();
  if (hoverList.length >= 1) {
    // console.log(hoverList[0]['time']);
    let eventDate = new Date(hoverList[0]['time']);
    let eventDateDiff = (eventDate - minDate);
    let x = xmargin+zerox+(xDiffTime*(eventDateDiff));
    let y = ymargin+zeroy+(hoverList[0]['depth']*ydiff);
    let diam = (hoverList[0]['mag']-2)*magscale;
    let rad = diam/2;
    let rand = Math.pow(1.5,hoverList[0]['mag']);
    fill(255);
    ellipse(x+random(-rand,rand),y+random(-rand,rand),diam);
    fill(240);
    strokeWeight(0);
    rect(wdth/3,0,(wdth)/3,zeroy);
    fill(0);
    textAlign(CENTER);
    textStyle(BOLD);
    text(String(eventDate.getMonth()+1) + '-' + eventDate.getDate() + '-' + eventDate.getFullYear()
          + ', ' + ('0' + eventDate.getHours()).slice(-2) + ':' + ('0' + eventDate.getMinutes()).slice(-2) + ':' + ('0' + eventDate.getSeconds()).slice(-2),wdth/2,ymargin/3);
    text(hoverList[0]['place'],wdth/2,2*ymargin/3);
    text("Depth: "+ hoverList[0]['depth'] + "km, Mag:"+hoverList[0]['mag']+hoverList[0]['magType'],wdth/2,ymargin);
    fill(255);
    strokeWeight(3);
  }



  // text(maxd,3*(zerox+xmargin)/4,(ymargin+zeroy)+(maxd*ydiff));

  // rotate(-3*PI/2);
  // translate(-(xmargin+(zerox/2)),-(ymargin+zeroy));
  strokeWeight(0);
  textAlign(CENTER);
  fill(255);
  strokeWeight(3);
  ellipse(wdth-2*xdiff,hght-(xdiff/2)-5,magscale);
  if (mouseX <= wdth-2*xdiff+(xdiff/2) && mouseX >= wdth-2*xdiff-(xdiff/2) && mouseY <= hght-(xdiff/2)-5+(xdiff/24) && mouseY >= hght-(xdiff/2)-5-(xdiff/24)) {
    ellipse(wdth-2*xdiff+random(-Math.pow(1.5,3),Math.pow(1.5,3)),hght-(xdiff/2)-5+random(-Math.pow(1.5,3),Math.pow(1.5,3)),magscale);
  }
  fill(0);

  fill(255);

  ellipse(wdth-xdiff,hght-(xdiff/2)-5,xdiff);
  if (mouseX <= wdth-xdiff+(xdiff/2) && mouseX >= wdth-xdiff-(xdiff/2) && mouseY <= hght-5 && mouseY >= hght-5-xdiff) {
    ellipse(wdth-xdiff+random(-Math.pow(1.5,9),Math.pow(1.5,9)),hght-(xdiff/2)-5+random(-Math.pow(1.5,9),Math.pow(1.5,9)),xdiff);
  }
};
