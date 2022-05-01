let osc, playing, freq, amp, getFreq;

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sawtooth');
}

function draw() {
  background(220,mouseX,mouseY);
  
  noStroke();
  
  //face
  fill(220,190,172);
  ellipse(300,300, 210, 300);
  
  //eyes
  fill(255,255,255);
  ellipse(340, 275, 50, 30);
  ellipse(260, 275, 50, 30);
  fill(mouseX,50,mouseY);
  circle(340,275,20);
  circle(260,275,20); 
  fill(0);
  circle(340,275,10);
  circle(260,275,10);
  
  
  //eyebrows
  fill(0);
  rect(315,240, 46, 10);
  rect(240,240, 46, 10);
  
  //nose
  noFill(); 
  strokeWeight(2);
  stroke(0);
  arc(285, 330, 20, 10, 0, PI);
  arc(315, 330, 20, 10, 0, PI);
  
  //mouth
  noStroke();
  fill(240,20,0);
  circle(300,380,58);
  fill(mouseX,mouseY,0);
  circle(300,380,40);
  
  //set constraints to limits of oscillator
  freq = constrain(map(mouseX, 0, width, 0, 5000), 0, 5000);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  // a pseudo-envelope the audio, which I depleted 
  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0);
    osc.amp(amp, 0);
  }
}
  //these final two functions allow mouse-click-control over the audio
function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0);
  playing = false;
}