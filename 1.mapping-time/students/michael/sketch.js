var sArr=[]; // stroke array
gX = 100;
gY = 100;
gPts = 50; // points to modify by noise 
midX = 0;
midY = 0;
  
function Stroke (color, type, val, month) {
    this.color = color;
    this.locX = midX;
    this.locY = midY;
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
    
    this.live = function () {
      
    }
    
    this.die = function () {
      
    }
    
    this.update = function () {

    }
    
    this.draw = function () {
      secs = TWO_PI / 60;
      push();
      translate(midX, midY);
      rotate(secs * val);
      //this.locX += this.locX*cos(secs * val);
      //this.locY += this.locY*sin(secs * val);
      image(this.g, 100, 100);
      pop()


    }
}

function setup() {
  update();
  createCanvas(windowWidth, windowHeight);
  
  //o.background(222);  // background assumed transparent
  
  

  
  /*
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
  */
}

function update () {
  t = [second(), minute(), hour(), day(), month()]; 
  //t.push();
  
  midX = width / 2;
  midY = height / 2;
}

flag = 0;
function draw() {

  update();
  
  if (flag == 0) {
  for (idx=0; idx < 60; idx++) {
    sArr.push(new Stroke(color(0, 0, 255, 55), 0, idx, 1)); // add object to array
  }
  for (var idx=0; idx < sArr.length; idx++) {
    sArr[idx].setup()
  }
  flag = 1;
  }
  
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
    sArr[idx].update()
    sArr[idx].draw()
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // TODO need to update strokes too
}
