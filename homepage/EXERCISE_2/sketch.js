// Samvel Krajian
// IML 300
// January 24th, 2022
// With this patch we are able to allow incoming audio to act as a modulation source for a waveform and a "quad" shape. Sound exists as the stimulating force of the brush within this work, taking the it's own physical form (the waveform) and a reactionary model (the quad) as the actual "brushes" at play. The user is able to  interact with the system, and in a game-like-fashion attempt to draw while simultaneously stimulating and disrupting the work. 

// Allow audio input and start making some noise!

let mic, fft;
let symmetry = 2;   
let angle = 360 / symmetry;
let sR; // press 1| color change 1 for waveform [fill red]
let sG; // press 2| color change 2 for waveform [fill white]
let sB; // press 3| color change 3 for waveform [fill random color]
let tR; // press q| color change 1 for quad [fill red]
let tG; // press w| color change 2 for quad [fill white]
let tB; // press e| color change 3 for quad [fill random color]

function setup() {
  createCanvas(windowWidth, windowHeight);
    background(255);
  
  // Create an Audio input
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  
  // Start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  
}

function draw() {
  let vol = mic.getLevel();
  let h = map(vol, 0, .1, height, 0);
  let spectrum = fft.analyze();
  let audioheight = 500 
  
  // Audio Waveform
  let waveform = fft.waveform(); // analyze the waveform
  beginShape();
  strokeWeight(1);
  fill(sR,sG,sB);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 100, waveform.length, 0, width);
    let y = map(waveform[i], -.1, .1, height, 0);
    vertex(x, y);
  }
  endShape();
  
  // MouseDrawing Shape / Kaleidoscope 
  translate(width / 2, height / 2);
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let pmx = pmouseX - width / 2;
  let pmy = pmouseY - height / 2;
      fill (tR, tG, tB);
      if (mouseX < width/2){ 
      strokeWeight(10);
      } else {
      strokeWeight(1);
      }
      if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        strokeWeight(1);
        quad(h, my, pmx, pmy, h * 100, h , h * 100, h);
        push();
        scale(1, -1);
        quad(h * 100, h , h * 200, h, mx, my, pmx, pmy);
        pop();
      }
    }
  }
}
// Defining Color Variables 
function keyTyped(){

  if (key == "1") {
    sR = 255;
    sG = 0;
    sB = 0;
  }
  if (key == "2") {
    sR = 255;
    sG = 255;
    sB = 255;
  }
  if (key == "3") {
    sR = random(255);
    sG = random(255);
    sB = random(255);
  }
  
    if (key == "q") {
    tR = 255;
    tG = 0;
    tB = 0;
  }
  if (key == "w") {
    tR = 255;
    tG = 255;
    tB = 255;
  }
  if (key == "e") {
    tR = random(255);
    tG = random(255);
    tB = random(255);
  }
  function keyTyped(){
  if (key == "s"){
  save('myCanvas.jpg');
  }
  }
}