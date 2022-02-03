class Tablero {
    constructor(escala = 100, dimy = 16, dimx = 8,posx = 13, posy =10) {
        this.escala = escala;
        this.frames = 0;
        this.background = [32, 30];
        this.posicion = [posx,posy];
        this.virus = [1,1,1];
        this.estado = 1;
        this.volumen = 0.3;
        this.nivel = 1;
        this.lineas = 0;
        //organización casillas: [tipo, relleno, roto (true)/no roto (false)]
        this.casillas = this.array2d(dimy, dimx, ['blank', 'blanco', '#FFFFFF', false]);
        this.generarVirus();
        //this.casillas[4][5] = ['prueba', '#0000ff', false];


    }

    background_draw(color1, color2) {
        let colores = [color1, color2]

        for (let i = 0; i < this.background[0]; i++) {
            for (let m = 0; m < this.background[1]; m++) {
                fill(colores[(m + i) % 2]);
                noStroke();
                rect(this.escala * i, this.escala * m, this.escala);
            }

        }
    }


    dibujar() {
        //console.log(this.casillas);
        for (let i = 0; i < this.casillas.length; i++) {
            for (let x = 0; x < this.casillas[i].length; x++) {

                fill(this.casillas[i][x][2])
                rect((this.escala *x) + this.escala*this.posicion[0], (this.escala * i) + this.escala*this.posicion[1], this.escala);
            }
        }

    }

    dibujar_marco() {
        let ancho = this.casillas[0].length;
        let alto = this.casillas.length;

        for (let i = 0; i < ancho + 2; i++) {

            image(img, i * this.escala, 0, this.escala, this.escala);
        }
        for (let i = 0; i < ancho + 2; i++) {
            image(img, i * this.escala, (alto + 1) * this.escala, this.escala, this.escala);
        }

        for (let i = 0; i < alto + 2; i++) {
            image(img, 0, i * this.escala, this.escala, this.escala);
        }

        for (let i = 0; i < alto + 2; i++) {
            image(img, 0, i * this.escala, this.escala, this.escala);
        }

        for (let i = 0; i < alto + 2; i++) {
            image(img, (ancho + 1) * this.escala, i * this.escala, this.escala, this.escala);
        }

    }

    array2d(y, x, z) {
        let arr = new Array(y);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(x).fill(z);
        }
        return arr
    }

    actualizaroterminar(){
        if (figura.relposY - this.posicion[1] <= 0) {
            console.log('ojo 3');
            return false
        }

        for (let i = 0; i < figura.forma[figura.rotacion].length; i++) {
            for (let j = 0; j < figura.forma[figura.rotacion][i].length; j++) {
                if(figura.forma[figura.rotacion][i][j] != 'blank'){
                    this.casillas[figura.relposY + i - this.posicion[1]].splice(figura.relposX + j - this.posicion[0], 1, ['pastilla', figura.forma[figura.rotacion][i][j][0], figura.forma[figura.rotacion][i][j][1]]);
                }
            }
        }

        return true;
    }

    lupa_virus(posicion, virus_pos){
     
        //dibujando el lente de la lupa
        fill('#737573');
        strokeWeight(3);
        stroke(0)
        circle(posicion[0]*this.escala,posicion[1]*this.escala,10*this.escala);
        fill('#5a96ff');
        circle(posicion[0]*this.escala,posicion[1]*this.escala,9.2*this.escala);

       //dibujar virus
       //translate(Math.sin(second())*tablero.escala,Math.cos(second())*tablero.escala);
        for(let i =0; i< this.virus.length;i++){
            
            //rotate(PI / 180*120);
            //imageMode(CENTER);
            switch (this.virus[i]) {
                case 1:
                    //image(virus_sprites[i*3],1*tablero.escala,0*tablero.escala,3.5*tablero.escala,3.5*tablero.escala);
                    image(virus_sprites[i*3],virus_pos[i][0]*tablero.escala,virus_pos[i][1]*tablero.escala,3.5*tablero.escala,3.5*tablero.escala);
                    break;
                case 2:
                    image(nombres_virus[(i*3)+1]+'muriendo',virus_pos[i][0]*tablero.escala,virus_pos[i][1]*tablero.escala,4.5*tablero.escala,5*tablero.escala);
                    break;
                case 3:
                    image(nombres_virus[(i*3)+2]+'riendo',virus_pos[i][0]*tablero.escala,virus_pos[i][1]*tablero.escala,4.5*tablero.escala,5*tablero.escala);
                    break;
            
                default:
                    break;
            }
            
        }

    }

    generarVirus(){
        let numvirus = (this.nivel - 1) * 4 + 4;
        let maxFila;

        switch(this.nivel){
            default:
                maxFila = 6;
                break;
            case 15:
            case 16:
                maxFila = 5;
                break;
            case 17:
            case 18:
                maxFila = 4;
                break;
            case 19:
            case 20:
                maxFila = 3;
                break;
        }

        for(let i = 1; i <= numvirus; i++){
            let vx = Math.floor(random(0, this.casillas[0].length));
            let vy = Math.floor(random(maxFila, this.casillas.length));
            
            if(this.casillas[vy][vx][0] != 'blank'){
                vx = Math.floor(random(0, this.casillas[0].length));
                vy = Math.floor(random(maxFila, this.casillas.length)); 
            }

            let color = random(colores);
            this.casillas[vy].splice(vx, 1, ['Virus', color[0], color[1]]);

            print('new virus en: ' + vx + ', ' + vy);
            print(this.casillas[vy][vx][0]);
        }
    }
