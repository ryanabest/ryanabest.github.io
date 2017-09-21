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


//Data points
  var vars = [
    {id: 1,  sec: 98, crowd: 6, loc: "blue", day: 12, dir: "up"},
    {id: 2,  sec: 42, crowd: 4, loc: "blue", day: 12, dir: "down"},
    {id: 3,  sec: 22, crowd: 4, loc: "blue", day: 12, dir: "up"},
    {id: 4,  sec: 30, crowd: 1, loc: "blue", day: 12, dir: "down"},
    {id: 5,  sec: 35, crowd: 6, loc: "red", day: 12, dir: "up"},
    {id: 6,  sec: 10, crowd: 4, loc: "blue", day: 13, dir: "up"},
    {id: 7,  sec: 20, crowd: 1, loc: "blue", day: 13, dir: "down"},
    {id: 8,  sec: 11, crowd: 1, loc: "blue", day: 13, dir: "up"},
    {id: 9,  sec: 23, crowd: 5, loc: "blue", day: 13, dir: "down"},
    {id: 10, sec: 10, crowd: 5, loc: "blue", day: 13, dir: "up"},
    {id: 11, sec: 03, crowd: 3, loc: "blue", day: 13, dir: "down"},
    {id: 12, sec: 25, crowd: 16, loc: "red", day: 13, dir: "up"},
    {id: 13, sec: 00, crowd: 8, loc: "red", day: 13, dir: "down"},
    {id: 14, sec: 36, crowd: 10, loc: "blue", day: 14, dir: "up"},
    {id: 15, sec: 12, crowd: 1, loc: "blue", day: 14, dir: "down"},
    {id: 16, sec: 23, crowd: 1, loc: "green", day: 14, dir: "up"},
    {id: 17, sec: 20, crowd: 1, loc: "green", day: 14, dir: "down"},
    {id: 18, sec: 09, crowd: 2, loc: "blue", day: 14, dir: "up"},
    {id: 19, sec: 35, crowd: 5, loc: "blue", day: 14, dir: "down"},
    {id: 20, sec: 07, crowd: 1, loc: "blue", day: 14, dir: "up"},
    {id: 21, sec: 21, crowd: 1, loc: "blue", day: 14, dir: "down"},
    {id: 22, sec: 00, crowd: 3, loc: "red", day: 14, dir: "up"},
    {id: 23, sec: 00, crowd: 2, loc: "red", day: 14, dir: "down"},
    {id: 24, sec: 17, crowd: 6, loc: "blue", day: 15, dir: "up"},
    {id: 25, sec: 50, crowd: 7, loc: "blue", day: 15, dir: "down"},
    {id: 26, sec: 20, crowd: 4, loc: "blue", day: 15, dir: "up"},
    {id: 27, sec: 26, crowd: 1, loc: "blue", day: 15, dir: "down"},
    {id: 28, sec: 19, crowd: 1, loc: "blue", day: 15, dir: "up"},
    {id: 29, sec: 10, crowd: 2, loc: "blue", day: 15, dir: "down"},
    {id: 30, sec: 10, crowd: 2, loc: "null", day: 16, dir: "null"}, //empty data point for saturday 9/16
    {id: 31, sec: 00, crowd: 2, loc: "red", day: 17, dir: "up"},
    {id: 32, sec: 00, crowd: 1, loc: "red", day: 17, dir: "down"},
    {id: 33, sec: 40, crowd: 8, loc: "blue", day: 18, dir: "up"},
    {id: 34, sec: 35, crowd: 1, loc: "blue", day: 18, dir: "down"},
    {id: 35, sec: 20, crowd: 1, loc: "blue", day: 18, dir: "up"},
    {id: 36, sec: 20, crowd: 2, loc: "blue", day: 18, dir:"down"},
    {id: 37, sec: 20, crowd: 7, loc: "orange", day: 18, dir: "up"},
    {id: 38, sec: 10, crowd: 5, loc: "orange", day: 8, dir: "down"}
  ];

  var xstart = 10
  var ystart = 10
  var xend = 350
  var yend = 590
  var xdiff = (xend-xstart)/105
  var ydiff = (yend-ystart)/vars.length
  var hght = ydiff/8

  var backgrndclr = 220

  var bluer = 17
  var blueg = 92
  var blueb = 129

  var redr = 238
  var redg = 51
  var redb = 36

  var greenr = 46
  var greeng = 139
  var greenb = 87

  var oranger = 255
  var orangeg = 140
  var orangeb = 0

  var i = 4

  sketch.draw = function() {
    sketch.background(backgrndclr);
    sketch.stroke(175);
    sketch.line(xstart,ystart,xstart,yend);
    sketch.line(xstart,yend,xend,yend);

    for (var i = 0; i<vars.length; i++) {
      if (vars[i]['loc'] == 'blue') {
        sketch.stroke(bluer,blueg,blueb);
        sketch.fill(bluer,blueg,blueb);
      } else if (vars[i]['loc'] == 'red') {
        sketch.stroke(redr,redg,redb);
        sketch.fill(redr,redg,redb);
      } else if (vars[i]['loc'] == 'green') {
        sketch.stroke(greenr,greeng, greenb);
        sketch.fill(greenr,greeng, greenb);
      } else if (vars[i]['loc'] == 'orange') {
        sketch.stroke(oranger,orangeg, orangeb);
        sketch.fill(oranger,orangeg, orangeb);
      } else if (vars[i]['loc'] == 'null') {
        sketch.stroke(backgrndclr);
        sketch.fill(backgrndclr);
      }
      sketch.ellipse(xstart+(xdiff*vars[i]['sec']),ystart+(ydiff*(vars[i]['id'])),hght*vars[i]['crowd']);
    }
  };
};

var myp5 = new p5(ovr,'p2');
