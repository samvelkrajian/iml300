// Music Video for Levitation 21 by Tigran Hamasyan

// Tigran's music is often mathematical in its approach of musical ideas and form, and this piece is often discussed to be geometric in very ways. I wanted to represent the geometric and mathematical qualities of Tigran's music through this music video! 

// STROBE WARNING !!

let sound, amplitude;
let r;
let factor = 0;

function preload(){
  sound = loadSound('assets/levitation30sec.mp3');
}

function setup() {
  createCanvas(800, 800);
  amplitude = new p5.Amplitude();
  amplitude.setInput(sound);
  sound.loop();
  
  r = height / 2 - 16;
  
  fft = new p5.FFT();
}

function getVector(index, total) {
  const angle = map(index % total, 0, total, 0, TWO_PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

function draw() {
  background(0);
  let level = (amplitude.getLevel()) * 0.001;

  if (sound.currentTime() < 10) {
  // This sphere geometry is taken from a coding train video! 
  const total = 200; //int(map(mouseX, 0, width, 0, 200));
  factor += 0.015;
  
  fill(random(255), random(255), random(255));
  translate(width / 2, height / 2);
  stroke(255, 150);
  strokeWeight(5);
  //noFill();
  ellipse(0, 0, r * 2);

  strokeWeight(2);
  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor, total);
    line(a.x, a.y, b.x, b.y);
  }
  
  
    
  } else if (sound.currentTime() < 12) {
  fill(255);
  textFont('helvetica');
  textSize(width/80);
for(let col = 0; col <= windowHeight; col = col + 10) { 
  text(level, windowWidth/2, col);
  textAlign(RIGHT);
  }

        
  } else if (sound.currentTime() < 14) {
  fill(255);
  textFont('helvetica');
  textSize(width/80);
for(let col = 0; col <= windowHeight; col = col + 10) {
  for(let j = 300; j <= 600; j = j +125){
  text(level, j, col);
  textAlign(CENTER);
  }
}
  } else if (sound.currentTime() < 16) { 
  fill(255);
  textFont('helvetica');
  textSize(width/80);
for(let col = 0; col <= windowHeight; col = col + 10) {
  for(let j = 200; j <= 700; j = j +125){
  text(level, j, col);
  textAlign(RIGHT);
  }
}
        
  } else if (sound.currentTime() < 19) {
  background(random(255), random(255), random(255));
  fill(255);
  textFont('helvetica');
  textSize(width/80);
for(let col = 0; col <= windowHeight; col = col + 10) {
  for(let j = 0; j <= windowWidth; j = j +125){
  text(level, j, col);
  textAlign(CENTER);
  }
}
        
  } else if (sound.currentTime() < 27) {
  let waveform = fft.waveform(); // analyze the waveform
  beginShape();
  strokeWeight(5);
  stroke(255);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
    
  } else {
    
  background(random(255), random(255), random(255));
  let waveform = fft.waveform(); // analyze the waveform
  beginShape();
  strokeWeight(3);
  stroke(255);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -0.5, 0.5, height, 0);
    vertex(x, y);
  }
  endShape();
    
  const total = 200; //int(map(mouseX, 0, width, 0, 200));
  factor += 0.015;
  
  translate(width / 2, height / 2);
  stroke(255, 150);
  strokeWeight(4);
  noFill();
  ellipse(0, 0, r * 2);

  strokeWeight(2);
  for (let f = 0; f < total; f++) {
    const a = getVector(f, total);
    const b = getVector(f * factor, total);
    line(a.x, a.y, b.x, b.y);
  }
}

function mousePressed() {
  if (sound.isPlaying() ){
    sound.stop();
  } else {   
    sound.play();
  }
}
}