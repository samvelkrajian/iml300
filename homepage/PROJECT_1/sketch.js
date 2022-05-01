// With this project, I wanted to explore the sound synthesis capabilities of p5js, and create a discrete and fun performing environment. There are three instruments at play; polySynth, loopSynth, and bassSynth. The polySynth is a polyphonic synthesizer that can be played like a piano using the keyboard as its source of pitches. 

//The computer keyboard layout is modeled after the keyboard piano roll capabilities found in most DAW's (Digital Audio Workstations). The loopSynth has a fixed array of pitches, and the bassSynth can play the notes C1, G1, E1, and F1, using the keys 'z' 'x' 'c' and 'v'.

// The bassSynth can be toggled on and off with the 'n' and 'm' keys.

// The loopSynth can be toggled on and off with the 'r' and 'q' keys. All key-related interactions in this patch are in lower-case. Make sure Caps-Lock is not on!

// The user is able to view the audio being played by the visualizers, and have personal computer-music jam sessions. Play around with the patch and enjoy! 

let attackTime = 0.1;
let decayTime = 0.2;
let susRatio = 0.1;
let releaseTime = 1;
let keysynth;
let envelope;
let carrier;
let carrierBaseFreq = 42; 
let modulator;
let modMaxFreq = 100;
let modMinFreq = 0;
let modMaxDepth = 450;
let modMinDepth = -450;
let monosynth, soundLoop;
let notePattern = [60, 62, 64, 67, 69, 72];  
let fft; 
let polyrect;
let num = 2000;
let fftpoly; 
let bassAmpVal, loopAmpVal;

function setup() {
  
  // polySynth Delay Feedback Control
  polySlider = createSlider(0, 255, 0);
  polySlider.position(305, 620);
  polySlider.style('width', '495px');
  polySlider.addClass("mySliders");
  
  // loopSynth Delay Feedback Control
  loopSlider = createSlider(0, 255, 0);
  loopSlider.position(305, 670);
  loopSlider.style('width', '495px');
  loopSlider.addClass("mySliders");
  
  // bassSynth Modulating Frequency Control
  bassSlider = createSlider(0, 255, 0);
  bassSlider.position(305, 725);
  bassSlider.style('width', '495px');
  bassSlider.addClass("mySliders");
  
  // loopSynth Arp Size Control
  loopArpSlider = createSlider(0, 6, 0, 1);
  loopArpSlider.position(305, 770);
  loopArpSlider.style('width', '160px');
  loopArpSlider.addClass("mySliders");
  
  // loopSynth Volume Control
  loopAmpSlider = createSlider(0.0, 1.0, 0, 0.01);
  loopAmpSlider.position(475, 770);
  loopAmpSlider.style('width', '160px');
  loopAmpSlider.addClass("myAmpSliders");
  
  // bassSynth Volume Control
  bassAmpSlider = createSlider(0.0, 1.0, 0, 0.01);
  bassAmpSlider.position(640, 770);
  bassAmpSlider.style('width', '160px');
  bassAmpSlider.addClass("myAmpSliders");
  
  let cnv = createCanvas(windowWidth, windowHeight);
  
  //FM - Bass Synth
  carrier = new p5.Oscillator('sine');
  carrier.amp(bassAmpVal); // set amplitude
  carrier.freq(carrierBaseFreq); // set frequency
  carrier.start(); // start oscillating
  modulator = new p5.Oscillator('sawtooth');
  modulator.start();
  modulator.disconnect();
  carrier.freq(modulator);

  
  // Main Polyphonic Synthesizer
  env = new p5.Envelope();
  keysynth = new p5.PolySynth();
  delayPoly = new p5.Delay();
  keysynth.setADSR(attackTime, decayTime, susRatio, releaseTime);
  //keysynth.amp(polyAmpVal)
  
  // Looping Synth
  delayLoop = new p5.Delay();
  let intervalInSeconds = 0.25;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  loopsynth = new p5.MonoSynth();
  
  // Initializing FFT Analysis of Instruments
  fftbass = new p5.FFT();
  fftbass.setInput(carrier);
  fftpoly = new p5.FFT();
  fftpoly.setInput(keysynth);
  fftloop = new p5.FFT();
  fftloop.setInput(loopsynth);
  
  userStartAudio();
  
  textFont('Georgia');
  
}

