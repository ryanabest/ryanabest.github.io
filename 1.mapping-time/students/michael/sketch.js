/* FEATURES
Done: Stroke object
Done: Transforms / Rotate
Done: Perlin noise on pen strokes
Done: timer events 
Done: Slow reveal strokes
Done: Slow color strokes
Done: array add / remove 
zero point offset - taken care of w sDisp
Done: mouseSplosion
Done: stroke: off by 1

TODO: leaf sizing
TODO: ordered drawing outside to inside
TODO: Meandering pen movement
TODO: Blot object
TODO: csv reader - decided what == distraction
TODO: resize update propagation

Extra
TODO: sound
TODO: make sec dots at center instead
TODO: every x sec is bold?
TODO: make stroke more ornate
TODO: Stroke death: fade, wind?
TODO: get tint() working / nope. broken but good.

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
    this.endX = 0;
    this.endY = 0;
    this.rotation = 0;
    this.g = createGraphics(gX, gY);
    this.sFrame = frameCount;	// start fc
    this.eFrame = -1;		// end fc
    
    this.genStroke = function (cPercent) {
      this.g.tint(55, 4);  // not working

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
    
    // array filter test
    this.fTest  = function (val) {
      return (val != this);
    }
    
    this.update = function () {
      
      if (this.alive) {  // grow in-out
        if (this.endX < gX) this.endX+=gX/4;
        if (this.endY < gY) this.endY+=gY/4;
      } else {
        if (this.endX >= 0) this.endX-=gX/4;
        if (this.endY >= 0) this.endY-=gY/4;
        if (this.endX <= 0 || this.endY <= 0) { // sanity check
          this.endX = 2;
          this.endY = 2;
        }
      }
    
      if (frameCount-this.sFrame <= fadeTime) {  // fade in
        this.genStroke((frameCount-this.sFrame) / fadeTime);
      }
      if (! this.alive && this.eFrame < 0) // set death timer
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
      
      mouseSplode = map(mouseX, 0, width, 1, 6);
      drawStart = sDens*this.type*mouseSplode;
      image(this.g, drawStart, drawStart, this.endX, this.endY);
      pop()
    }
}

Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};

// Get Day of Year
Date.prototype.getDOY = function() {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if(mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
};

currColor = [];
nextColor = [];

// set lerping colors by day of year
function setSeason () {
  d = new Date;
  doy = d.getDOY();
  currColor = winterColor;
  nextColor = springColor;
  
  if (doy > 79){ // BUG: leap year
    currColor = springColor;
    nextColor = summerColor;
  }
  if (doy > 172){
    currColor = summerColor;
    nextColor = fallColor;
  }
  if (doy > 265){
    currColor = fallColor;
    nextColor = winterColor;
  }
  
  if (doy > 355){
    currColor = winterColor;
    nextColor = springColor;
  }  
}

function setup() {
  /* seasonal colors:
    summer	= bright egg yolk
    fall	= maple leaf orange/red
    winter	= aquamarine
    spring	= lime green
  */
  
  //summerColor = [color('#ffd827'), color('#fe6b05'), color('#ec1b45'), color('#668013')];
  summerColor = [color('#f8ff00'), color('#fe6b05'), color('#c20065'), color('#067515')];
  fallColor = [color('#7e0304'), color('#d33f0f'), color('#fb8840'), color('#fcaf67')];
  winterColor = [color('#b5a5bf'), color('#d8cce0'), color('#757da4'), color('#13161f')];
  //springColor = [color('#dbec90'), color('#c5db5d'), color('#7b9677'), color('#11b99f')]; 
  springColor = [color('#f8e69a'), color('#fab5a6'), color('#96cf4c'), color('#009900')]; 

  setSeason();
  
  tMax = [59, 59, 23, 32 - new Date(year(), month(), 32).getDate(), 12];
  
  black = color(0, 100);
  
  update();
  createCanvas(windowWidth, windowHeight);
  
  //o.background(222);  // background assumed transparent
  
  t = [second(), minute(), hour(), day(), month()];
  tPrev = t; // previous time
  for (var tidx=0; tidx < t.length - 1; tidx++) {	// make all strokes
    for (var nidx=0; nidx < t[tidx] - 1; nidx++) {
      var c = lerpColor(currColor[tidx], nextColor[tidx], .33);
      var o = new Stroke(c, tidx, nidx, 0)
      sArr.push(o);		// add object to array
    }
  }
  
  
  
}


function update () {
  t = [second(), minute(), hour(), day(), month()]; 
  
  for (var idx=0; idx < t.length; idx++) {		// compare all except month
    
    if (t[idx] != tPrev[idx] && t[idx] != 0) {		// if new...
      if (idx == 4) {					// if the month turns over get new end day
        tMax = [60,60,24, 32 - new Date(year(), month(), 32).getDate(), 12];
        continue;
      }
      if (t[idx] == 0) {					// prev cycle finished
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
  
  background(255);
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
