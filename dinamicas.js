
function dinamicas() {
  //config.draw();
  //casos de juego, 0,iniciar tuttorial, 1 juego, 2 pausa, 3 game over
  switch (tablero.estado) {
    case 0:
      inicio();
      break;

    case 1:
      juego();
      break;
    case 2:
      espera();
      break;

    case 3:
      game_over();
      break;

    default:
      break;
  }


}

function game_over() {

  //verifica musica
  intro.setVolume(tablero.volumen);
  if (!intro.isPlaying()) {
    intro.play();

  }

  tablero.informacion();
  fill(0, 200, 0);
  textSize(1.5 * tablero.escala);
  jugar.locate(2 * tablero.escala, 1 * tablero.escala);
  jugar.draw();
  text("GAME OVER", 1.5 * tablero.escala, 12 * tablero.escala);
}

function espera() {
  muscia_juego.setVolume(tablero.volumen);
  intro.setVolume(tablero.volumen);
  boton_pausa.draw();
  //informacion del jugador
  tablero.informacion();
  text("PAUSA", 15 * tablero.escala, 9 * tablero.escala);
}

function juego() {

  tablero.background_draw('#44049c', '#040404')
  tablero.dibujar();
  figura.dibujar();
  tablero.dibujar_marco(12, 5, 10, 22)

  //elementos del talbero
  tablero.lupa_virus([6, 21], [[4.5, 17], [6.5, 20], [2, 20]]);

  gravedad();
  //tablero.verificar_lineas();

}

function gravedad(){
  if(frameCount % 32 == 0){
    figura.mover(0, 1);
  }
}

function inicio() {

  let time = second();

  textFont(fuente);

  tablero.background_draw('#045404', '#04ac04 ');

  //dibujar pildora
  fill('#0474ec');
  rect(6 * tablero.escala, 5 * tablero.escala, 10 * tablero.escala, 10 * tablero.escala, 0 * tablero.escala);
  circle(7 * tablero.escala, 10 * tablero.escala, 10 * tablero.escala);
  fill('#e4045c');
  rect(16 * tablero.escala, 5 * tablero.escala, 10 * tablero.escala, 10 * tablero.escala, 0 * tablero.escala);
  circle(25 * tablero.escala, 10 * tablero.escala, 10 * tablero.escala);

  //nombre mario
  fill(0);
  textSize(2.5 * tablero.escala);
  text('Dr. MARIO', 4.8 * tablero.escala, 9.2 * tablero.escala, 25 * tablero.escala, 5 * tablero.escala);
  fill(255);
  textSize(2.5 * tablero.escala);
  text('Dr. MARIO', 5 * tablero.escala, 9 * tablero.escala, 25 * tablero.escala, 5 * tablero.escala);
  //menu mario
  fill(0);
  rect(4 * tablero.escala, 20 * tablero.escala, 25 * tablero.escala, 7 * tablero.escala, 5 * tablero.escala);
  image(mario_esperando, 4 * tablero.escala, 21 * tablero.escala, 4.5 * tablero.escala, 5 * tablero.escala);
  image(virus_azul_caminado, 25 * tablero.escala, 22 * tablero.escala, 3.5 * tablero.escala, 3.5 * tablero.escala);

  //texto
  fill(255);
  textSize(1 * tablero.escala + ((time % 2) * 0.05 * tablero.escala));
  textAlign(CENTER);
  text('PRESS ENTER', 10 * tablero.escala, 23 * tablero.escala, 15 * tablero.escala, 2 * tablero.escala);
  //verifica musica
  /*     intro.setVolume(tablero.volumen);
      if(!intro.isPlaying()){
       intro.play();
        
      } */

}




function windowResized() {
  responsive(tamaño);
  resizeCanvas(windowWidth, windowHeight);
}

//carga musica e imagenes
function preload() {
  //carga de animaciones
  mario_esperando = loadGif('img/mario/esperando.gif');
  margen = loadGif('img/margen.png');


  //virus
  virus_sprites = [

    virus_azul_caminado = loadGif('img/azul/caminando.gif'),
    virus_azul_muriendo = loadGif('img/azul/muriendo.gif'),
    virus_azul_riendo = loadGif('img/azul/riendo.gif'),

    virus_rojo_caminado = loadGif('img/rojo/caminando.gif'),
    virus_rojo_muriendo = loadGif('img/rojo/muriendo.gif'),
    virus_rojo_riendo = loadGif('img/rojo/riendo.gif'),

    virus_amarillo_caminado = loadGif('img/amarillo/caminando.gif'),
    virus_amarillo_muriendo = loadGif('img/amarillo/muriendo.gif'),
    virus_amarillo_riendo = loadGif('img/amarillo/riendo.gif')
  ]





  //carga de fuente texto;
  fuente = loadFont('text/PressStart2P.ttf')

  /*  
  muscia_juego = loadSound('sound/juego.m4a'); */

}

function touchStarted() {
  getAudioContext().resume();
}


//funcion para cambiar el nivel de la musica   
function range(x) {
  x = parseFloat(x);
  tablero.volumen = x;
}





