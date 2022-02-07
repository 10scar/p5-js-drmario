const colores = [
  ['rojo', '#FF0000'],
  ['azul', '#0000ff'],
  ['amarillo', '#ffff00']
]
fisicas ={
  't' : 0, //Se inicia el tiempo a t = 0
  'g' : 9.8, //Aceleración de gravedad
  'rot':0,
  'animacion':false
}
///en construccion.
class Ficha {

  constructor(rotacion = 0, escala = 100) {
    this.escala = escala;
    this.rotacion = rotacion;
    this.vida = 0;
    this.relposX = 16;
    this.relposY = 10;
    this.x = this.relposX * this.escala;
    this.y = this.relposY * this.escala;
  }



  get color1() {
    this._color1 = this._color1 == undefined ? random(colores) : this._color1
    return this._color1;
  }
  set color1(color) {
    this._color1 = color;
  }

  get color2() {
    this._color2 = this._color2 == undefined ? random(colores) : this._color2
    return this._color2;
  }
  set color2(color) {
    this._color2 = color;
  }

  get nextcolor1() {
    this._nextcolor1 = this._nextcolor1 == undefined ? random(colores) : this._nextcolor1
    return this._nextcolor1;
  }
  set nextcolor1(color) {
    this._nextcolor1 = color;
  }

  get nextcolor2() {
    this._nextcolor2 = this._nextcolor2 == undefined ? random(colores) : this._nextcolor2
    return this._nextcolor2;
  }
  set nextcolor2(color) {
    this._nextcolor2 = color;
  }

  forma = [
    [[this.color1, this.color2]],
    [[this.color1], [this.color2]],
    [[this.color2, this.color1]],
    [[this.color2], [this.color1]]
  ];

  /*get forma(){
      this.formaa = this.formaa == undefined? this.random(figuras): this.formaa;
      return this.formaa;
      
  }
  set forma(forma){ return this.formaa = forma}*/

  get rotacion() {
    this._rotacion = this._rotacion == undefined ? 0 : this._rotacion;
    return this._rotacion
  }
  set rotacion(rotacion) {
    this._rotacion = rotacion;
    return;
  }

  dibujar() {
    //itera en la matriz en .forma y dependiendo del valor en cada índice dibuja un cuadrado
    //y lo llena del color correspondiente
    let count = 0;
    for (let i = 0; i < this.forma[this.rotacion].length; i++) {
      for (let j = 0; j < this.forma[this.rotacion][i].length; j++) {
        if (this.forma[this.rotacion][i][j] != 'blank') {
          fill(this.forma[this.rotacion][i][j][1]);
          push();
          
          count++;
          if(this.rotacion == 1|| this.rotacion == 3){
            translate((j+1) * this.escala + this.x , i * this.escala + this.y);
            rotate(90);
          }else{
            translate(j * this.escala + this.x, i * this.escala + this.y);
          };
          image(tablero_sprites['pildora_'+this.forma[this.rotacion][i][j][0]+'_'+count],0,0, this.escala,this.escala);
          //square(j * this.escala + this.x, i * this.escala + this.y, this.escala);
          pop();
        }
      }
    }
  }

  tryrotate() {
    //chequea si la siguiente rotación de la figura genera colisiones en cualquier dirección
    let nextrotation = this.rotacion + 1;
    if (nextrotation == this.forma.length) {
      nextrotation = 0;
    }

    if ((this.relposX - tablero.posicion[0] + 1 == tablero.casillas[0].length) | (this.relposY - tablero.posicion[1] + 1 == tablero.casillas.length)) {
      return false;
    }

    for (let i = 0; i < this.forma[nextrotation].length; i++) {
      for (let j = this.forma[nextrotation][i].length - 1; j >= 0; j--) {
        if (this.forma[nextrotation][i][j] != 'blank' && (tablero.casillas[this.relposY + i - tablero.posicion[1]][this.relposX + j - tablero.posicion[0]][0] != 'blank' & tablero.casillas[this.relposY + i - tablero.posicion[1]][this.relposX + j - tablero.posicion[0]][0] != 'blank1')) {
          return false;
        }
      }
    }

    for (let i = 0; i < this.forma[nextrotation].length; i++) {
      for (let j = 0; j < this.forma[nextrotation][i].length; j++) {
        if (this.forma[nextrotation][i][j] != 'blank' && (tablero.casillas[this.relposY + i - tablero.posicion[1]][this.relposX + j - tablero.posicion[0]][0] != 'blank' & tablero.casillas[this.relposY + i - tablero.posicion[1]][this.relposX + j - tablero.posicion[0]][0] != 'blank1')) {
          return false;
        }
      }
    }

    for (let i = this.forma[nextrotation].length - 1; i >= 0; i--) {
      for (let j = 0; j < this.forma[nextrotation][i].length; j++) {
        if (this.forma[nextrotation][i][j] != 'blank' && (tablero.casillas[this.relposY + i - tablero.posicion[1]][this.relposX + j - tablero.posicion[0]][0] != 'blank' & tablero.casillas[this.relposY + i - tablero.posicion[1]][this.relposX + j - tablero.posicion[0]][0] != 'blank1')) {
          return false;
        }
      }
    }

    return true;
  }

