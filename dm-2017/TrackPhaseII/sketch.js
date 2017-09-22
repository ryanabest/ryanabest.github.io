var backgrndclr = 240;

var bluer = 17;
var blueg = 92;
var blueb = 129;

var redr = 238;
var redg = 51;
var redb = 36;

var greenr = 46;
var greeng = 139;
var greenb = 87;

var oranger = 255;
var orangeg = 140;
var orangeb = 0;

//Day to Day
var width = window.innerWidth;
var height = window.innerHeight;

var d2d = function( sketch ) {

  /*sketch.preload = function() {
    img1 = loadImage('images/Elevator1.png');
  }*/

  var img1;

  sketch.setup = function() {
    sketch.createCanvas(width, height);
    img1 = sketch.loadImage("images/Elevator1.png");
  };

  sketch.draw = function() {
    sketch.background(255);
    sketch.fill(0);
    sketch.image(img1,0,0);
    //sketch.rect(10,10,100,100);
  };
};

var myp5 = new p5(d2d,'p1');

//Overall

var ovr = function( sketch ) {
  window.onresize = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
  }
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
    {id: 38, sec: 10, crowd: 5, loc: "orange", day: 18, dir: "down"}
  ];

  var xstart = width * (0.0417)
  var ystart = height * (0.0417)
  var xend = width * (0.9722)
  var yend = height * (0.90)
  var xdiff = (xend-xstart)/100
  var ydiff = (yend-ystart)/(vars.length+1)
  var hght = ydiff/5

  sketch.draw = function() {

    //axes and background
    sketch.background(backgrndclr);
    sketch.stroke(175);
    sketch.line(xstart,ystart,xstart,yend);
    sketch.line(xstart,yend,xend,yend);

    //x-axis label
    var x_axis_label = "time waited (s)"
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.text(x_axis_label,xstart+(xend-xstart)/2, yend+10);
    sketch.text("0s",xstart,yend+10);
    sketch.text("100s",xend-25,yend+10);

    //y-axis label
    var y_axis_lavel = "← chronological";
    var start_date = "9.12.17";
    var end_date = "9.18.17";
    sketch.translate(xstart, ystart + 150);
    sketch.rotate(4.71239);
    sketch.text(y_axis_lavel,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(ystart + 150));

    sketch.translate(xstart, ystart + 40);
    sketch.rotate(4.71239);
    sketch.text(start_date,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(ystart + 40));

    sketch.translate(xstart, yend-5);
    sketch.rotate(4.71239);
    sketch.text(end_date,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(yend-5));

    //legend text in viz
    /*
    sketch.textSize(10);
    sketch.text("the bigger the point, the more crowded the elevator",125,ystart+(ydiff*10));
    sketch.text("the most crowded ride crammed 16 people together",125,ystart+(ydiff*10)+10);
    sketch.text("the smallest points are rides by myself",100,ystart+(ydiff*28));
    sketch.text("solo rides are the best rides!",100,ystart+(ydiff*28)+10);
    sketch.text("I had to wait 98 s!", xend-100,ystart+(ydiff*2));
    */

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
      //sketch.ellipse(xstart+(xdiff*vars[i]['id']),ystart+(ydiff*(vars[i]['sec'])),hght*vars[i]['crowd']);
      sketch.ellipse(xstart+(xdiff*vars[i]['sec']),ystart+(ydiff*(vars[i]['id'])),hght*vars[i]['crowd']);
    }

    //color legend
    //blue
    var blueleg = "WebMD Office"
    sketch.stroke(bluer,blueg,blueb);
    sketch.fill(bluer,blueg,blueb);
    sketch.ellipse((ydiff/2),height-(10*hght),hght);
    sketch.stroke(backgrndclr);
    sketch.text(blueleg,ydiff,height-(9*hght));

    //red
    var redleg = "Parsons Univ. Center"
    sketch.stroke(redr,redg,redb);
    sketch.fill(redr,redg,redb);
    sketch.ellipse((ydiff/2)+100,height-(10*hght),hght);
    sketch.stroke(backgrndclr);
    sketch.text(redleg,(ydiff)+100,height-(9*hght));

    //green
    var greenleg = "Staples"
    sketch.stroke(greenr,greeng,greenb);
    sketch.fill(greenr,greeng,greenb);
    sketch.ellipse((ydiff/2),height-(6*hght),hght);
    sketch.stroke(backgrndclr);
    sketch.text(greenleg,ydiff,height-(5*hght));

    //orange
    var orangeleg = "2 W 13th St"
    sketch.stroke(oranger,orangeg, orangeb);
    sketch.fill(oranger,orangeg, orangeb);
    sketch.ellipse((ydiff/2)+100,height-(6*hght),hght);
    sketch.stroke(backgrndclr);
    sketch.text(orangeleg,(ydiff)+100,height-(5*hght));


    //size legend
    //small
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    //sketch.text("# of riders:",xend-(50*hght),height-(10*hght));
    sketch.text("1 rider",xend-60,height-(hght));
    sketch.stroke(175);
    sketch.fill(backgrndclr);
    sketch.ellipse(xend-80,height-(2*hght),hght);

    //big
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.text("16 riders",xend-50,yend+(11*hght));
    sketch.stroke(175);
    sketch.fill(backgrndclr);
    sketch.ellipse(xend-80,yend+(10*hght),hght*15);

  };

};

var myp5 = new p5(ovr,'p2');