/*
    verificar_lineas() {
        let flag;
        for (let i = 0; i < this.casillas.length; i++) {
            flag = true;
            for (let m = 0; m < this.casillas.length; m++) {
                if (this.casillas[i][m] == '#FFFFFF') {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                this.casillas.splice(i, 1);
                this.casillas.unshift(new Array(this.casillas[0].length).fill('#FFFFFF'));
                this.lineas++;
                jugador.puntuacion = (2 * this.nivel) + jugador.puntuacion;
                if (this.lineas % 5 == 0) {
                    this.nivel++;
                }

            }
        }
    }


    verificar_colisiones(x = 0) {
        let fig = figura.forma[figura.rotacion];
        let cua = figura.forma[4] //tamaño de la cuadricula del bitboard
        let bin = fig.toString(2); //numero del bitboard a base 2
        bin = '0'.repeat((cua * cua) - bin.length) + bin;
        let escala = figura.escala;
        let x1 = Math.round(figura.x / escala);

        let y1 = Math.round(figura.y / escala);
        let casillas = '';

        //
        for (let i = 0; i < cua * cua; i++) {

            let mask = '0'.repeat(i) + '1' + '0'.repeat((cua * cua - 1) - i);


            if ((parseInt(mask, 2) & fig) != 0) {

                switch (x) {
                    case 0:
                        if (x1 <= 0 | y1 <= 0 | x1 > this.casillas[0].length | y1 > this.casillas.length) {
                            console.log('ojo');

                            return false;
                        }
                        else {
                            casillas = this.casillas[y1 - 1][x1 - 1];
                            if (casillas != '#FFFFFF') {
                                console.log('ojo 2');
                                console.log(x1);
                                console.log(y1);

                                return false;
                            }
                        }
                        break;
                    case 1:
                        if (x1 <= 0 | y1 <= 0) {
                            console.log('ojo 3');
                            return false
                        }
                        tablero.casillas[y1 - 1][x1 - 1] = figura.color;
                        break;
                    default:
                        break;
                }






            }

            x1 = x1 + 1;
            if (((i + 1) % cua) == 0) {
                y1 = y1 + 1;
                x1 = Math.round(figura.x / escala);
            }

        } return true;
    }

    nitro() {
        if (tablero.estado != 1) {
            return false;
        }
        let flag = true;
        while (flag) {
            flag = figura.mover(0, +1);
        }
        tablero.verificar_colisiones(1);
        figura.vida = 0;
        return true;
    }

    informacion() {
        //informacion del jugador
        textSize(2 * this.escala);
        text(jugador.nombre, 13 * this.escala, 2 * this.escala);
        fill(255, 255, 255);
        textSize(1 * this.escala);
        text("Nivel :" + this.nivel, 13 * this.escala, 4 * this.escala);
        text("Puntuación :" + jugador.puntuacion, 13 * this.escala, 5 * this.escala);
        text("Lineas :" + this.lineas, 13 * this.escala, 7 * this.escala);
    }

    restablecer() {
        this.casillas = this.array2d(this.casillas.length, this.casillas[0].length, '#FFFFFF');
        this.nivel = 1;
        this.puntuacion = 0;
        this.lineas = 0;
    }
*/

}