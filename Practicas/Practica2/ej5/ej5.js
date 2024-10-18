class Edificio {
    constructor(calle, numero, codPostal) {
        this.calle = calle;
        this.numero = numero;
        this.codPostal = codPostal;
        this.plantas = []; // Array tridimensional index = plantas,  subindex = apartamentos, y luego puertas
    alert("Se ha construido u nuevo edificion el la calle: " + this.calle + ", Nº: " + this.numero+ ", CP: "+ this.codPostal);
    }
    getCalle() {
        return this.calle;
    }
    getNumero() {
        return this.numero;
    }
    getCodPostal() {
        return this.codPostal;
    }
    setCalle(calle) {
        this.calle = calle;
    }
    setNumero(numero) {
        this.numero = numero;
    }
    setCodPostal(codPostal) {
        this.codPostal = codPostal;
    }
    imprimeCalle() {
        console.log(this.calle);
    }
    imprimeNumero() {
        console.log(this.numero);
    }
    imprimeCodPostal() {
        console.log(this.codPostal);
    }
    agregarPlantasYPuertas(numPlantas, puertas){  // numPlantas = numero de plantas, puertas = array de puertas
        for (let i = 0; i < numPlantas; i++) {
            let nuevaPlanta = [];
            for (let j = 0; j < puertas; j++) {
                nuevaPlanta.push([]);
            }
            this.plantas.push(nuevaPlanta);  // Agrego la nueva planta al array de plantas(No borra las existentes)
        }
    }
    agregarPropietario(nombre, planta, puerta){
        this.plantas[planta -1][puerta -1].push(nombre);
        alert(nombre + " es ahora propietario de la " + puerta + " de la planta " + planta)
    }
    imprimePlantas() { //Imprime las plantas, sus puertas y propietarios
        document.write("<br>Edificio de la calle " + this.calle + ", número: " + this.numero + "<br>");

        this.plantas.forEach((planta, index) => {  //index = planta
            document.write("<br><strong>---Planta " + (index + 1) + "--- </strong>");
            planta.forEach((puerta, subindex) => {   //subindex = puerta
                document.write("<br>Puerta " + (subindex + 1) + ":");
                puerta.forEach(inquilino => {   //inquilino = propietario
                    document.write(inquilino);
                });
            });
        });
    }
}