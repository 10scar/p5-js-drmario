let intro;
let control_musica;
let tamaño = {
  width: 0,
  height:0,
  escala:0,
}

//varables de imagenes
let mario_esperando,mario_pildora_1,mario_pildora_2,margen, virus_azul_caminado;

//variable para la fuente
let fuente;

function responsive(tamaño){
  tamaño.width = window.screen.width;
  tamaño.height = window.screen.height;
  if (Math.min(tamaño.width, tamaño.height) >= 768) {
    tamaño.escala = (tamaño.height/38.5);
 /*    tamaño.width = tamaño.width/2;
    tamaño.height = tamaño.height-170; */
  
}else{
  tamaño.escala = (tamaño.height/40);
}
}

function setup() {

  
  responsive(tamaño);
  angleMode(DEGREES);
  let cnv =createCanvas(tamaño.escala*32, tamaño.escala*30);
  fondo = color(50,50,50,50);
  if (Math.min(tamaño.width, tamaño.height) >= 628) {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    //cnv.position(x, y);
  
}

  tablero = new Tablero(tamaño.escala);
  figura = new Ficha(0,tamaño.escala);
  textFont(fuente);
  botones_menu();

}

function draw() {
  
  clear();

  //figura.forma = figuras.o
  
  //tablero.dibujar();
  //figura.dibujar();
  background(0);
  //tablero.dibujar_marco();
  //dinamicas
  dinamicas();
  
  
  
 
}



