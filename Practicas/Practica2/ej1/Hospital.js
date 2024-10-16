class Hospital{
constructor(codHospital, nombreHospital, direccion, telefono, poblacion, codPostal){
    this.codigo = codHospital;
    this.nombre = nombreHospital;
    this.direccion = direccion;
    this.telefono = telefono;
    this.poblacion = poblacion;
    this.codPostal = codPostal;
}
mostrarHospital(){ // metodo para mostrar los datos del hospital
    document.write(`Codigo: ${this.codigo}<br>`);
    document.write(`Nombre: ${this.nombre}<br>`);
    document.write(`Direccion: ${this.direccion}<br>`);
    document.write(`Telefono: ${this.telefono}<br>`);
    document.write(`Poblacion: ${this.poblacion}<br>`);
    document.write(`Cod Postal: ${this.codPostal}<br>`);
    document.write(`--------------------------------- <br>`)
}

    }