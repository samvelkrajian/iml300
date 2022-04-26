// Removing Objects from Arrays
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/7.5-removing-objects-from-array.html
// https://youtu.be/tA_ZgruFF9k

// Main Sketch: https://editor.p5js.org/codingtrain/sketches/smC4Jedi
// Trail Sketch: https://editor.p5js.org/codingtrain/sketches/9Ve9S6Mx

let bubbles = [];
let scrnshts = [];
let startTime;
let quoteOne;
let quoteTwo;

function preload() {
  // flower = loadImage('kittens/flower.png');
  for (let i = 0; i < 8; i++) {
    scrnshts[i] = loadImage(`screenshots/scrnsht${i}.png`);
  }
  quoteOne = loadImage('assets/quoteOne.png');
  quoteTwo = loadImage('assets/quoteTwo.png');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 60);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
    
    noSmooth();
  }
  
}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

function draw() {
  background(255);
  

  const m = 100;
  
  const topR = 255 * noise(frameCount / m);
  const topG = 255 * noise(1000 + frameCount / m);
  const topB = 255 * noise(2000 + frameCount / m);
  const bottomR = 255 * noise(3000 + frameCount / m);
  const bottomG = 255 * noise(4000  + frameCount / m);
  const bottomB = 255 * noise(5000 + frameCount / m);

  const topColor = color(topR, topG, topB);
  const bottomColor = color(bottomR, bottomG, bottomB);
  
  for(let y = 0; y < height; y++) {
    const lineColor = lerpColor(topColor, bottomColor, y / height);

    stroke(lineColor);
    line(0, y, windowWidth, y);
  
 }
  
image(quoteOne,100, 200);
image(quoteTwo,950, 100);
    for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].contains(mouseX, mouseY)) {

    }
          bubbles[i].move();
      bubbles[i].show();
  }
  
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
    this.scrnsht = random(scrnshts);
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    
    image(this.scrnsht, this.x, this.y);
    // stroke(255);
    // strokeWeight(4);
    // fill(this.brightness, 125);
    // ellipse(this.x, this.y, this.r * 2);
  }
}
