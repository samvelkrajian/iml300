// For this exercise I was thinking a lot about collages and inserting yourself into a collage, to somehow symbolize the varied and uncontrollable ways we exist on the internet. This is an idea I want to explore further in future projects in this class, but I want to represent the online presence looking back at you in a way, acting as a virtual mirror. Ones activities and content being a mirror of themselves. You are what you search? One thing (out of many) that I would like to correct in future iterations of this patch is the latency issues, I feel this patch and its pieces would be much more effective if it did not lag. 

// Press the canvas to save an image as 'mirrorsketch.jpg'

// Enjoy!!

function setup() {
  createCanvas(800, 800);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
}

function draw() {
  background(random(255), random(255), random(255));
    for (w = 0; w < width; w = w + 50) {
    for (h = 0; h < height; h = h + 100){
    for (z = 10; h < height; h = h + 100){
  rotate(frameCount / 10000 * h);{
  image(capture, w, h, 20 * random(20), 20 * random(20));
    if(random()<0.5){
      filter(INVERT);
    } else {
      filter(OPAQUE);
    }
    frameRate(30);
    // noprotect
    }
   }
  }
 }
}

function mousePressed(){
  saveCanvas('mirrorsketch.jpg');
}