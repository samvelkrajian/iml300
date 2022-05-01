// This animated patch came from two seperate experiments, with both being inspired by the same artist. First experiment was to have the "line" shape actively spiral and reach the edges of the canvas in a uniform way, and the other experiment was playing with pairing the "sphere" and "box" shapes and allowing them to coexist in an animated and chaotic space, playing with the size of the shapes to find interesting 3D layers that arrive from these different instances. The inspiration of Ryoji Ikeda is plentiful I believe in this patch -- one inspiration being the direct reference to a natural galactic phenomena (the sun, a star in our universe), the other inspiration being the use of protruding and dynamic lines. I wanted there to be a sense of energy, and drama, I hope I achieve that!

// Press the canvas to save an image as 'galaxysketch.jpg'

// Move the mouse around to find color changes in the animation, as well as the arising and departure of the sun. Mouse movement also slightly infuences rotating patterns. 

// Have fun!!

function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(0);
  
    for (w = 10; w < 800; w = w + 5) {
    for (h = mouseY; h < 800; h = h + 5);{
  stroke(random(255), 0, mouseY);
  strokeWeight(20);
  line(w / 20, h / 10, 0, 800);
      fill(random(255), 0, mouseY);
      stroke(255, random(255), 0);
  strokeWeight(1);
  rotateX(frameCount * 0.0000001);
  rotateY(frameCount * 0.0000001);
      sphere(mouseX/4);
  rotateX(frameCount * 0.001 / h);
  rotateY(frameCount * 0.0001);
      box(250)
  rotateX(frameCount * 0.001);
  rotateY(frameCount * 0.01 / w); 
      box(250)
    }
    }
}

function mousePressed(){
  saveCanvas('galaxysketch.jpg');
}