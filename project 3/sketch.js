let pfOne;
let likeOne;
let rtOne;
let commentOne;
let shareOne;
let dotsOne;
let posts = []; // an array

function preload() {
  pfOne = loadImage('assets/HUSEYNOV.jpeg');
  likeOne = loadImage('assets/LIKE.jpeg');
  commentOne = loadImage('assets/COMMENT.png');
  rtOne = loadImage('assets/RETWEET.png');
  shareOne = loadImage('assets/SHARE.png');
  dotsOne = loadImage('assets/DOTS.jpeg');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  
  for (let i = 0; i < 3; i ++){
   posts[i] = new Post (random(width), random(height)) 
    
  }
  

  
}

function draw() {
  // background(20, 50, 255);

  
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
  
  for (let i = 0; i < 5; i ++){
   posts[i].body(); 
    
  }
  
}

  class Post{
  //creates object
  constructor(x, y){
    
  this.x = x;
  this.y = y;
  }
    
    body(){
      
    //white rectangle
  stroke(0);
  strokeWeight(2);
  fill(255);
  rect(this.x, this.y, 750, 220);
  
  image(pfOne, this.x + 15, this.y + 20, 50, 50);
  
  image(commentOne, this.x + 85, this.y + 165, 30, 30);
  
  image(rtOne, this.x + 245, this.y + 165, 35, 35);
  
  image(likeOne, this.x + 405, this.y + 165, 30, 30);
  
  image(shareOne, this.x + 565, this.y + 165, 30, 30);
  
  image(dotsOne, this.x + 675, this.y + 15, 30, 30);
  
  textSize(18);
  noStroke();
  fill(150);
  text("@RusifHuseynov2 • Nov 26, 2021", this.x + 230, this.y + 35)
  
  fill(0);
  stroke(255, 255, 255);
  strokeWeight(1);
  textSize(20);
  text("Rusif Huseynov", this.x + 85, this.y + 35)
  
  strokeWeight(0);
  textWrap(WORD);
  textAlign(LEFT);
  text("Armenia feels like a prisoner who is sure he will be sentenced to death. Thus, the only chance to prolong his life is to delay the trial and hope for a miracle. Who knows: maybe during investigation, the death penalty will be abolished or it`ll be possible to escape from prison.", this.x + 85, this.y + 52, 650);
      
    }
    
}
