var width = window.innerWidth;
var height = window.innerHeight;
var backgrndclr = 240;
var xstart = width * (0.0417)
var ystart = height * (0.0417)
var xend = width * (0.9722)
var yend = height * (0.90)

var x_axis_label = "time waited (s)"
var y_axis_lavel = "← chronological";
var start_date = "9.12.17";
var end_date = "9.18.17";

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

//create list of imgvars to be populated with png's from illustrator
function imgvars () {
  var imgvars = [];

  for (var i=0;i<38;i++) {
    imgvars[i] = "img" + (i+1);
  }

  return imgvars;
};

//Data points
var vars = [
  {id: 1,  sec: 98, crowd: 6, loc: "blue", day: 12, dir: "up", img: imgvars[0]},
  {id: 2,  sec: 42, crowd: 4, loc: "blue", day: 12, dir: "down", img: imgvars[1]},
  {id: 3,  sec: 22, crowd: 4, loc: "blue", day: 12, dir: "up", img: imgvars[2]},
  {id: 4,  sec: 30, crowd: 1, loc: "blue", day: 12, dir: "down", img: imgvars[3]},
  {id: 5,  sec: 35, crowd: 6, loc: "red", day: 12, dir: "up", img: imgvars[4]},
  {id: 6,  sec: 10, crowd: 4, loc: "blue", day: 13, dir: "up", img: imgvars[5]},
  {id: 7,  sec: 20, crowd: 1, loc: "blue", day: 13, dir: "down", img: imgvars[6]},
  {id: 8,  sec: 11, crowd: 1, loc: "blue", day: 13, dir: "up", img: imgvars[7]},
  {id: 9,  sec: 23, crowd: 5, loc: "blue", day: 13, dir: "down", img: imgvars[8]},
  {id: 10, sec: 10, crowd: 5, loc: "blue", day: 13, dir: "up", img: imgvars[9]},
  {id: 11, sec: 03, crowd: 3, loc: "blue", day: 13, dir: "down", img: imgvars[10]},
  {id: 12, sec: 25, crowd: 16, loc: "red", day: 13, dir: "up", img: imgvars[11]},
  {id: 13, sec: 00, crowd: 8, loc: "red", day: 13, dir: "down", img: imgvars[12]},
  {id: 14, sec: 36, crowd: 10, loc: "blue", day: 14, dir: "up", img: imgvars[13]},
  {id: 15, sec: 12, crowd: 1, loc: "blue", day: 14, dir: "down", img: imgvars[14]},
  {id: 16, sec: 23, crowd: 1, loc: "green", day: 14, dir: "up", img: imgvars[15]},
  {id: 17, sec: 20, crowd: 1, loc: "green", day: 14, dir: "down", img: imgvars[16]},
  {id: 18, sec: 09, crowd: 2, loc: "blue", day: 14, dir: "up", img: imgvars[17]},
  {id: 19, sec: 35, crowd: 5, loc: "blue", day: 14, dir: "down", img: imgvars[18]},
  {id: 20, sec: 07, crowd: 1, loc: "blue", day: 14, dir: "up", img: imgvars[19]},
  {id: 21, sec: 21, crowd: 1, loc: "blue", day: 14, dir: "down", img: imgvars[20]},
  {id: 22, sec: 00, crowd: 3, loc: "red", day: 14, dir: "up", img: imgvars[21]},
  {id: 23, sec: 00, crowd: 2, loc: "red", day: 14, dir: "down", img: imgvars[22]},
  {id: 24, sec: 17, crowd: 6, loc: "blue", day: 15, dir: "up", img: imgvars[23]},
  {id: 25, sec: 50, crowd: 7, loc: "blue", day: 15, dir: "down", img: imgvars[24]},
  {id: 26, sec: 20, crowd: 4, loc: "blue", day: 15, dir: "up", img: imgvars[25]},
  {id: 27, sec: 26, crowd: 1, loc: "blue", day: 15, dir: "down", img: imgvars[26]},
  {id: 28, sec: 19, crowd: 1, loc: "blue", day: 15, dir: "up", img: imgvars[27]},
  {id: 29, sec: 10, crowd: 2, loc: "blue", day: 15, dir: "down", img: imgvars[28]},
  {id: 30, sec: 10, crowd: 2, loc: "null", day: 16, dir: "null"}, //empty data point for saturday 9/16
  {id: 31, sec: 00, crowd: 2, loc: "red", day: 17, dir: "up", img: imgvars[30]},
  {id: 32, sec: 00, crowd: 1, loc: "red", day: 17, dir: "down", img: imgvars[31]},
  {id: 33, sec: 40, crowd: 8, loc: "blue", day: 18, dir: "up", img: imgvars[32]},
  {id: 34, sec: 35, crowd: 1, loc: "blue", day: 18, dir: "down", img: imgvars[33]},
  {id: 35, sec: 20, crowd: 1, loc: "blue", day: 18, dir: "up", img: imgvars[34]},
  {id: 36, sec: 20, crowd: 2, loc: "blue", day: 18, dir:"down", img: imgvars[35]},
  {id: 37, sec: 20, crowd: 7, loc: "orange", day: 18, dir: "up", img: imgvars[36]},
  {id: 38, sec: 10, crowd: 5, loc: "orange", day: 18, dir: "down", img: imgvars[37]}
];

