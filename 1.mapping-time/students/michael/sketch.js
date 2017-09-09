/* FEATURES
Stroke object
Transforms / Rotate
Perlin noise on pen strokes
TODO: timer events 
TODO: Slow reaveal strokes
TODO: Slow color strokes
TODO: Stroke death: fade, wind?

TODO: Blot object
TODO: Meandering pen movement

TODO: csv reader - decided what == distraction
TODO: resize update propagation
TODO: array add / remove 
TODO: get tint() working
zero point offset - taken care of w sDisp
*/

/* Visualizations
hrs,min,sec - circular form
between seasons - color lerp
digital activities - inkblots
digital activity % distraction = blot size & alpha
*/

var sArr=[]; // stroke array
gX = 100;	// fb x size
gY = 100;	// fb y size
gPts = 30;	// points to modify by noise for each stroke
sDisp = 7;	// stroke disperson around ring
sDens = 20;	// stroke density

midX = 0;  	// canvas midx
midY = 0;	// canvas midy

tPrev = [];	// previous time
tMax = [];	// max for each time value

black = null;
fadeTime = 20.0;
  
function Stroke (color, type, val, month) {
    this.alive = true;
    this.color = color;
    this.type = type;
    this.locX = midX;
    this.locY = midY;
    this.rotation = 0;
    this.g = createGraphics(gX, gY);
    this.sFrame = frameCount;	// start fc
    this.eFrame = -1;		// end fc
    
    this.genStroke = function (cPercent) {
      // add self to array
      var x=0;
      var y=0;
      var c = lerpColor(black, this.color, cPercent);	// start off like black ink
      this.g.stroke(c);
      for (var idx = 0; idx < gPts; idx++) {
        var endX=x+(gX/gPts); 
        var endY=y+(gY/gPts);
        if (idx) {
          offset=idx*1.0/gPts;
          yoff = noise(offset+val) * 2;
          endY -= yoff; // TODO complicate w noise
        }
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
    
    // array filter test
    this.fTest  = function (val) {
      return (val != this);
    }
    
    this.update = function () {
      if (frameCount-this.sFrame <= fadeTime)  // fade in
        this.genStroke((frameCount-this.sFrame) / fadeTime);
        
      if (! this.alive && this.eFrame < 0) 
        this.eFrame = frameCount;
        
      if (this.eFrame > 0 && frameCount-this.eFrame <= (fadeTime/1.5)) { // fade out
        var ft = (frameCount-this.eFrame) / (fadeTime/1.5)
        this.genStroke(1-(ft * ft));	// ease out - heavy bottom
      }
        
      if (this.eFrame > 0 && frameCount-this.eFrame > fadeTime) { // remove from array
	sArr = sArr.filter(this.fTest);
	return (false);
      }
      return (true);
    }
    
    this.draw = function () {
      angleStep = TWO_PI / tMax[this.type];
      
      push();
      translate(midX, midY);
      rotate(angleStep * val * sDisp);
      
      // tint(55, 100, 46, 4);  // not working
      mouseSplode = map(mouseX, 0, width, 1, 6);
      image(this.g, sDens*this.type*mouseSplode, sDens*this.type*mouseSplode);
      pop()
    }
}

currColor = [];
nextColor = [];

function setup() {
  currColor = [color(0, 0, 255, 20), color(255, 0, 0, 20), color(0, 255, 0, 20), color(0, 255, 255, 20)];
  nextColor = [color(0, 0, 255, 20), color(255, 0, 0, 20), color(0, 255, 0, 20), color(0, 255, 255, 20)];
  tMax = [60, 60, 24, 32 - new Date(year(), month(), 32).getDate(), 12];
  
  black = color(0);
  
  update();
  createCanvas(windowWidth, windowHeight);
  
  //o.background(222);  // background assumed transparent
  
  t = [second(), minute(), hour(), day(), month()];
  tPrev = t; // previous time
  for (var tidx=0; tidx < t.length - 1; tidx++) {	// make all strokes
    for (var nidx=0; nidx < t[tidx]; nidx++) {
      var c = lerpColor(currColor[tidx], nextColor[tidx], .33);
      var o = new Stroke(c, tidx, nidx, 0)
      //o.setup();
      sArr.push(o);		// add object to array
    }
  }
  
  
  
}


function update () {
  t = [second(), minute(), hour(), day(), month()]; 
  
  for (var idx=0; idx < t.length; idx++) {		// compare all except month
    
    if (t[idx] != tPrev[idx]) {				// if new...
      if (idx == 4) {					// if the month turns over get new end day
        tMax = [60,60,24, 32 - new Date(year(), month(), 32).getDate(), 12];
        continue;
      }
      if (t[idx] == 0) {					// prevcycle finished
        for (var sidx=0; sidx < sArr.length; sidx++) {		// run through
          if (sArr[sidx].type == idx) {				// if correct type
            sArr[sidx].alive = false;				// kill all strokes for type
          }
        }
      }
      // console.log("Added: " + t[idx]);
      var c = lerpColor(currColor[idx], nextColor[idx], .33);
      var o = new Stroke(c, idx, t[idx], 0)
      //o.setup();
      sArr.push(o);					// add object to array
      
      tPrev[idx] = t[idx];				// update previous time
    }
  }
  
  midX = width / 2;
  midY = height / 2;
}

flag = 0;
function draw() {

  update();
  
  /*
  if (flag == 0) {
  for (idx=0; idx < 60; idx++) {
    sArr.push(new Stroke(color(0, 0, 255, 20), 0, idx, 1)); // add object to array
  }
  for (var idx=0; idx < sArr.length; idx++) {
    sArr[idx].setup()
  }
  flag = 1;
  }
  */
  
  background(55);
  fill(255,0,0);
  ellipse(
    200+100*cos(map(millis()%5000,0,5000,0,TWO_PI)),
    200+100*sin(map(millis()%5000,0,5000,0,TWO_PI)),
    20,20
  );
  
  for (var idx=0; idx < sArr.length; idx++) {
    if (sArr[idx].update())
      sArr[idx].draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // TODO need to update strokes too
}
