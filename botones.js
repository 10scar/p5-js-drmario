
function botones_menu(){
  //////////////////////botones del nivel de velocidad//////////////////////////////
  menu_low = new Clickable();
  menu_low.text = "LOW";
  menu_low.textSize = 1.2*tablero.escala;
  menu_low.stroke  = '#ce4d08';
  menu_low.strokeWeight = 0.3*tablero.escala; 
  menu_low.locate(8 * tablero.escala, 16.5 * tablero.escala);
  menu_low.resize(5 * tablero.escala, 3 * tablero.escala);
  menu_low.onHover = function () {
  menu_low.color = "#9a3a06";
  }
  menu_low.onOutside = function () {
    menu_low.color = "#000000";
  }

  menu_low.onPress = function () {
    menu_low.color = "#e7005a";
    menu_low.stroke  = '#ce4d08';
    menu_med.stroke  = '#000000';
    menu_hi.stroke  = '#000000';
  
  }
  //////
  menu_med = new Clickable();
  menu_med.text = "MED";
  menu_med.textSize = 1.2*tablero.escala;
  menu_med.stroke  = '#000000';
  menu_med.strokeWeight = 0.3*tablero.escala; 
  menu_med.locate(14 * tablero.escala, 16.5 * tablero.escala);
  menu_med.resize(5 * tablero.escala, 3 * tablero.escala);
  menu_med.onHover = function () {
  menu_med.color = "#9a3a06";
  }
  menu_med.onOutside = function () {
  menu_med.color = "#000000";
  }

  menu_med.onPress = function () {
    menu_med.color = "#e7005a";
    menu_med.stroke  = '#ce4d08';
    menu_low.stroke  = '#000000';
    menu_hi.stroke  = '#000000';
  
  }

  // 
  menu_hi = new Clickable(); 
  menu_hi.text = "HI";
  menu_hi.textSize = 1.2*tablero.escala;
  menu_hi.stroke  = '#000000';
  menu_hi.strokeWeight = 0.3*tablero.escala; 
  menu_hi.locate(20 * tablero.escala, 16.5 * tablero.escala);
  menu_hi.resize(5 * tablero.escala, 3 * tablero.escala);
  menu_hi.onHover = function () {
    //jugar.imageScale = 1.1;
    menu_hi.color = "#9a3a06";
  }
  menu_hi.onOutside = function () {
    //jugar.imageScale = 1;
    menu_hi.color = "#000000";
  }

  menu_hi.onPress = function () {
    menu_hi.color = "#e7005a";
    menu_hi.stroke  = '#ce4d08';
    menu_low.stroke  = '#000000';
    menu_med.stroke  = '#000000';
  
  }

////////////////////////////botones de la musica/////////////////////////////////////////
  menu_fever = new Clickable();
  menu_fever.text = "FEVER";
  menu_fever.textSize = 1.2*tablero.escala;
  menu_fever.stroke  = '#ce4d08';
  menu_fever.strokeWeight = 0.3*tablero.escala; 
  menu_fever.locate(6 * tablero.escala, 23 * tablero.escala);
  menu_fever.resize(7 * tablero.escala, 3 * tablero.escala);
  menu_fever.onHover = function () {
  menu_fever.color = "#9a3a06";
  }
  menu_fever.onOutside = function () {
    menu_fever.color = "#000000";
  }

  menu_fever.onPress = function () {
    menu_fever.color = "#e7005a";
    menu_fever.stroke  = '#ce4d08';
    menu_chill.stroke  = '#000000';
    menu_off.stroke  = '#000000';
  
  }
  //////
  menu_chill = new Clickable();
  menu_chill.text = "CHILL";
  menu_chill.textSize = 1.2*tablero.escala;
  menu_chill.stroke  = '#000000';
  menu_chill.strokeWeight = 0.3*tablero.escala; 
  menu_chill.locate(14 * tablero.escala, 23 * tablero.escala);
  menu_chill.resize(7 * tablero.escala, 3 * tablero.escala);
  menu_chill.onHover = function () {
  menu_chill.color = "#9a3a06";
  }
  menu_chill.onOutside = function () {
  menu_chill.color = "#000000";
  }

  menu_chill.onPress = function () {
    menu_chill.color = "#e7005a";
    menu_chill.stroke  = '#ce4d08';
    menu_fever.stroke  = '#000000';
    menu_off.stroke  = '#000000';
  
  }

  // 
  menu_off = new Clickable(); 
  menu_off.text = "OFF";
  menu_off.textSize = 1.2*tablero.escala;
  menu_off.stroke  = '#000000';
  menu_off.strokeWeight = 0.3*tablero.escala; 
  menu_off.locate(22 * tablero.escala, 23 * tablero.escala);
  menu_off.resize(5 * tablero.escala, 3 * tablero.escala);
  menu_off.onHover = function () {
    //jugar.imageScale = 1.1;
    menu_off.color = "#9a3a06";
  }
  menu_off.onOutside = function () {
    //jugar.imageScale = 1;
    menu_off.color = "#000000";
  }

  menu_off.onPress = function () {
    menu_off.color = "#e7005a";
    menu_off.stroke  = '#ce4d08';
    menu_fever.stroke  = '#000000';
    menu_chill.stroke  = '#000000';
  
  }

}
  
///teclas
function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      figura.rotar();
      figura.rotar();
      figura.rotar();
      break;
    case RIGHT_ARROW:
      figura.rotar();
      break;
    //solo para debug
    /*       case 87:
              figura.mover(0,-1);
              break; */
    case 83:
      figura.mover(0, 1);
      break;
    case 65:
      figura.mover(-1, 0);
      break;
    case 68:
      figura.mover(1, 0);
      break;
    case 32:
      tablero.nitro();
      break;
    case 67:
      print('happening');
      tablero.bajarpildorasrotas();
      break;
  }

}