function draw() {

  // Variables for Receiving Slider Values
  let loopAmpVal = loopAmpSlider.value();
  let bassAmpVal = bassAmpSlider.value();
  let polyVal = polySlider.value();
  let loopVal = loopSlider.value();
  let bassVal = bassSlider.value();
  
  // Assigning Sliders to Control bassSynth and loopSynth Amplitudes
  carrier.amp(bassAmpVal);
  loopsynth.amp(loopAmpVal);
  
  background(0);
  
  // General Module on the left to analyze instruments' waveforms
  fill(0); 
  stroke(255);
  strokeWeight(2);
  rect(50, 50, 200, 750);
  
  // polySynth Spectrogram Module
  fill(fftpoly.getEnergy('mid') * 3, polyVal,fftbass.getEnergy('bass')); // polysynth
  stroke(255);
  strokeWeight(2);
  let polyrect = rect(300, 50, 150, 500);
  
  // loopSynth Spectrogram Module
  fill(fftpoly.getEnergy('mid') * 3,fftloop.getEnergy('highMid'),fftloop.getEnergy('mid') * 100); // loopsynth 
  stroke(255);
  strokeWeight(2);
  rect(480, 50, 150, 500);
  
  // bassSynth Spectrogram Module
  fill(fftloop.getEnergy('mid') * 100, fftbass.getEnergy('mid'), fftbass.getEnergy('lowMid')); // bass synth 
  stroke(255);
  strokeWeight(2);
  rect(660, 50, 150, 500);
  
  delayPoly.process(keysynth, 0.5, polyVal/256, 5000);
  delayLoop.process(loopsynth, 0.75, loopVal/256, 5000);
  
  // map mouseY to modulator freq between a maximum and minimum frequency || bassSynth
  let modFreq = map(bassVal, 0, 255, modMinFreq, modMaxFreq);
  modulator.freq(modFreq);

  // change the amplitude of the modulator || bassSynth
  // negative amp reverses the sawtooth waveform, and sounds percussive
  //
  let modDepth = map(bassVal, 0, 255, modMinDepth, modMaxDepth);
  modulator.amp(modDepth);
  
  // Controller Pad
  fill(polyVal, loopVal, bassVal);  
  stroke(255);
  strokeWeight(2);
  rect(300, 590, 510, 210);
  
  // Setting Text to the Sliders
  strokeWeight(0);
  fill(255);
  let ab = 'polySynth feedback level'
  text(ab, 310, 610);
  let bc = 'loopSynth feedback level'
  text(bc, 310, 660);
  let cd = 'bass frequency modulation'
  text(cd, 310, 715);
  let de = 'loopSynth arp.'
  text(de, 310, 760);
  let ef = 'loopSynth amp.'
  text(ef, 480, 760);
  let fg = 'bassSynth amp.'
  text(fg, 645, 760);
  
  // Waveform for polySynth
  fill(0);
  let waveformPoly = fftpoly.waveform(); 
  //translate(0, 400);
  beginShape();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < waveformPoly.length; i++) {
    let x = map(i, 0, waveformPoly.length, 50, 250);
    let y = map(waveformPoly[i], -2, 2, 0, 300);
    vertex(x, y);
  }
  endShape();
  
  // Waveform for loopSynth
  let waveformLoop = fftloop.waveform(); // analyze the loop synth
  translate(0, 275);
  beginShape();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < waveformLoop.length; i++) {
    let x = map(i, 0, waveformLoop.length, 50, 250);
    let y = map(waveformLoop[i], -1, 1, 0, 300);
    vertex(x, y);
  }
  endShape();
  
  // Waveform for bassSynth
  let waveformBass = fftbass.waveform(); // analyze the bass
  translate(0, 275);
  beginShape();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < waveformBass.length; i++) {
    let x = map(i, 0, waveformBass.length, 50, 250);
    let y = map(waveformBass[i], -2, 2, 0, 300);
    vertex(x, y); 
  }
  endShape();
  
  // Spectrum for polySynth
  let polyspectrum = fftpoly.analyze();
  translate(0, 50);
  beginShape();
  translate(300, -511)
  //scale(0.25, 1); 
  stroke(255);
  strokeWeight(2);
  for (i = 0; i < polyspectrum.length / 6.8; i++) {
    vertex(i, map(polyspectrum[i], 100, 255, 300, 50));
  }
  endShape();
  
  // Spectrum for loopSynth
  let loopspectrum = fftloop.analyze();
  beginShape();
  translate(180,0)
  //scale(0.25, 1); 
  stroke(255);
  strokeWeight(2);
  for (i = 0; i < loopspectrum.length / 6.8; i++) {
    vertex(i, map(loopspectrum[i], 100, 255, 300, 50));
  }
  endShape();
  
  // Spectrum for bassSynth
  let bassspectrum = fftbass.analyze();
  beginShape();
  translate(180,0)
  //scale(0.25, 1); 
  stroke(255);
  strokeWeight(2);
  for (i = 0; i < bassspectrum.length / 6.8; i++) {
    vertex(i, map(bassspectrum[i], 100, 255, 300, 50));
  }
  endShape();
}