//Day to Day
//Tuesday 9.12
var tue = function( sketch ) {
  sketch.setup = function() {
    sketch.createCanvas(width, height);

    img1 = sketch.loadImage("images/Elevator1.png");
    img2 = sketch.loadImage("images/Elevator2.png");
    img3 = sketch.loadImage("images/Elevator3.png");
    img4 = sketch.loadImage("images/Elevator4.png");
    img5 = sketch.loadImage("images/Elevator5.png");
  };

  sketch.draw = function() {
    sketch.background(backgrndclr);
    sketch.stroke(175);
    sketch.line(xstart,ystart,xstart,yend);
    sketch.line(xstart,yend,xend,yend);

    var y_axis_lavel = "← chronological";
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.translate(xstart, ystart + 100);
    sketch.rotate(4.71239);
    sketch.text(y_axis_lavel,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(ystart + 100));

    sketch.text(x_axis_label, width*0.33, yend+10);
    sketch.text("0s",xstart,yend+10);
    sketch.text("100s",xend-75,yend+10);

    var ydiff = (yend-ystart)/(5)
    xdiff = (xend-xstart)/140

    sketch.image(img1,xstart+(xdiff*vars[0]['sec']),ystart,img1.width/5,img1.height/5);
    sketch.image(img2,xstart+(xdiff*vars[1]['sec']),ystart+(ydiff),img2.width/5,img2.height/5);
    sketch.image(img3,xstart+(xdiff*vars[2]['sec']),ystart+(ydiff*2),img3.width/5,img3.height/5);
    sketch.image(img4,xstart+(xdiff*vars[3]['sec']),ystart+(ydiff*3),img4.width/5,img4.height/5);
    sketch.image(img5,xstart+(xdiff*vars[4]['sec']),ystart+(ydiff*4),img5.width/5,img5.height/5);

  };
};

var myp5 = new p5(tue,'p1');

//Wed 9.13
var wed = function( sketch ) {
  sketch.setup = function() {
    sketch.createCanvas(width, height);

    img6 = sketch.loadImage("images/Elevator6.png");
    img7 = sketch.loadImage("images/Elevator7.png");
    img8 = sketch.loadImage("images/Elevator8.png");
    img9 = sketch.loadImage("images/Elevator9.png");
    img10 = sketch.loadImage("images/Elevator10.png");
    img11 = sketch.loadImage("images/Elevator11.png");
    img12 = sketch.loadImage("images/Elevator12.png");
    img13 = sketch.loadImage("images/Elevator13.png");
  };

  sketch.draw = function() {
    sketch.background(backgrndclr);
    sketch.stroke(175);
    sketch.line(xstart,ystart,xstart,yend);
    sketch.line(xstart,yend,xend,yend);

    var y_axis_lavel = "← chronological";
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.translate(xstart, ystart + 100);
    sketch.rotate(4.71239);
    sketch.text(y_axis_lavel,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(ystart + 100));

    sketch.text(x_axis_label, width*0.33, yend+10);
    sketch.text("0s",xstart,yend+10);
    sketch.text("100s",xend-75,yend+10);

    var ydiff = (yend-ystart)/(8)
    xdiff = (xend-xstart)/140

    sketch.image(img6,xstart+(xdiff*vars[5]['sec']),ystart,img6.width/8,img6.height/8);
    sketch.image(img7,xstart+(xdiff*vars[6]['sec']),ystart+(ydiff),img7.width/8,img7.height/8);
    sketch.image(img8,xstart+(xdiff*vars[7]['sec']),ystart+(ydiff*2),img8.width/8,img8.height/8);
    sketch.image(img9,xstart+(xdiff*vars[8]['sec']),ystart+(ydiff*3),img9.width/8,img9.height/8);
    sketch.image(img10,xstart+(xdiff*vars[9]['sec']),ystart+(ydiff*4),img10.width/8,img10.height/8);
    sketch.image(img11,xstart+(xdiff*vars[10]['sec']),ystart+(ydiff*5),img11.width/8,img11.height/8);
    sketch.image(img12,xstart+(xdiff*vars[11]['sec']),ystart+(ydiff*6),img12.width/8,img12.height/8);
    sketch.image(img13,xstart+(xdiff*vars[12]['sec']),ystart+(ydiff*7),img13.width/8,img13.height/8);

  };
};

