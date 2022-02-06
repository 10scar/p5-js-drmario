

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