  tryMove(x, y) {
    if (y == 0) {

      if (x == -1) {
        //chequea si hay elementos en el tablero que generen colisión a la izquierda
        for (let i = 0; i < this.forma[this.rotacion].length; i++) {
          for (let j = 0; j < this.forma[this.rotacion][i].length; j++) {
            if ((this.relposX - tablero.posicion[0] == 0)) {
              return false;
            } else if (this.forma[this.rotacion][i][j] != 'blank' && (tablero.casillas[this.relposY + i - tablero.posicion[1]][this.relposX + x - tablero.posicion[0]][0] != 'blank' & tablero.casillas[this.relposY + i - tablero.posicion[1]][this.relposX + x - tablero.posicion[0]][0] != 'blank1')) {
              return false;
            }
          }
        }
      } else if (x == 1) {
        for (let i = 0; i < this.forma[this.rotacion].length; i++) {
          for (let j = 0; j < this.forma[this.rotacion][i].length; j++) {
            if (this.relposX - tablero.posicion[0] + j + 1 == tablero.casillas[0].length) {
              return false;
            }
            if (this.forma[this.rotacion][i][j] != 'blank' && (tablero.casillas[(this.relposY - tablero.posicion[1]) + i][this.relposX - tablero.posicion[0] + j + 1][0] != 'blank' & tablero.casillas[(this.relposY - tablero.posicion[1]) + i][this.relposX - tablero.posicion[0] + j + 1][0] != 'blank1')) {
              return false;
            }
          }
        }
      }
    } else {
      for (let i = this.forma[this.rotacion].length - 1; i >= 0; i--) {
        for (let j = 0; j < this.forma[this.rotacion][i].length; j++) {
          if ((this.relposY - tablero.posicion[1]) + i + 1 == tablero.casillas.length) {
            return false;
          }
          if (this.forma[this.rotacion][i][j] != 'blank' && (tablero.casillas[this.relposY - tablero.posicion[1] + i + 1][this.relposX + j - tablero.posicion[0]][0] != 'blank' & tablero.casillas[this.relposY - tablero.posicion[1] + i + 1][this.relposX + j - tablero.posicion[0]][0] != 'blank1')) {
            return false;
          }
        }
      }
    }

    return true;
  }

  mover(x, y = 0) {
    if (tablero.estado != 1) {
      return false;
    }
    if (this.tryMove(x, y)) {
      this.x = this.x + (this.escala * x);
      this.y = this.y + (this.escala * y);

      this.relposX += x;
      this.relposY += y;
    }
    return this.tryMove(x, y);
  }

  actualizarnextfigura(){
    this.color1 = this.nextcolor1;
    this.color2 = this.nextcolor2;

    this.nextcolor1 = random(colores);
    this.nextcolor2 = random(colores);
  }

  reiniciar() {
    if (this.vida == 0) {
      this.vida = 1;
      this.relposX = 16;
      this.relposY = 10;
      this.rotacion = 0;

      this.x = this.relposX * this.escala;
      this.y = this.relposY * this.escala;

      //this.color1 = random(colores);
      //this.color2 = random(colores);
      this.color1 = this.nextcolor1;
      this.color2 = this.nextcolor2;
  
      this.nextcolor1 = random(colores);
      this.nextcolor2 = random(colores);
      this.rotacion = 0;

      this.forma = [
        [[this.color1, this.color2]],
        [[this.color1], [this.color2]],
        [[this.color2, this.color1]],
        [[this.color2], [this.color1]]
      ];
    }
  }

  rotar() {
    if (tablero.estado != 1) {
      return false;
    }
    if (this.tryrotate()) {
      this.rotacion += 1;
      if (this.rotacion == this.forma.length) {
        this.rotacion = 0;
      }
    }
    return this.rotacion;
  }
  lanzar(){
    let x,y;
    let op_rot = true;
    //itera en la matriz en .forma y dependiendo del valor en cada índice dibuja un cuadrado
    x =  (this.escala*25) +60 * cos(105) * fisicas['t']; 
    y =  (this.escala*21) +60  * sin(105) * fisicas['t'] - 0.5 * fisicas['g'] * fisicas['t'] * fisicas['t']; 
    fisicas['t'] += 0.2;
    let count = 0;
    for (let i = 0; i < this.forma[this.rotacion].length; i++) {
      for (let j = 0; j < this.forma[this.rotacion][i].length; j++) {
        if (this.forma[this.rotacion][i][j] != 'blank') {
          fill(this.forma[this.rotacion][i][j][1]);
          push();
          
          count++;
          if(this.rotacion == 1|| this.rotacion == 3){
            translate((j+1) * this.escala + x,i * this.escala+ (this.escala*30)-y);
            rotate(90);
          }else{
            translate(j * this.escala + x,i * this.escala+ (this.escala*30)-y);
          };
          if( this.escala+ (this.escala*30)-y > i * this.escala + this.y){
            fisicas['t'] = 0;
            this.rotacion = 0;
            tablero.estado = 1;
            op_rot= false;
          }
          image(tablero_sprites['pildora_'+this.forma[this.rotacion][i][j][0]+'_'+count],0,0, this.escala,this.escala);
          pop();
          
        }
      }
    }
    if(op_rot){
      this.rotacion=(second()%2);
    }
    
    
  }
  
  siguiente(){
    let color =this.nextcolor1;
    image(tablero_sprites['pildora_'+color[0]+'_1'],25*this.escala,9*this.escala, this.escala,this.escala);
    image(tablero_sprites['pildora_'+this.nextcolor2[0]+'_2'],26*this.escala,9*this.escala, this.escala,this.escala);
  }
}

