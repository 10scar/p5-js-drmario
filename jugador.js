class Jugador{
    constructor(){
        this.puntuacion = 0;
    }

    get nombre(){
        this._nombre = this._nombre == undefined ? "Nuevo Jugador": this._nombre
        return this._nombre;
    }

    set nombre(nombre){ return this._nombre = nombre}
}