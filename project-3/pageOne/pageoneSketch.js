let pfOne;
let likeOne;
let rtOne;
let commentOne;
let shareOne;
let dotsOne;
let posts = []; // an array
let pfTwo;
let pfThree;

function preload() {
  pfOne = loadImage('assets/HUSEYNOV.jpeg');
  likeOne = loadImage('assets/LIKE.jpeg');
  commentOne = loadImage('assets/COMMENT.png');
  rtOne = loadImage('assets/RETWEET.png');
  shareOne = loadImage('assets/SHARE.png');
  dotsOne = loadImage('assets/DOTS.jpeg');
  pfTwo = loadImage('assets/ALIYEV.jpeg');
  pfThree = loadImage('assets/TOGHRUL.jpeg');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  
  frameRate(20);
  
  posts1 = new Post (random(800), random(800)); 
  posts2 = new Post (random(800), random(800));
  posts3 = new Post (random(800), random(800));
  
}

function mouseDragged() {
  let r = random(10, 50);
  let b = new Post(mouseX, mouseY);
  posts.push(b);
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
  
  for (let post of posts) {
    post.move();
    post.tweetOne();
    post.tweetTwo();
    post.tweetThree();
  }
  
    posts1.tweetOne();
    posts2.tweetTwo();
    posts3.tweetThree();

  for (let i = 0; i < posts.length; i++) {
    posts[i].move();
    posts[i].tweetOne();
    posts[i].tweetTwo();
    posts[i].tweetThree();
  }

}

  class Post{
  //creates object
  constructor(x, y){
    
  this.x = x;
  this.y = y;
  this.px = this.x + 750;
  this.py = this.y + 220;
  }
  
  tweetOne(){
      
    //white rectangle
    stroke(0);
    strokeWeight(2);
    fill(255);
      
    this.x = this.x + random(-10, 10);
    this.y = this.y + random(-10, 10);
  
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
    
  tweetTwo(){
    
    //white rectangle
    stroke(0);
    strokeWeight(2);
    fill(255);
  
    this.x = this.x + random(-10, 10);
    this.y = this.y + random(-10, 10);
  
    rect(this.x, this.y, 750, 220);
  
    image(pfTwo, this.x + 15, this.y + 20, 50, 50);
  
    image(commentOne, this.x + 85, this.y + 165, 30, 30);
  
    image(rtOne, this.x + 245, this.y + 165, 35, 35);
  
    image(likeOne, this.x + 405, this.y + 165, 30, 30);
  
    image(shareOne, this.x + 565, this.y + 165, 30, 30);
  
    image(dotsOne, this.x + 675, this.y + 15, 30, 30);
  
    textSize(18);
    noStroke();
    fill(150);
    text("@presidentaz • Nov 14, 2021", this.x + 200, this.y + 35)
  
    fill(0);
    stroke(255, 255, 255);
    strokeWeight(1);
    textSize(20);
    text("Ilham Aliyev", this.x + 85, this.y + 35)
  
    strokeWeight(0);
    textWrap(WORD);
    textAlign(LEFT);
    text("I do hope that Armenia, which has been defeated because of its policy of aggression, will sooner or later realize that its territorial claims to any country will not bring them good or honor.", this.x + 85, this.y + 52, 650);
    
  }
    
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
    
  tweetThree(){
    
    
    //white rectangle
    stroke(0);
    strokeWeight(2);
    fill(255);
    
    rect(this.x, this.y, 750, 220);
  
    image(pfThree, this.x + 15, this.y + 20, 50, 50);
  
    image(commentOne, this.x + 85, this.y + 165, 30, 30);
  
    image(rtOne, this.x + 245, this.y + 165, 35, 35);
  
    image(likeOne, this.x + 405, this.y + 165, 30, 30);
  
    image(shareOne, this.x + 565, this.y + 165, 30, 30);
  
    image(dotsOne, this.x + 675, this.y + 15, 30, 30);
  
    textSize(18);
    noStroke();
    fill(150);
    text("@TGR_Republican • April 12, 2022", this.x + 250, this.y + 35)
  
    fill(0);
    stroke(255, 255, 255);
    strokeWeight(1);
    textSize(20);
    text("Toghrul Iskenderli", this.x + 85, this.y + 35)
  
    strokeWeight(0);
    textWrap(WORD);
    textAlign(LEFT);
    text("Amid the visible rapprochement between Armenia and Azerbaijan, one of the war criminals who happens to lead the Armenian parliamentary opposition, fixed the separtist flag onto the tribune with his saliva and announced they were going to Karabakh, Azerbaijan", this.x + 85, this.y + 52, 650);
    
  }
    
}
