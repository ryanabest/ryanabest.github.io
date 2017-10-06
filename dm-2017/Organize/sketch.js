function preload() {
  // load data from either a local copy of one of the USGS CSVs or directly:
  // discogsdata = loadTable("assets/discogsdata.csv", "csv", "header");
  // tracklist = loadTable("assets/tracklist.csv", "csv", "header");
  // genres_and_styles = loadTable("assets/genres_and_styles.csv", "csv", "header");
  // or (while you're designing) from the feed itself:
}
var slider;
function setup() {
  // rowcount = discogsdata.getRowCount();
  // slider = createSlider(0,rowcount,0);
  imgs = []
  // for (r=0;r<rowcount;r++) {
  //   imgs.push("img"+r);
  // };
  // for (i=0;i<imgs.length;i++) {
  //   imgs[i] = loadImage(discogsdata.get(i,"image"));
  // };
  img0 = loadimage(" https://img.discogs.com/omVDcifhRmbT3rNnsPPD1fXIqig=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10105639-1491701050-6735.jpeg.jpg");
};

function draw() {
  // background(200);
  // fill(100);
  // stroke(50);
  // rect(x,y,w,h);
  // fill(250,0,0);
  // rect(x+width,y,w,h);
  // console.log(x);
  //x = x - 1;
  image(img0,0,0);
  // var val = slider.value();
  // console.log(val);
};

// function mousePressed() {
//   x=x-800;
//   img = createImg(discogsdata.get(1,"image"));
//   console.log("Pressed");
//   // for (i=0;i<800;i+=100) {
//   //   background(0);
//   //   fill(255,0,0);
//   //   createCanvas(800,800);
//   //   rect(x+i,y+i,w,h);
//   // }
// };