var myp5 = new p5(wed,'p2');

//Thu 9.14

var thu = function( sketch ) {
  sketch.setup = function() {
    sketch.createCanvas(width, height);

    img14 = sketch.loadImage("images/Elevator14.png");
    img15 = sketch.loadImage("images/Elevator15.png");
    img16 = sketch.loadImage("images/Elevator16.png");
    img17 = sketch.loadImage("images/Elevator17.png");
    img18 = sketch.loadImage("images/Elevator18.png");
    img19 = sketch.loadImage("images/Elevator19.png");
    img20 = sketch.loadImage("images/Elevator20.png");
    img21 = sketch.loadImage("images/Elevator21.png");
    img22 = sketch.loadImage("images/Elevator22.png");
    img23 = sketch.loadImage("images/Elevator23.png");
  };

  sketch.draw = function() {
    sketch.background(backgrndclr);
    sketch.stroke(175);
    sketch.line(xstart,ystart,xstart,yend);
    sketch.line(xstart,yend,xend,yend);

    var y_axis_lavel = "← chronological";
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.translate(xstart, ystart + 100);
    sketch.rotate(4.71239);
    sketch.text(y_axis_lavel,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(ystart + 100));

    sketch.text(x_axis_label, width*0.33, yend+10);
    sketch.text("0s",xstart,yend+10);
    sketch.text("100s",xend-75,yend+10);

    var ydiff = (yend-ystart)/(10)
    xdiff = (xend-xstart)/140

    sketch.image(img14,xstart+(xdiff*vars[13]['sec']),ystart,img14.width/10,img14.height/10);
    sketch.image(img15,xstart+(xdiff*vars[14]['sec']),ystart+(ydiff),img15.width/10,img15.height/10);
    sketch.image(img16,xstart+(xdiff*vars[15]['sec']),ystart+(ydiff*2),img16.width/10,img16.height/10);
    sketch.image(img17,xstart+(xdiff*vars[16]['sec']),ystart+(ydiff*3),img17.width/10,img17.height/10);
    sketch.image(img18,xstart+(xdiff*vars[17]['sec']),ystart+(ydiff*4),img18.width/10,img18.height/10);
    sketch.image(img19,xstart+(xdiff*vars[18]['sec']),ystart+(ydiff*5),img19.width/10,img19.height/10);
    sketch.image(img20,xstart+(xdiff*vars[19]['sec']),ystart+(ydiff*6),img20.width/10,img20.height/10);
    sketch.image(img21,xstart+(xdiff*vars[20]['sec']),ystart+(ydiff*7),img21.width/10,img21.height/10);
    sketch.image(img22,xstart+(xdiff*vars[21]['sec']),ystart+(ydiff*8),img22.width/10,img22.height/10);
    sketch.image(img23,xstart+(xdiff*vars[22]['sec']),ystart+(ydiff*9),img23.width/10,img23.height/10);

  };
};

var myp5 = new p5(thu,'p3');

//Fri 9.15
var fri = function( sketch ) {
  sketch.setup = function() {
    sketch.createCanvas(width, height);

    img24 = sketch.loadImage("images/Elevator24.png");
    img25 = sketch.loadImage("images/Elevator25.png");
    img26 = sketch.loadImage("images/Elevator26.png");
    img27 = sketch.loadImage("images/Elevator27.png");
    img28 = sketch.loadImage("images/Elevator28.png");
    img29 = sketch.loadImage("images/Elevator29.png");
  };

  sketch.draw = function() {
    sketch.background(backgrndclr);
    sketch.stroke(175);
    sketch.line(xstart,ystart,xstart,yend);
    sketch.line(xstart,yend,xend,yend);

    var y_axis_lavel = "← chronological";
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.translate(xstart, ystart + 100);
    sketch.rotate(4.71239);
    sketch.text(y_axis_lavel,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(ystart + 100));

    sketch.text(x_axis_label, width*0.33, yend+10);
    sketch.text("0s",xstart,yend+10);
    sketch.text("100s",xend-75,yend+10);

    var ydiff = (yend-ystart)/(6)
    xdiff = (xend-xstart)/140

    sketch.image(img24,xstart+(xdiff*vars[23]['sec']),ystart,img24.width/6,img24.height/6);
    sketch.image(img25,xstart+(xdiff*vars[24]['sec']),ystart+(ydiff),img25.width/6,img25.height/6);
    sketch.image(img26,xstart+(xdiff*vars[25]['sec']),ystart+(ydiff*2),img26.width/6,img26.height/6);
    sketch.image(img27,xstart+(xdiff*vars[26]['sec']),ystart+(ydiff*3),img27.width/6,img27.height/6);
    sketch.image(img28,xstart+(xdiff*vars[27]['sec']),ystart+(ydiff*4),img28.width/6,img28.height/6);
    sketch.image(img29,xstart+(xdiff*vars[28]['sec']),ystart+(ydiff*5),img29.width/6,img29.height/6);

  };
};

