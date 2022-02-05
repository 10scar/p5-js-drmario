class Tablero {
    constructor(escala = 100, dimy = 16, dimx = 8, posx = 13, posy = 10) {
        this.escala = escala;
        this.frames = 0;
        this.background = [32, 30];
        this.posicion = [posx, posy];
        this.virus = [1, 1, 1];
        this.estado = 1;
        this.volumen = 0.3;
        this.nivel = 1;
        this.lineas = 0;
        this.numvirusini = (this.nivel - 1) * 4 + 4;
        this.numvirus = this.numvirusini;
        //organización casillas: [tipo, color, relleno, aqui irán las condiciones de estar roto, probablemente un array o algo]
        this.casillas = this.array2d(dimy, dimx, ['blank', 'blanco', '#000000', false]);
        this.generarVirus();


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
                rect((this.escala * x) + this.escala * this.posicion[0], (this.escala * i) + this.escala * this.posicion[1], this.escala);
            }
        }

    }

    dibujar_marco(x, y, ancho, alto) {
        image(margen, x * this.escala, y * this.escala, ancho * this.escala, alto * this.escala);
    }

    array2d(y, x, z) {
        let arr = new Array(y);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(x).fill(z);
        }
        return arr
    }

    actualizaroterminar() {
        if (figura.relposY - this.posicion[1] <= 0) {
            console.log('Perdida');
            return false
        }

        for (let i = 0; i < figura.forma[figura.rotacion].length; i++) {
            for (let j = 0; j < figura.forma[figura.rotacion][i].length; j++) {
                if (figura.forma[figura.rotacion][i][j] != 'blank') {
                    this.casillas[figura.relposY + i - this.posicion[1]].splice(figura.relposX + j - this.posicion[0], 1, ['pastilla', figura.forma[figura.rotacion][i][j][0], figura.forma[figura.rotacion][i][j][1]]);
                }
            }
        }


        return true;
    }

    puntuacion_jugador(posicion_score, posicion_nivel) {
        ///cuadro de score y top
        stroke(0);
        fill('#f7be39');
        rect(posicion_score[0] * this.escala, posicion_score[1] * this.escala, 9 * this.escala, 9 * this.escala, 10);
        fill('#c6d7ff');
        rect((posicion_score[0] + 0.5) * this.escala, (posicion_score[1] + 0.5) * this.escala, 8 * this.escala, 7.5 * this.escala, 10);
        fill(0);
        textSize(0.9 * this.escala);
        textStyle(NORMAL);
        text('TOP' + '\n\n0000000', (posicion_score[0] + 0.8) * this.escala, (posicion_score[1] + 1.5) * this.escala, 8 * this.escala, 7.5 * this.escala);
        text('SCORE' + '\n\n0000000', (posicion_score[0] + 0.8) * this.escala, (posicion_score[1] + 5) * this.escala, 8 * this.escala, 7.5 * this.escala);

        ///cuadro nivel, speed, virus
        fill('#f7be39');
        rect(posicion_nivel[0] * this.escala, posicion_nivel[1] * this.escala, 8 * this.escala, 12 * this.escala, 10);
        fill('#c6d7ff');
        rect((posicion_nivel[0] + 0.5) * this.escala, (posicion_nivel[1] + 0.5) * this.escala, 7 * this.escala, 11 * this.escala, 10);
        fill(0);
        textSize(0.9 * this.escala);
        textStyle(NORMAL);
        text('LEVEL' + '\n\n10', (posicion_nivel[0] + 0.8) * this.escala, (posicion_nivel[1] + 1.5) * this.escala, 8 * this.escala, 7.5 * this.escala);
        text('SPEED' + '\n\nMED', (posicion_nivel[0] + 0.8) * this.escala, (posicion_nivel[1] + 5) * this.escala, 8 * this.escala, 7.5 * this.escala);
        text('VIRUS' + '\n\n36', (posicion_nivel[0] + 0.8) * this.escala, (posicion_nivel[1] + 8.5) * this.escala, 8 * this.escala, 7.5 * this.escala);
    }

    animacion_mario(posicion, estado) {
        fill(0);
        stroke('#f7be39');
        rect(posicion[0] * this.escala, posicion[1] * this.escala, 7 * this.escala, 7 * this.escala, 20);
        if (estado == 0) {
            image(mario_pildora_1, (posicion[0] + 1) * this.escala, (posicion[1] + 1.5) * this.escala, 5 * this.escala, 5 * this.escala);
        } else {
            image(mario_pildora_2, (posicion[0] + 1) * this.escala, (posicion[1] + 1.5) * this.escala, 5 * this.escala, 5 * this.escala);
        }

    }
    lupa_virus(posicion, virus_pos) {

        //dibujando el lente de la lupa
        fill('#737573');
        strokeWeight(3);
        stroke(0)
        circle(posicion[0] * this.escala, posicion[1] * this.escala, 10 * this.escala);
        fill('#5a96ff');
        circle(posicion[0] * this.escala, posicion[1] * this.escala, 9.2 * this.escala);

        //dibujar virus
        //translate(Math.sin(second())*tablero.escala,Math.cos(second())*tablero.escala);
        for (let i = 0; i < this.virus.length; i++) {

            //rotate(PI / 180*120);
            //imageMode(CENTER);
            switch (this.virus[i]) {
                case 1:
                    image(virus_sprites[i * 3], virus_pos[i][0] * tablero.escala, virus_pos[i][1] * tablero.escala, 3.5 * tablero.escala, 3.5 * tablero.escala);
                    break;
                case 2:
                    image(virus_sprites[(i * 3) + 1] + 'muriendo', virus_pos[i][0] * tablero.escala, virus_pos[i][1] * tablero.escala, 4.5 * tablero.escala, 5 * tablero.escala);
                    break;
                case 3:
                    image(virus_sprites[(i * 3) + 2] + 'riendo', virus_pos[i][0] * tablero.escala, virus_pos[i][1] * tablero.escala, 4.5 * tablero.escala, 5 * tablero.escala);
                    break;

                default:
                    break;
            }

        }

    }

    generarVirus() {
        let maxFila;

        switch (this.nivel) {
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

        for (let i = 1; i <= this.numvirusini; i++) {
            let vx = Math.floor(random(0, this.casillas[0].length));
            let vy = Math.floor(random(maxFila, this.casillas.length));

            if (this.casillas[vy][vx][0] != 'blank') {
                vx = Math.floor(random(0, this.casillas[0].length));
                vy = Math.floor(random(maxFila, this.casillas.length));
            }

            let color = random(colores);
            this.casillas[vy].splice(vx, 1, ['Virus', color[0], color[1]]);

        }
    }

    verificar_lineas() {
        for (let i = 0; i < this.casillas.length; i++) {
            let pastillasconsecutivasX = 1;
            let deletioncoordinateX;
            for (let j = 0; j < this.casillas[0].length - 1; j++) {
                if ((this.casillas[i][j][0] != 'blank') & (this.casillas[i][j][1] == this.casillas[i][j + 1][1])) {
                    pastillasconsecutivasX += 1;
                    if (pastillasconsecutivasX == 2) {
                        deletioncoordinateX = j;
                    }
                }
            }

            if (pastillasconsecutivasX >= 4) {
                //print('deletion coordinateX: ' + deletioncoordinateX + ' deletion coordinate y: ' + i);
                print('pastillasC en X: ' + pastillasconsecutivasX);
                for (let z = 0; z < pastillasconsecutivasX; z++) {
                    if(this.casillas[i][j][0] == 'virus'){this.numvirus -= 1;}
                    this.casillas[i].splice(deletioncoordinateX + z, 1, ['deleted', 'none', '#ffffff']);
                }
            }
        }

        for (let j = 0; j < this.casillas[0].length; j++) {
            let pastillasconsecutivasY = 1;
            let deletioncoordinateY;
            for (let i = 0; i < this.casillas.length - 1; i++) {
                if ((this.casillas[i][j][0] != 'blank') & (this.casillas[i][j][1] == this.casillas[i + 1][j][1])) {
                    pastillasconsecutivasY += 1;
                    if (pastillasconsecutivasY == 2) {
                        deletioncoordinateY = i;
                    }
                }
            }

            if(pastillasconsecutivasY >= 4){
                //print(true);
                for(let z = 0; z < pastillasconsecutivasY; z++){
                    this.casillas[deletioncoordinateY + z].splice(j, 1, ['deleted', 'none', '#ffffff']);
                }
            }
        }
    }

    eliminarpildoras(){
        for (let i = 0; i < this.casillas.length; i++) {
            for (let j = 0; j < this.casillas[0].length; j++) {
                if(this.casillas[i][j][0] == 'deleted'){
                    this.casillas[i].splice(j, 1, ['blank', 'blanco', '#000000', false]);
                }
            }
        }
    }

    informacion() {
        //informacion del jugador
        //textSize(2 * this.escala);
        //text(jugador.nombre, 13 * this.escala, 2 * this.escala);
        fill(255, 255, 255);
        textSize(1 * this.escala);
        text("Nivel :" + this.nivel, 13 * this.escala, 4 * this.escala);
        text("Puntuación :" /*+ jugador.puntuacion*/, 13 * this.escala, 5 * this.escala);
        text("Lineas :" + this.lineas, 13 * this.escala, 7 * this.escala);
    }

    restablecer() {
        this.nivel = 1;
        this.puntuacion = 0;
        this.lineas = 0;

        this.casillas = this.array2d(this.casillas.length, this.casillas[0].length, ['blank', 'blanco', '#000000', false]);
        this.generarVirus();
    }

}