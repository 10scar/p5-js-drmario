let intro;
let control_musica;
let tamaño = {
  width: 0,
  height:0,
  escala:0,
}
//varables de imagenes
let mario_esperando, virus_azul_caminado;
//variable par ala fuente
let fuente;

function responsive(tamaño){
  tamaño.width = window.screen.width;
  tamaño.height = window.screen.height;
  if (Math.min(tamaño.width, tamaño.height) >= 768) {
    tamaño.escala = (tamaño.height/38.5);
    tamaño.width = tamaño.width/2;
    tamaño.height = tamaño.height-170;
  
}else{
  tamaño.escala = (tamaño.height/40);
}
}

function setup() {

  
  responsive(tamaño);
  
  let cnv =createCanvas(tamaño.width, tamaño.height);
  fondo = color(50,50,50,50);
  if (Math.min(tamaño.width, tamaño.height) >= 628) {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
  
}

  tablero = new Tablero(tamaño.escala);
  figura = new Ficha(0,tamaño.escala);

  botones();

}

function draw() {
  clear();

  //figura.forma = figuras.o
  
  tablero.dibujar();
  figura.dibujar();
  //background(fondo);
  //tablero.dibujar_marco();
  //dinamicas
  //dinamicas();
  
  
  
 
}