function keyTyped() {
  // Keyboard for polySynth
  if (key === 'a') {
    keysynth.play('C6', 0.4, 0, 1);
  }
  if (key === 'w') {
    keysynth.play('C#6', 0.4, 0, 1);
  }
  if (key === 's') {
    keysynth.play('D6', 0.4, 0, 1);
  }
  if (key === 'e') {
    keysynth.play('D#6', 0.4, 0, 1);
  }
  if (key === 'd') {
    keysynth.play('E6', 0.4, 0, 1);
  }
  if (key === 'f') {
    keysynth.play('F6', 0.4, 0, 1);
  }
  if (key === 't') {
    keysynth.play('F#6', 0.4, 0, 1);
  }
  if (key === 'g') {
    keysynth.play('G6', 0.4, 0, 1);
  }
  if (key === 'y') {
    keysynth.play('G#6', 0.4, 0, 1);
  }
  if (key === 'h') {
    keysynth.play('A7', 0.4, 0, 1);
  }
  if (key === 'u') {
    keysynth.play('A#7', 0.4, 0, 1);
  }
  if (key === 'j') {
    keysynth.play('B7', 0.4, 0, 1);
  }
  if (key === 'k') {
    keysynth.play('C7', 0.2, 0, 1);
  }
  if (key === 'o') {
    keysynth.play('C#7', 0.2, 0, 1);
  }
  if (key === 'l') {
    keysynth.play('D7', 0.2, 0, 1);
  }
  // Pitches for bassSynth
  if (key === 'z') {
    carrier.freq(32);
  }
  if (key === 'x') {
    carrier.freq(49);
  }  
  if (key === 'c') {
    carrier.freq(41.2);
  }  
  if (key === 'v') {
    carrier.freq(43.65);
  }  
  // Starting loopSynth
  if (key === 'r') {
    soundLoop.start();
  }
  if (key === 'q') {
    soundLoop.stop();
  }
  // Starting bassSynth
  if (key === 'n') {
    carrier.start();
    //carrier.amp(0.7);
  }
  if (key === 'm') {
    carrier.stop();
    //carrier.amp(0);
  }
}

// Receiving Pitch Data from loopSynth Array
function onSoundLoop(timeFromNow) {
  let loopArpVal = loopArpSlider.value();
  let noteIndex = (soundLoop.iterations - 1) % loopArpVal;
  let note = midiToFreq(notePattern[noteIndex]);
  loopsynth.play(note, 0.25, timeFromNow);
  background(noteIndex * 360 / notePattern.length, 50, 100);
}