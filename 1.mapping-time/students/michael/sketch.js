var x = 0;
var y = 0;
var px = 0;
var py = 0;
var easing = 0.05;

var object;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0);
  
  o = createGraphics(400, 250); // this is a framebuffer?
  var x, y, weight;
  //o.background(222);  // background assumed transparent
  for (mx=0, my=0; mx < 400 && my < 250; mx++, my++) {
    x += (mx - x)*easing;
    y += (my - y)*easing;
    weight = dist(x, y, px, py);
    o.strokeWeight(weight);
    o.line(x, y, px, py);
    py = y;
    px = x;
  }
  o.stroke(255,0,0);  // fill for lines
  o.line(0,0,400,250);
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
  rotate(frameCount / -100.0);
  image(o, 150, 75);
  image(o, 100, 75);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
