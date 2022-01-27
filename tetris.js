const colors = ['#11B6CA','#CA1178','#DA522E'];
const figuras = {
    l: [3840,8738,240,17476,4],
    j: [312,210,57,150,3],
    o: [26112,26112,26112,26112,4],
    s: [240,153,30,306,3],
    t: [184,154,58,178,3],
    z: [408,90,51,180,3],

};

///en construccion.
class Ficha{
    constructor(rotacion =0,escala =100){
        this.escala = escala;
        this.rotacion = rotacion;
        this.vida= 1;
        this.x = 4*this.escala;
        this.y=0*this.escala;
        
    }

    get color(){
        this._color = this._color == undefined ? this.random(colors): this._color
        return this._color;
    }
    set color(color){ 
        this._color = color;
    }

    get forma(){
        this._forma = this._forma == undefined? this.random(figuras): this._forma;
        return this._forma;
        
    }
    set forma(forma){ return this._forma = forma}

    get rotacion(){
        this._rotacion = this._rotacion == undefined? 0:this._rotacion;
        return this._rotacion
    }
    set rotacion(rotacion){
        this._rotacion = rotacion;
        return;
    }

    
    random(obj){
        let key =Object.values(obj);
        let fig = key[Math.floor(Math.random() * key.length)];
        return fig;
    }

    mover(x,y =0){
        if(tablero.estado !=1){
            return false;
        }
        this.x = this.x +(this.escala*x);
        this.y = this.y +(this.escala*y);
        if(!tablero.verificar_colisiones()){
            this.x = this.x -(this.escala*x);
            this.y = this.y -(this.escala*y);
            return false;
        }
        return true;
    }
 
    reiniciar(){
    if(this.vida == 0){
        this.color = this.random(colors);
        this.forma = this.random(figuras);
        this.vida= 1;
        this.x = 4*this.escala;
        this.y=0*this.escala; 
    }
        

    }

    dibujar(){
        let fig = this.forma[this.rotacion];
        let cua = this.forma[4]
        let bin = fig.toString(2);
        bin = '0'.repeat((cua*cua)-bin.length)+ bin;
        let escala=this.escala;
        let x1 = this.x;
        let y1 = this.y;
        let v = 0;
        for(let i=0;i< cua*cua;i++){


            let mask = '0'.repeat(i)+'1'+'0'.repeat((cua*cua-1)-i);
         
            
            if ((parseInt(mask,2)&fig) !=0){
                fill(this.color);
                rect(x1,y1,escala);
                v=v+1;

            
                beginShape();
                vertex(x1+(escala/10), y1+(escala/10));
                vertex(x1+(escala/10),y1+escala-(escala/15));
                vertex(x1+escala-(escala/15),y1+(escala/10));
                vertex(x1+(escala/10), y1+(escala/10));
                endShape();

                beginShape();
                vertex(x1+escala-(escala/10), y1+escala-(escala/10));
                vertex(x1+escala-(escala/10),y1+(escala/15));
                vertex(x1+(escala/15),y1+escala-(escala/10));
                vertex(x1+escala-(escala/10), y1+escala-(escala/10));
                endShape();
               
            }

            x1=x1+escala;
            if(((i+1)%cua) == 0){
            y1=y1+escala;
            x1=this.x;  
            }
            
        }
     
    }


    rotar(){
        if(tablero.estado !=1){
            return false;
        }
        this.rotacion = (++this.rotacion)%4;
        if(!tablero.verificar_colisiones()){
            this.rotacion = (this.rotacion-1)%4;
            if(this.rotacion<0){
                this.rotacion = 3;
            }
        }
        return this.rotacion;
    }

}

