/*const colors = ['#11B6CA','#CA1178','#DA522E'];
const figuras = {
    l: [3840,8738,240,17476,4],
    j: [312,210,57,150,3],
    o: [26112,26112,26112,26112,4],
    s: [240,153,30,306,3],
    t: [184,154,58,178,3],
    z: [408,90,51,180,3],

};*/

const colores = {
  rojo: '#FF0000',
  azul: '#0000ff',
  amarillo: '#ffff00',
};

///en construccion.
class Ficha {

  constructor(rotacion = 1, escala = 100) {
    this.escala = escala;
    this.rotacion = rotacion;
    this.vida = 1;
    this.relposX = 4;
    this.relposY = 0;
    this.x = this.relposX * this.escala;
    this.y = this.relposY * this.escala;

  }

  get color1() {
    this._color1 = this._color1 == undefined ? this.random(colores) : this._color1
    return this._color1;
  }
  set color1(color) {
    this._color1 = color;
  }

  get color2() {
    this._color2 = this._color2 == undefined ? this.random(colores) : this._color2
    return this._color2;
  }
  set color2(color) {
    this._color2 = color;
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


  random(obj) {
    let key = Object.values(obj);
    let fig = key[Math.floor(Math.random() * key.length)];
    return fig;
  }

  dibujar() {
    //itera en la matriz en .forma y dependiendo del valor en cada índice dibuja un cuadrado
    //y lo llena del color correspondiente
    for (let i = 0; i < this.forma[this.rotacion].length; i++) {
      for (let j = 0; j < this.forma[this.rotacion][i].length; j++) {
        if (this.forma[this.rotacion][i][j] != 'blank') {
          fill(this.forma[this.rotacion][i][j]);
          square(j * this.escala + this.x + 1, i * this.escala + this.y, this.escala);
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

    if ((this.relposX == tablero.casillas[0].length) | (this.relposY == tablero.casillas.length)) {
      return false;
    }

    for (let i = 0; i < this.forma[nextrotation].length; i++) {
      for (let j = this.forma[nextrotation][i].length - 1; j >= 0; j--) {
        if (this.forma[nextrotation][i][j] != 'blank' && tablero.casillas[this.relposY + i - 1][this.relposX + j - 1][0] != 'blank') {
          return false;
        }
      }
    }

    for (let i = 0; i < this.forma[nextrotation].length; i++) {
      for (let j = 0; j < this.forma[nextrotation][i].length; j++) {
        if ((this.forma[nextrotation][i][j] != 'blank' && tablero.casillas[this.relposY + i - 1][this.relposX + j - 1][0] != 'blank')) {
          return false;
        }
      }
    }

    for (let i = this.forma[nextrotation].length - 1; i >= 0; i--) {
      for (let j = 0; j < this.forma[nextrotation][i].length; j++) {
        if ((this.forma[nextrotation][i][j] != 'blank' && tablero.casillas[this.relposY + i - 1][this.relposX + j - 1][0] != 'blank')) {
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
            if((this.relposX - 1 == 0)){
              return false;
            } else if ((this.forma[this.rotacion][i][j] != 'blank' && tablero.casillas[this.relposY + i - 1][this.relposX + x - 1][0] != 'blank')) {
              return false;
            }
          }
        }
      } else if (x == 1){
        for (let i = 0; i < this.forma[this.rotacion].length; i++) {
          for (let j = 0; j < this.forma[this.rotacion][i].length; j++) {
            if(this.relposX + j == tablero.casillas[0].length){
              return false;
            }
            if ((this.forma[this.rotacion][i][j] != 'blank' && tablero.casillas[this.relposY + i - 1][this.relposX + j][0] != 'blank') | (this.relposX + j >= tablero.casillas[0].length)) {
              return false;
            }
          }
        }
      }
    } else {
      for (let i = this.forma[this.rotacion].length - 1; i >= 0; i--) {
        for (let j = 0; j < this.forma[this.rotacion][i].length; j++) {
          if(this.relposY + i == tablero.casillas.length){
            return false;
          }
          if (this.forma[this.rotacion][i][j] != 'blank' && tablero.casillas[this.relposY + i][this.relposX + j - 1][0] != 'blank') {
            return false;
          }
        }
      }
    }

    return true;
  }

  mover(x, y = 0) {
    /*if(tablero.estado !=1){
        return false;
    }*/
    if(this.tryMove(x, y)){
      this.x = this.x + (this.escala * x);
      this.y = this.y + (this.escala * y);
  
      this.relposX += x;
      this.relposY += y;
    }
    return true;
  }

  /*    reiniciar(){
      if(this.vida == 0){
          this.color1 = this.random(colors);
          this.forma = this.random(figuras);
          this.vida= 1;
          this.x = 4*this.escala;
          this.y=0*this.escala; 
      }*/

  rotar() {
    /*if(tablero.estado !=1){
        return false;
    }*/
    if (this.tryrotate()) {
      this.rotacion += 1;
      if (this.rotacion == this.forma.length) {
        this.rotacion = 0;
      }
    }
    return this.rotacion;
  }

}

