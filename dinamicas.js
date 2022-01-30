function dinamicas(){
    config.draw();
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

function game_over(){

  //verifica musica
  intro.setVolume(tablero.volumen);
  if(!intro.isPlaying()){
    intro.play();
    
  }

  tablero.informacion();
  fill(0,200,0);
  textSize(1.5*tablero.escala);
  jugar.locate(2*tablero.escala, 1*tablero.escala);
  jugar.draw();
  text("GAME OVER",1.5*tablero.escala,12*tablero.escala);
}

function espera(){
  muscia_juego.setVolume(tablero.volumen);
  intro.setVolume(tablero.volumen);
  boton_pausa.draw();
  //informacion del jugador
  tablero.informacion();
  text("PAUSA",15*tablero.escala,9*tablero.escala);
}
function juego(){
      //verifica musica
      muscia_juego.setVolume(tablero.volumen);
      if(!muscia_juego.isPlaying()){
        muscia_juego.play();
        
      }
   tablero.informacion();
    boton_pausa.draw();
    if(tablero.nivel>=10){
      resta = 59;
    }else{
      resta = tablero.nivel*6;
    }
    if(tablero.frames == 60-resta){
        tablero.frames = 0;
     
        //verificar colisiones al mover hacia abajo
        if(!figura.mover(0,+1))
        {
            //actualiza el tablero segun la ficha o verifica el game over
            if(!tablero.verificar_colisiones(1))
            {

                tablero.estado = 3;
                muscia_juego.stop();
            }else{
                //el objeto colisiono y se regenera
                figura.vida = 0;
            };
            
            //verifica la vida de la ficha
            figura.reiniciar();
            //verifica si se hace una linea despues de cada colision final.
            tablero.verificar_lineas();
        }
        
    }
    tablero.frames++;
}

function inicio(){
    //background(250);
    textFont(fuente);

    tablero.background('#045404','#04ac04 ');
    //dibujar pildora
    fill('#0474ec');
    rect(6*tablero.escala, 5*tablero.escala, 10*tablero.escala,10*tablero.escala, 0*tablero.escala);
    circle(7*tablero.escala, 10*tablero.escala,10*tablero.escala);
    fill('#e4045c');
    rect(16*tablero.escala, 5*tablero.escala, 10*tablero.escala,10*tablero.escala, 0*tablero.escala);
    circle(25*tablero.escala, 10*tablero.escala,10*tablero.escala);
    
    
    fill(0);
    textSize(2.5*tablero.escala);
    text('Dr. MARIO',4.8*tablero.escala,9.2*tablero.escala,30*tablero.escala,5*tablero.escala);
    fill(255);
    textSize(2.5*tablero.escala);
    text('Dr. MARIO',5*tablero.escala,9*tablero.escala,25*tablero.escala,5*tablero.escala); 

    fill(0);
    rect(4*tablero.escala, 20*tablero.escala, 25*tablero.escala,7*tablero.escala, 5*tablero.escala);

    image(mario_esperando,4*tablero.escala,21*tablero.escala,4.5*tablero.escala,5*tablero.escala);
    image(virus_azul_caminado,25*tablero.escala,22*tablero.escala,3.5*tablero.escala,3.5*tablero.escala);
    //texto
    fill(255);
    textSize(1*tablero.escala);
    text('1 PLAYER GAME',10*tablero.escala,21*tablero.escala,20*tablero.escala,2*tablero.escala); 
    //verifica musica
/*     intro.setVolume(tablero.volumen);
    if(!intro.isPlaying()){
     intro.play();
      
    } */

    //dibuja botones e iconos
    //jugar.draw();
    //dibuja tutorial
    /* image(tutorial_asd,14*tablero.escala,5*tablero.escala,7*tablero.escala,4*tablero.escala);
    image(tutorial_espacio,13*tablero.escala,10*tablero.escala,9*tablero.escala,5*tablero.escala); */
    //informacion del jugador
    /* textSize(2*tablero.escala);*/
   
    
}




  function windowResized() {
    responsive(tamaño);
    resizeCanvas(windowWidth, windowHeight);
  }
  
  //carga musica e imagenes
  function preload(){
    //carga de animaciones
    mario_esperando = loadImage('img/mario/esperando.gif');
    virus_azul_caminado = loadImage('img/azul/caminando.gif');
    //carga de fuente texto;
    fuente = loadFont('text/PressStart2P.ttf')
 
    /*  
    muscia_juego = loadSound('sound/juego.m4a'); */
   
  }
  
  function touchStarted() {
    getAudioContext().resume();
  }


  function tema(tema){
    img = loadImage('img/texture'+tema+'.jpg');
    switch (tema) {
      case 1:
        fondo = color(250,250,50,50);
        break;
  
      case 2:
        fondo = color(50,50,50,50);
        break;
  
  
      case 3:
        fondo = color(50,50,250,50);
        break;
      default:
        break;
    }
  }

  
function range(x){
  x = parseFloat(x);
  console.log(x);
  tablero.volumen = x;
}





