let boxRows = 5;
let boxCols = 8;

let lngth = 300;
let hght = 187.5;
let border = 0.8;

let canvasLngth = lngth + (lngth/boxCols*(1-border));
let canvasHght = hght + (hght/boxRows*(1-border));

// example state

var exampleState = function( sketch ) {
  sketch.setup = function() {
    var cnv = sketch.createCanvas(canvasLngth, canvasHght);
    cnv.id('example-state');
    sketch.background(255);

    let x = (lngth/boxCols);
    let y = (hght/boxRows);

    for (let i=0;i<boxCols;i++) {
      for (let j=0;j<5;j++) {
        var c = sketch.color(34,106,177); //blue
        if (i<4) {
          c = sketch.color(236,20,14); //red
        }
        sketch.fill(c);
        sketch.noStroke();
        sketch.rect((x*i)+(x*(1-border)),(y*j)+(y*(1-border)),(lngth/boxCols)*border,(hght/boxRows)*border);
      }
    }
  }
}

var myp5 = new p5(exampleState,'example-state');

// proportional state

var proportionalState = function( sketch ) {
  sketch.setup = function() {
    var cnv = sketch.createCanvas(canvasLngth, canvasHght);
    cnv.id('proportional-state');
    sketch.background(255);

    let x = (lngth/boxCols);
    let y = (hght/boxRows);

    //Lines
    sketch.strokeWeight((y*(1-border))*0.6);
    let linex = x*(1-border)/2;
    let liney = y*(1-border)/2;

    //Horiztonal Lines
    sketch.line(linex,liney,canvasLngth-linex,liney);
    sketch.line(linex,canvasHght-liney,canvasLngth-linex,canvasHght-liney);
    sketch.line(linex,y+liney,x+linex,y+liney);
    sketch.line((3*x)+linex,y+liney,(5*x)+linex,y+liney);
    sketch.line(canvasLngth-linex,y+liney,canvasLngth-x-linex,y+liney);
    sketch.line(x+linex,(4*y)+liney,(3*x)+linex,(4*y)+liney);
    sketch.line((5*x)+linex,(4*y)+liney,(7*x)+linex,(4*y)+liney);

    //Vertical lines
    sketch.line(linex,liney,linex,canvasHght-liney);
    sketch.line(canvasLngth-linex,liney,canvasLngth-linex,canvasHght-liney);
    sketch.line(x+linex,y+liney,x+linex,(4*y)+liney);
    sketch.line((3*x)+linex,y+liney,(3*x)+linex,(4*y)+liney);
    sketch.line((5*x)+linex,y+liney,(5*x)+linex,(4*y)+liney);
    sketch.line((7*x)+linex,y+liney,(7*x)+linex,(4*y)+liney);

    for (let i=0;i<boxCols;i++) {
      for (let j=0;j<5;j++) {
        var c = sketch.color(34,106,177); //blue
        if (i<4) {
          c = sketch.color(236,20,14); //red
        }
        sketch.fill(c);
        sketch.noStroke();
        sketch.rect((x*i)+(x*(1-border)),(y*j)+(y*(1-border)),(lngth/boxCols)*border,(hght/boxRows)*border);
      }
    }
  }
}

var myp5 = new p5(proportionalState,'proportional-state');

// proportional state

var gerryState = function( sketch ) {
  sketch.setup = function() {
    var cnv = sketch.createCanvas(canvasLngth, canvasHght);
    cnv.id('gerry-state');
    sketch.background(255);

    let x = (lngth/boxCols);
    let y = (hght/boxRows);

    //Lines
    sketch.strokeWeight((y*(1-border))*0.6);
    let linex = x*(1-border)/2;
    let liney = y*(1-border)/2;

    //Horiztonal Lines
    sketch.line(linex,liney,canvasLngth-linex,liney);
    sketch.line(linex,canvasHght-liney,canvasLngth-linex,canvasHght-liney);
    sketch.line((2*x)+linex,(2*y)+liney,(3*x)+linex,(2*y)+liney);
    sketch.line((3*x)+linex,(y)+liney,(5*x)+linex,(y)+liney);
    sketch.line((5*x)+linex,(2*y)+liney,canvasLngth-linex,(2*y)+liney);
    sketch.line((2*x)+linex,(3*y)+liney,(6*x)+linex,(3*y)+liney);
    sketch.line((6*x)+linex,(4*y)+liney,canvasLngth-linex,(4*y)+liney)

    //Vertical lines
    sketch.line(linex,liney,linex,canvasHght-liney);
    sketch.line(canvasLngth-linex,liney,canvasLngth-linex,canvasHght-liney);
    sketch.line((2*x)+linex,liney,(2*y)+linex,canvasHght-liney);
    sketch.line((3*x)+linex,(2*y)+liney,(3*x)+linex,(y)+liney);
    sketch.line((5*x)+linex,(y)+liney,(5*x)+linex,(2*y)+liney);
    sketch.line((6*x)+linex,(3*y)+liney,(6*x)+linex,(4*y)+liney);

    for (let i=0;i<boxCols;i++) {
      for (let j=0;j<5;j++) {
        var c = sketch.color(34,106,177); //blue
        if (i<4) {
          c = sketch.color(236,20,14); //red
        }
        sketch.fill(c);
        sketch.noStroke();
        sketch.rect((x*i)+(x*(1-border)),(y*j)+(y*(1-border)),(lngth/boxCols)*border,(hght/boxRows)*border);
      }
    }
  }
}

var myp5 = new p5(gerryState,'gerry-state');
