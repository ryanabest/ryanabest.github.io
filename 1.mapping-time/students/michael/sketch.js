var x = 0;
var y = 0;
var px = 0;
var py = 0;
var easing = 0.05;

var object;
var sArr=[]; // stroke array

gX = 100;
gY = 100;
gPts = 50; // points to modify by noise 

function Stroke (color, drawX, drawY) {
    this.color = color;
    this.locX = drawX;
    this.locY = drawY;
    this.rotation = 0;
    this.g = createGraphics(gX, gY);
    
    this.setup = function () {
      // add self to array
      var x=0;
      var y=0;
      this.g.stroke(color);
      for (var idx = 0; idx < gPts; idx++) {
        var endX=x+(gX/gPts); // TODO complicate w noise
        var endY=y+(gY/gPts);
        var weight = gPts/2 - abs((gPts/2)-idx) ; // TODO easing on strokeweight
        this.g.strokeWeight(weight * 1.3);
        this.g.line(x, y, endX, endY);
        x=endX;
        y=endY;
      }

    }
    
    this.draw = function () {
      image(this.g, this.locX, this.locY);
    }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0);
  
  o = createGraphics(400, 250); // this is a framebuffer?
  var x, y, weight;
  //o.background(222);  // background assumed transparent
  
  
  sArr.push(new Stroke(color(0, 0, 255, 55), 200,200)); // add object to array
  for (var idx=0; idx < sArr.length; idx++) {
    sArr[idx].setup()
  }
  
  o.stroke(255,0,0);  // fill for lines
  maxdist = dist(0, 0, 250, 250)
  for (x=0, y=0; x < 400 && y < 250; px++, py++) {
    weight = (maxdist - dist(x, y, 125, 125)) * .01
    o.strokeWeight(weight);
    o.line(x, y, px, py);
    x = px;
    y = py;
  }
  //o.line(0,0,400,250);
}

function draw() {
  //var targetX = mouseX;
  x += (mouseX - x)*easing;
  //var targetY = mouseY;
  y += (mouseY - y)*easing;
  var weight = dist(x, y, px, py);
  strokeWeight(weight);
  line(x, y, px, py);
  py = y;
  px = x;
  
  background(55);
  fill(255,0,0);
  ellipse(
    200+100*cos(map(millis()%5000,0,5000,0,TWO_PI)),
    200+100*sin(map(millis()%5000,0,5000,0,TWO_PI)),
    20,20
  );
  
  push();
  //rotate(frameCount / -100.0);
    
  for (var idx=0; idx < sArr.length; idx++) {
    sArr[idx].draw()
    
  }
  //image(o, 100, 75);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
