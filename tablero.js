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
        this.numvirus = (this.nivel - 1) * 4 + 4;
        //organización casillas: [tipo, color, relleno, roto (true)/no roto (false)]
        this.casillas = this.array2d(dimy, dimx, ['blank', 'blanco', '#000000', false]);
        this.generarVirus();
        //this.casillas[4][5] = ['prueba', '#0000ff', false];


    }

    background_draw(color1, color2) {
        let colores = [color1, color2];
        for (let i = 0; i < this.background[0]; i++) {
            for (let m = 0; m < this.background[1]; m++) {
                fill(colores[(m + i) % 2]);
                noStroke();
                rect(this.escala * i, this.escala * m, this.escala);
            }

        }
    }


    dibujar() {
        for (let i = 0; i < this.casillas.length; i++) {
            for (let x = 0; x < this.casillas[i].length; x++) {

                fill(this.casillas[i][x][2]);
                rect((this.escala *x) + this.escala*this.posicion[0], (this.escala * i) + this.escala*this.posicion[1], this.escala);
            }
        }

    }

    dibujar_marco(x,y,ancho,alto) {
        image(margen, x*this.escala,y*this.escala, ancho*this.escala,alto*this.escala);
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
                    this.verificar_lineas();
                }
            }
        }


        return true;
    }

    puntuacion_jugador(posicion_score, posicion_nivel){
        ///cuadro de score y top
        stroke(0);
        fill('#f7be39');
        rect(posicion_score[0]*this.escala,posicion_score[1]*this.escala, 9*this.escala,9*this.escala,10);
        fill('#c6d7ff');
        rect((posicion_score[0]+0.5)*this.escala,(posicion_score[1]+0.5)*this.escala, 8*this.escala,7.5*this.escala,10);
        fill(0);
        textSize(0.9*this.escala);
        textStyle(NORMAL);
        text('TOP' + '\n\n0000000',(posicion_score[0]+0.8)*this.escala,(posicion_score[1]+1.5)*this.escala, 8*this.escala,7.5*this.escala);
        text('SCORE' + '\n\n0000000',(posicion_score[0]+0.8)*this.escala,(posicion_score[1]+5)*this.escala, 8*this.escala,7.5*this.escala);

        ///cuadro nivel, speed, virus
        fill('#f7be39');
        rect(posicion_nivel[0]*this.escala,posicion_nivel[1]*this.escala, 8*this.escala,12*this.escala,10);
        fill('#c6d7ff');
        rect((posicion_nivel[0]+0.5)*this.escala,(posicion_nivel[1]+0.5)*this.escala, 7*this.escala,11*this.escala,10);
        fill(0);
        textSize(0.9*this.escala);
        textStyle(NORMAL);
        text('LEVEL' + '\n\n10',(posicion_nivel[0]+0.8)*this.escala,(posicion_nivel[1]+1.5)*this.escala, 8*this.escala,7.5*this.escala);
        text('SPEED' + '\n\nMED',(posicion_nivel[0]+0.8)*this.escala,(posicion_nivel[1]+5)*this.escala, 8*this.escala,7.5*this.escala);
        text('VIRUS' + '\n\n36',(posicion_nivel[0]+0.8)*this.escala,(posicion_nivel[1]+8.5)*this.escala, 8*this.escala,7.5*this.escala);
    }

    animacion_mario(posicion,estado){
        fill(0);
        stroke('#f7be39');
        rect(posicion[0]*this.escala,posicion[1]*this.escala, 7*this.escala,7*this.escala,20);
        if(estado == 0){
            image(mario_pildora_1, (posicion[0]+1)*this.escala,(posicion[1]+1.5)*this.escala, 5*this.escala, 5*this.escala);
        }else 
        {
            image(mario_pildora_2, (posicion[0]+1)*this.escala,(posicion[1]+1.5)*this.escala, 5*this.escala, 5*this.escala);    
        }

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
                    image(virus_sprites[i*3],virus_pos[i][0]*tablero.escala,virus_pos[i][1]*tablero.escala,3.5*tablero.escala,3.5*tablero.escala);
                    break;
                case 2:
                    image(virus_sprites[(i*3)+1]+'muriendo',virus_pos[i][0]*tablero.escala,virus_pos[i][1]*tablero.escala,4.5*tablero.escala,5*tablero.escala);
                    break;
                case 3:
                    image(virus_sprites[(i*3)+2]+'riendo',virus_pos[i][0]*tablero.escala,virus_pos[i][1]*tablero.escala,4.5*tablero.escala,5*tablero.escala);
                    break;
            
                default:
                    break;
            }
            
        }

    }

    generarVirus(){
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

        for(let i = 1; i <= this.numvirus; i++){
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

    verificar_lineas(){
        for(let i = 0; i < this.casillas.length; i++){
            let pastillasconsecutivasX = 1;
            for(let j = 0; j < this.casillas[0].length - 2; j++){
                print(this.casillas[i][j + 1][0]);
                if((this.casillas[i][j][0] != 'blank') & (this.casillas[i][j][0] == this.casillas[i][j + 1][0])){
                    pastillasconsecutivasX += 1;
                }
            }

            if(pastillasconsecutivasX >= 4){
                print(true);
            }
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