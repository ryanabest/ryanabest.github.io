// define global variables
var table;
var hght = window.innerHeight*0.85;
var wdth = window.innerWidth;
var ymargin = hght/15;
var xmargin = wdth/20;
var zeroy = hght/10;
var zerox = wdth/10;
var maxy = hght - ymargin - (zeroy/2);
var miny = ymargin + (zeroy/2);

var ydiff;
var magscale;
var maxDate;
var minDate;
var totDateDiff;
var xDiffTime;

var eqDict = [];
var eqDataPoints = [];
var hoverList = [];

function preload() {
  // load data from either a local copy of one of the USGS CSVs or directly:
  table = loadTable("assets/significant_month.csv", "csv", "header");
  // or (while you're designing) from the feed itself:
  // table = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv", "csv", "header");
}

function setup() {
  var canv = createCanvas(wdth,hght);
  canv.parent('sketch');
  for (let r=0;r<table.getRowCount();r++) {
    eqDict.push(table.getRow(r)['obj']);
  }
  eqDict = _.orderBy(eqDict,['mag','time'],['desc','asc']);

  rowcount = table.getRowCount();
  xdiff = (wdth-(2*xmargin)-(2*zerox))/(rowcount-1);
  magscale = xdiff/7;

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

  ydiff = (maxy-miny)/(maxd-mind);

  sortedtime = sort(table.getColumn("time"));
  maxDate = new Date(table.get(0,"time"));
  minDate = new Date(sortedtime[0]);
  totDateDiff = (maxDate - minDate);
  xDiffTime = (wdth-(2*xmargin)-(2*zerox))/(totDateDiff);

  for (let e=0;e<eqDict.length;e++) {
    let eqDataPoint = new EQ(eqDict[e]['mag'],eqDict[e]['depth'],eqDict[e]['time'],eqDict[e]['place'],eqDict[e]['magType']);
    eqDataPoints.push(eqDataPoint);
  }
}

function draw() {
  background(240);
  drawAxes();

  for (let i=0;i<eqDataPoints.length;i++) {
    stroke(0);
    strokeWeight(3);
    eqDataPoints[i].drawLine();
  }

  // hoverList = [];
  for (let i=0;i<eqDataPoints.length;i++) {
    fill(255);
    eqDataPoints[i].drawCircle();
    eqDataPoints[i].addToHoverList();
  }

  hoverList = _.orderBy(hoverList,['mag'],['asc']);
  for (let i=0;i<eqDataPoints.length;i++) {
    eqDataPoints[i].drawShakeCircle();
    eqDataPoints[i].drawShakeText();
  }
  hoverList = [];
};

class EQ {
  constructor(mag,depth,time,place,magType) {
    this.place = place;
    this.mag = mag;
    this.depth = depth;
    this.time = new Date(time);
    this.eventDateDiff = (this.time - minDate);
    this.x = xmargin+zerox+(xDiffTime*(this.eventDateDiff));
    this.y = ymargin+zeroy+(this.depth*ydiff);
    this.diam = (this.mag-2)*magscale;
    this.rad = this.diam/2;
    this.rand = Math.pow(1.5,this.mag);
    this.magType = magType;
  }

  drawLine () {
    strokeWeight(3);
    stroke(0);
    line(this.x,ymargin+zeroy,this.x,this.y);
  }

  drawCircle() {
    fill(255);
    strokeWeight(3);
    ellipse(this.x,this.y,this.diam);
  }

  addToHoverList() {
    if (dist(this.x,this.y,mouseX,mouseY) <= this.rad) {
      hoverList.push(this);
    }
  }

  drawShakeCircle() {
    // hoverList = _.orderBy(hoverList,['mag'],['asc']);
    fill(255);
    strokeWeight(3);
    if (hoverList.length >= 1 && this.mag === hoverList[0]['mag'] && this.depth === hoverList[0]['depth'] && this.time.getTime() === new Date(hoverList[0]['time']).getTime()) {
      console.log(hoverList,this.place);
      this.x = xmargin+zerox+(xDiffTime*(this.eventDateDiff)) + random(-this.rand,this.rand);
      this.y = ymargin+zeroy+(this.depth*ydiff) + random(-this.rand,this.rand);
      ellipse(this.x,this.y,this.diam);
      this.x = xmargin+zerox+(xDiffTime*(this.eventDateDiff));
      this.y = ymargin+zeroy+(this.depth*ydiff);
    }
  }

  drawShakeText() {
    strokeWeight(0);
    fill(0);
    textAlign(CENTER);
    textStyle(BOLD);
    if (hoverList.length >= 1 && this.mag === hoverList[0]['mag'] && this.depth === hoverList[0]['depth'] && this.time.getTime() === new Date(hoverList[0]['time']).getTime()) {
      text(this.time.toLocaleDateString()
            + ' ' + ('0' + this.time.getHours()).slice(-2) + ':' + ('0' + this.time.getMinutes()).slice(-2) + ':' + ('0' + this.time.getSeconds()).slice(-2),wdth/2,ymargin/3);
      text(hoverList[0]['place'],wdth/2,2*ymargin/3);
      text("Depth: "+ hoverList[0]['depth'] + "km, Mag:"+hoverList[0]['mag']+hoverList[0]['magType'],wdth/2,ymargin);
    }
  }
}

function drawAxes() {
  strokeWeight(6);
  line(xmargin+zerox,ymargin+zeroy,wdth-xmargin-zerox,ymargin+zeroy);

  strokeWeight(0);
  fill(0);
  textAlign(CENTER);
  textStyle(BOLD);
  text("Magnitude",wdth-((xmargin+zerox)/2)-20,ymargin);
  text("Depth (km)",zerox/2,(zeroy+ymargin) + ((hght-ymargin-zeroy)/2));
  textStyle(NORMAL);
  text("3",wdth-2*xdiff,(ymargin)+(20*ydiff));
  text("9",wdth-xdiff,(ymargin)+(8*ydiff));

  for (let w=0;w<4;w++) {
    let tickDate = new Date('2017-09-' + String((w*7)+3));
    let tickDiffTime = (tickDate - minDate);
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
  }

  strokeWeight(0);
  stroke(0);
  fill(255);
  strokeWeight(3);
  ellipse(wdth-2*xdiff,ymargin+(13*ydiff)+(xdiff/2)-5,magscale);
  if (dist(wdth-2*xdiff,ymargin+(13*ydiff)+(xdiff/2)-5,mouseX,mouseY)<=magscale/2) {
    ellipse(wdth-2*xdiff+random(-Math.pow(1.5,3),Math.pow(1.5,3)),ymargin+(13*ydiff)+(xdiff/2)-5+random(-Math.pow(1.5,3),Math.pow(1.5,3)),magscale);
  }

  ellipse(wdth-xdiff,ymargin+(13*ydiff)+(xdiff/2)-5,xdiff);
  if (dist(wdth-xdiff,ymargin+(13*ydiff)+(xdiff/2)-5,mouseX,mouseY)<=xdiff/2) {
    ellipse(wdth-xdiff+random(-Math.pow(1.5,9),Math.pow(1.5,9)),ymargin+(13*ydiff)+(xdiff/2)-5+random(-Math.pow(1.5,9),Math.pow(1.5,9)),xdiff);
  }
}
