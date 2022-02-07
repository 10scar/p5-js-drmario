
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

    case 4:
      menu();
      break;

    case 5:
      animacion_lanzar();
      break;

    default:
      break;
  }


}

function game_over() {

  //verifica musica
  /*intro.setVolume(tablero.volumen);
  if (!intro.isPlaying()) {
    intro.play();

  }*/

  //tablero.informacion();
  fill(0, 200, 0);
  textSize(1.5 * tablero.escala);
  //jugar.locate(2 * tablero.escala, 1 * tablero.escala);
  //jugar.draw();
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

  tablero.background_draw('#44049c', '#040404');
  tablero.dibujar_marco(12, 5, 10, 22);
  tablero.dibujar();
  //figura.actualizarnextfigura();
  figura.dibujar();


  //elementos del talbero
  tablero.lupa_virus([6, 21], [[4.5, 17], [6.5, 20], [2, 20]]);
  tablero.puntuacion_jugador([0, 4], [23, 16]);
  tablero.animacion_mario([23, 8], 0);
  figura.siguiente();

  //se verifica que no se pueda mover la figura hacia abajo
  if (!figura.tryMove(0, 1) & frameCount % (32 + 5) == 0) {
    if (!tablero.actualizaroterminar()) {
      tablero.estado = 3;
    } else {
      figura.vida = 0;
      figura.reiniciar();
      tablero.estado =5;
    }
  }

  tablero.romperpildoras();
  tablero.eliminarblanks();
  tablero.verificar_lineas();
  tablero.actualizarpuntaje();
  gravedad();
}

function gravedad() {
  if (frameCount % 32 == 0) {
    figura.mover(0, 1);
  }
  if (frameCount % 4 == 0) {
    tablero.bajarpildorasrotas();
  }
}

function inicio() {

  let time = second();



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


function animacion_lanzar(){

  tablero.background_draw('#44049c', '#040404');
  tablero.dibujar_marco(12, 5, 10, 22);
  tablero.dibujar();
  figura.actualizarnextfigura();
  

  //elementos del talbero
  tablero.lupa_virus([6, 21], [[4.5, 17], [6.5, 20], [2, 20]]);
  tablero.puntuacion_jugador([0, 4], [23, 16]);
  tablero.animacion_mario([23, 8], 0);
  figura.lanzar();

  gravedad();
  tablero.verificar_lineas();
  tablero.romperpildoras();

}

function windowResized() {
 // responsive(tamaño);
 // resizeCanvas(windowWidth, windowHeight);
}

//carga musica e imagenes
function preload() {
  //carga de animaciones
  mario_esperando = loadGif('img/mario/esperando.gif');
  mario_pildora_1 = loadImage('img/mario/mario_3.png');
  mario_pildora_2 = loadImage('img/mario/mario_4.png');
  margen = loadImage('img/margen.png');



  //virus
  tablero_sprites = {
    'virus_amarillo': loadGif('img/amarillo/virus.gif'),
    'virus_azul': loadGif('img/azul/virus.gif'),
    'virus_rojo': loadGif('img/rojo/virus.gif'),

    'pildora_amarillo_1': loadImage('img/pildora/amarillo/1.png'),
    'pildora_amarillo_2': loadImage('img/pildora/amarillo/2.png'),
    'pildora_amarillo_3': loadImage('img/pildora/amarillo/3.png'),

    'pildora_azul_1': loadImage('img/pildora/azul/1.png'),
    'pildora_azul_2': loadImage('img/pildora/azul/2.png'),
    'pildora_azul_3': loadImage('img/pildora/azul/3.png'),

    'pildora_rojo_1': loadImage('img/pildora/rojo/1.png'),
    'pildora_rojo_2': loadImage('img/pildora/rojo/2.png'),
    'pildora_rojo_3': loadImage('img/pildora/rojo/3.png'),

  }
  //animaciones para la lupa
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


function mouseClicked() {
  switch (tablero.estado) {
    case 4:
      if(mouseX <=20*tablero.escala  && mouseX >=7.9*tablero.escala &&mouseY >=11*tablero.escala && mouseY <=13*tablero.escala ){
        let nivel = (mouseX -8*tablero.escala)/(tablero.escala*0.6);
        tablero.nivel = Math.round(nivel+1);
        //alert(nivel);
    }
      break;
  
    default:
      break;
  }
}


