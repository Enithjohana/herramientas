// Escala de notas midi
var notas = [60,62,64,65,67,69,71,72];
var paleta = ['#FF645B','#E846BE','#C867FF','#6F5DE8','#5B96FF','#51C5FF','#3DE8CC','#5DFF90']
var paleta2= ['#FF968A','#E87FA8','#D78FFF','#9086E8','#8CBDFF','#8EDCFF','#82E8D6','#91FFB1']
var autoplay = false;
var osc;


function setup() {
  createCanvas(600, 200);
  noStroke();
  smooth();
  background(230);
 
  // A triangle oscillator
  osc = new p5.Oscillator();
  // Start silent
  osc.start();
  osc.amp(0);
}

// Función para tocar las notas
function tocarNota(nota, duracion) {
  osc.freq(midiToFreq(nota));
  // Fade it in
  osc.fade(0.5,0.2);

  // desvanecer después de la duración
  if (duracion) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duracion-50);
  }
}

function draw() {

 
  // dibujar el teclado
  
  // Ancho de cada nota
  var a = width / notas.length;
  for (var i = 0; i < notas.length; i++) {
    var x = i * a;
    // Si el mouse está sobre la techa
    if (mouseX > x && mouseX < x + a && mouseY < height) {
      // Si mouse está haciendo click

      if (mouseIsPressed) {
        fill(paleta[i]);
      // Si el mouse está sobre
      } else {
        fill(paleta2[i]);
      }
    } else {
      fill(200);
    }

    //Dibujar las teclas como Rectáctángulos
    //rect(x, 0, a-1, height-1);
    
    //dibujar las teclas como círculos
    ellipse(x+a/2,height/2,a,a);
  }

}

// Cuando se hace click
function mousePressed() {
  // Rastrear donde se hace clic
  var key = floor(map(mouseX, 0, width, 0, notas.length));
  tocarNota(notas[key]);
}

// Disminuir sonido cuando se deja de tocar
function mouseReleased() {
  osc.fade(0,0.5);
}