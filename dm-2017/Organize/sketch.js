function preload() {
  // load data from either a local copy of one of the USGS CSVs or directly:
  discogsdata = loadTable("assets/discogsdata.csv", "csv", "header");
  tracklist = loadTable("assets/tracklist.csv", "csv", "header");
  genres_and_styles = loadTable("assets/genres_and_styles.csv", "csv", "header");
  // or (while you're designing) from the feed itself:
};

var colorbutton;
var artistbutton;
var artistspecificbutton;
var imgs = [];
var val;
var whoKnows;

//variables to be used in artist function
var artistlist= [];
var artistlistsorted = [];

function colorlist() {
  for (r=0;r<discogsdata.getRowCount();r++) {
      imgs.push(discogsdata.get(r,"image"));
  };
  val = getRandomInt(0,imgs.length);
  slider = createSlider(0,imgs.length,val);
  val = slider.value();
  for (i=0;i<imgs.length;i++) {
    var img = createImg(imgs[i]);
    if (i != val) {
      img.hide();
    }
  };
};

function artists() {
  //pull all artists into a list
  for (i=0;i<discogsdata.getRowCount();i++) {
    artistlist.push(discogsdata.getString(i,"Artist"))
  };


  //sort and remove duplicates
  artistlist = artistlist.sort();
  for (a=0;a<artistlist.length;a++) {
    if (typeof artistlist[a-1] != 'undefined' && artistlist[a-1] != artistlist[a]) {
      artistlistsorted.push(artistlist[a]);
    }
  };

  //create buttons for each artist
  for (a=0;a<artistlistsorted.length;a++) {
    artistspecificbutton = createButton(artistlistsorted[a]);
    artistspecificbutton.mousePressed(artist);
  }
};

//
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//generate list of artists for the scroll
function artist() {
  imgs = [];
  for (r=0;r<discogsdata.getRowCount();r++) {
    if (this.html().replace('&amp;','&') === discogsdata.getString(r,"Artist")) {
      imgs.push(discogsdata.get(r,"image"));
    }
  };
};

function setup() {
  artistbutton = createButton("artists");
  artistbutton.mousePressed(artists);
  colorbutton = createButton("color");
  colorbutton.mousePressed(colorlist);
};

// function keyPressed() {
//   if (keyCode === RIGHT_ARROW) {
//     if (val === imgs.length) {
//       val = 0;
//     } else {
//       imgnumber = val + 1;
//     }
//   } else if (keyCode === LEFT_ARROW) {
//     if (val===0) {
//       val = imgs.length;
//     } else {
//       val = val - 1;
//     }
//   }
// };

function draw() {
};
