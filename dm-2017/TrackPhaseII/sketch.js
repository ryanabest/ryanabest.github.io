var width = 360;
var height = 600;

//Day to Day

var d2d = function( sketch ) {

  sketch.setup = function() {
    sketch.createCanvas(width, height);
  };

  sketch.draw = function() {
    sketch.background(255);
    sketch.fill(0);
    sketch.rect(100,100,width/4,height/4);
  };
};

var myp5 = new p5(d2d,'p1');

//Overall

var ovr = function( sketch ) {

  sketch.setup = function() {
    sketch.createCanvas(width, height);
  };

  sketch.draw = function() {
    sketch.background(155);
    sketch.fill(0);
    sketch.rect(100,100,width/4,height/4);
  };
};

var myp5 = new p5(ovr,'p2');
