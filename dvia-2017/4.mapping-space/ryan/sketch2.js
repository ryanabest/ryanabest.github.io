var myRect;

function setup() {
  createCanvas(800,400);
  background(200);
}

class rectangleSelector {
  constructor () {
    this.x1 = 10;
    this.y1 = 10;
    this.x2 = 200;
    this.y2 = 200;
    this.width = this.x2 - this.x1;
    this.height = this.y2 - this.y1;
    this.x = this.x1;
    this.y = this.y1;
  }

  drawRect() {
    rect(this.x1,this.y1,this.width,this.height);
  }

  showResizing() {
    if (mouseX >= (this.x2-2) && mouseX <= (this.x2+2) && mouseY >= this.y1 && mouseY < this.y2) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  }
}

function mouseDragged() {
  
  console.log(mouseX);
}

function mousePressed() {
  // check if mouse is on right boundary
  console.log(mouseX, mouseY, myRect.x2, myRect.y1, myRect.y2);
  if (mouseX >= (myRect.x2-2) && mouseX <= (myRect.x2+2) && mouseY >= myRect.y1 && mouseY < myRect.y2) {
    function mouseDragged() {
      console.log(mouseX);
    }
  } else {

  }
}

function draw() {
  myRect = new rectangleSelector;
  myRect.drawRect();
  myRect.showResizing();
  // console.log(mouseX >= (rect.x2-2) && mouseX <= (rect.x2+2) && mouseY >= rect.y1 && mouseY < rect.y2);
  // rect.resizeRect();
}
