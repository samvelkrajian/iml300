// Tutorial 8.2 Array of Objects, Xin Xin. ✨ Special thanks to artist & SUNY Purchase professor Lee Tusman for giving me the idea of using Frogger to teach class and objects ✨

let posts = []; // empty array
let content = [];

function preload() {
  for (let i = 0; i < 8; i++) {
    content[i] = loadImage(`posts/post${i}.jpg`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  noSmooth();
  
  for (let i = 0; i < 10; i++){
    
    posts[i] = new Post (random(width), random(height));
  
    frameRate(40);
    
  }
  
}

function draw() {
  background(0);
  
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
  
  for (let i = 0; i < 10; i++){
    
    posts[i].body();
    posts[i].move();
  }
  
  textAlign(RIGHT);
  textSize(150);
  fill(random(255),random(255),random(255));
  text("#qarabag-bizimdir", 500, 500);
  
  textAlign(RIGHT);
  textSize(150);
  fill(random(255),random(255),random(255));
  text("#erivan-bizimdir", 500, 500);
  
  textAlign(RIGHT);
  textSize(150);
  fill(random(255),random(255),random(255));
  text("bizimdir", random(500), 500);
  
  textAlign(RIGHT);
  textSize(150);
  fill(random(255),random(255),random(255));
  text("bizimdir", random(500), random(500));
}

class Post {
  
  constructor(x, y){ // a special method that creates the car object
    
  this.x = x;
  this.y = y;
  this.content = random(content);
    
  }
  
  body(){
    scale(random(0.8, 1));
    image(this.content, this.x, this.y);
  }
  
  move(){
    this.y = this.y + 10;
    
    if (this.y > height){
      this.y = 0;
    }
    
  }
  
}