function menu(){
    textFont(fuente);
    tablero.background_draw('#ff9a39', '#e7005a');
    fill(0);
    stroke('#bf732b');
    strokeWeight(0.3*tablero.escala);
    rect(3*tablero.escala, 6* tablero.escala, 26*tablero.escala,21*tablero.escala,15);

    fill('#ffffff');
    textSize(1.2*tablero.escala);
    text('VIRUS LEVEL', 5*tablero.escala, 8* tablero.escala,15*tablero.escala, 2*tablero.escala);
        sliders_custom(8,12,tablero.nivel,20);
        fill('#000000');
        stroke('#84d310');
        strokeWeight(0.3*tablero.escala);
        rect(23*tablero.escala, 10.5* tablero.escala,3* tablero.escala,3* tablero.escala,10);

        textSize(1*tablero.escala);
        fill('#ffffff');
        noStroke();
        text(tablero.nivel, 23.7*tablero.escala, 11.5* tablero.escala,2*tablero.escala, 2*tablero.escala);

    stroke('#bf732b');
    textSize(1.2*tablero.escala);
    text('SPEED', 5*tablero.escala, 14.5* tablero.escala,15*tablero.escala, 2*tablero.escala);
        menu_low.draw();
        menu_med.draw();
        menu_hi.draw();


    stroke('#bf732b');
    strokeWeight(0.3*tablero.escala);
    text('MUSIC TYPE', 5*tablero.escala, 21* tablero.escala,15*tablero.escala, 2*tablero.escala);
    menu_fever.draw();
    menu_chill.draw();
    menu_off.draw();
    // jugar boton
  
}
function sliders_custom(x,y,nivel,max){
    nivel = nivel -1;
    let adicion =7;
    strokeWeight(tablero.escala*0.1);
    stroke('#ffffff');
    let log =mouseX+'---'+mouseY;
    //console.log(log);
    for(let i = 0; i<max;i++){
        if((i+1)%5==0 || i == 0){
            adicion = 10;
            strokeWeight(tablero.escala*0.2);
        }

        line(x*tablero.escala+(i*tablero.escala*0.6), y*tablero.escala-adicion, x*tablero.escala+(i*tablero.escala*0.6), y*tablero.escala+adicion);
        adicion =7;
        strokeWeight(tablero.escala*0.1);
    }
    if(mouseX <=20*tablero.escala  && mouseX >=7.9*tablero.escala &&mouseY >=11*tablero.escala && mouseY <=13*tablero.escala ){
       
        fill('#84d310');
    }else{
        fill('#ff9a39');
    }
    triangle(x*tablero.escala+(nivel*tablero.escala*0.6)-10, y*tablero.escala-30, x*tablero.escala+(nivel*tablero.escala*0.6)+10, y*tablero.escala-30, x*tablero.escala+(nivel*tablero.escala*0.6), y*tablero.escala-15);
}