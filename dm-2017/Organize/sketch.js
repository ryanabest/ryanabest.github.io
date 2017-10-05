// function preload() {
//   // load data from either a local copy of one of the USGS CSVs or directly:
//   //table = loadTable("assets/discogsdata.csv", "csv", "header");
//   // or (while you're designing) from the feed itself:
//   // table = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv", "csv", "header");
// }

var x;
var y;
var w;
var h;
var move;

function setup() {
  //rowcount = table.getRowCount();
  createCanvas(800,800);
  x = 400;
  y = 400;
  w = 100;
  h = 100;
  move = 800;
};

function draw() {
  background(200);

  stroke(50);
  fill(100);
  rect(x,y,w,h);
  rect(x+200,y,w,h);
  console.log(x);
  x = x - 1;
  if (x < 0) {
    x = 400;
  };
};

// function mousePressed() {
//   console.log("Pressed");
//   // for (i=0;i<800;i+=100) {
//   //   background(0);
//   //   fill(255,0,0);
//   //   createCanvas(800,800);
//   //   rect(x+i,y+i,w,h);
//   // }
// };