var myp5 = new p5(fri,'p4');

//Sat 9.16
var sat = function( sketch ) {
  sketch.setup = function() {
    sketch.createCanvas(width, height);
  };

  sketch.draw = function() {
    sketch.background(backgrndclr);
    sketch.stroke(175);
    sketch.line(xstart,ystart,xstart,yend);
    sketch.line(xstart,yend,xend,yend);

    var y_axis_lavel = "← chronological";
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.translate(xstart, ystart + 100);
    sketch.rotate(4.71239);
    sketch.text(y_axis_lavel,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(ystart + 100));

    sketch.text(x_axis_label, width*0.33, yend+10);
    sketch.text("0s",xstart,yend+10);
    sketch.text("100s",xend-75,yend+10);

  };
};

var myp5 = new p5(sat,'p5');

//Sun 9.17
var sun = function( sketch ) {
  sketch.setup = function() {
    sketch.createCanvas(width, height);

    img31 = sketch.loadImage("images/Elevator31.png");
    img32 = sketch.loadImage("images/Elevator32.png");
  };

  sketch.draw = function() {
    sketch.background(backgrndclr);
    sketch.stroke(175);
    sketch.line(xstart,ystart,xstart,yend);
    sketch.line(xstart,yend,xend,yend);

    var y_axis_lavel = "← chronological";
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.translate(xstart, ystart + 100);
    sketch.rotate(4.71239);
    sketch.text(y_axis_lavel,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(ystart + 100));

    sketch.text(x_axis_label, width*0.33, yend+10);
    sketch.text("0s",xstart,yend+10);
    sketch.text("100s",xend-75,yend+10);

    var ydiff = (yend-ystart)/(2)
    xdiff = (xend-xstart)/140

    sketch.image(img31,xstart+(xdiff*vars[29]['sec']),ystart,img31.width/4,img31.height/4);
    sketch.image(img32,xstart+(xdiff*vars[30]['sec']),ystart+(ydiff),img32.width/4,img32.height/4);

  };
};

var myp5 = new p5(sun,'p6');

//Mon 9.18
var mon = function( sketch ) {
  sketch.setup = function() {
    sketch.createCanvas(width, height);

    img33 = sketch.loadImage("images/Elevator33.png");
    img34 = sketch.loadImage("images/Elevator34.png");
    img35 = sketch.loadImage("images/Elevator35.png");
    img36 = sketch.loadImage("images/Elevator36.png");
    img37 = sketch.loadImage("images/Elevator37.png");
    img38 = sketch.loadImage("images/Elevator38.png");
  };

  sketch.draw = function() {
    sketch.background(backgrndclr);
    sketch.stroke(175);
    sketch.line(xstart,ystart,xstart,yend);
    sketch.line(xstart,yend,xend,yend);

    var y_axis_lavel = "← chronological";
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.translate(xstart, ystart + 100);
    sketch.rotate(4.71239);
    sketch.text(y_axis_lavel,0,0);
    sketch.rotate(-4.71239);
    sketch.translate(-xstart,-(ystart + 100));

    sketch.text(x_axis_label, width*0.33, yend+10);
    sketch.text("0s",xstart,yend+10);
    sketch.text("100s",xend-75,yend+10);

    var ydiff = (yend-ystart)/(6)
    xdiff = (xend-xstart)/140

    sketch.image(img33,xstart+(xdiff*vars[32]['sec']),ystart,img33.width/6,img33.height/6);
    sketch.image(img34,xstart+(xdiff*vars[33]['sec']),ystart+(ydiff),img32.width/6,img32.height/6);
    sketch.image(img35,xstart+(xdiff*vars[34]['sec']),ystart+(ydiff*2),img32.width/6,img32.height/6);
    sketch.image(img36,xstart+(xdiff*vars[35]['sec']),ystart+(ydiff*3),img32.width/6,img32.height/6);
    sketch.image(img37,xstart+(xdiff*vars[36]['sec']),ystart+(ydiff*4),img32.width/6,img32.height/6);
    sketch.image(img38,xstart+(xdiff*vars[37]['sec']),ystart+(ydiff*5),img32.width/6,img32.height/6);

  };
};

var myp5 = new p5(mon,'p7');

//Overall

var ovr = function( sketch ) {
  window.onresize = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
  }
  sketch.setup = function() {
    sketch.createCanvas(width, height);
  };

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
    sketch.stroke(backgrndclr);
    sketch.fill(175);
    sketch.text(x_axis_label,xstart+(xend-xstart)/2, yend+10);
    sketch.text("0s",xstart,yend+10);
    sketch.text("100s",xend-25,yend+10);

    //y-axis label
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

var myp5 = new p5(ovr,'p8');
