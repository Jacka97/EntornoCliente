class Medico{
    constructor(codMedico, nombre, apellidos, dni, direccion, telefono, poblacion, codPostal, fechaNacimiento, especialidad, sueldo, hospital){
        this.codMedico = codMedico;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.direccion = direccion;
        this.telefono = telefono;
        this.poblacion = poblacion;
        this.codPostal = codPostal;
        this.fechaNacimiento = fechaNacimiento;
        this.especialidad = especialidad;
        this.sueldo = sueldo;
        this.hospital = hospital;
    }
    cambiaSueldo(sueldoNuevo) { // Cambia el sueldo
        this.sueldo = sueldoNuevo;
    }
    retencionMedico(retencion){ // Calcula la retencion
       return this.sueldo - retencion;

    }
    mostrarDatos(){ //metodo para mostrar los datos del medico
        document.write(`----------MEDICO---------- <br>`)
        document.write(`Código del médico: ${this.codMedico}<br>`);
        document.write(`Nombre: ${this.nombre}<br>`);
        document.write(`Apellidos: ${this.apellidos}<br>`);
        document.write(`DNI: ${this.dni}<br>`);
        document.write(`Dirección: ${this.direccion}<br>`);
        document.write(`Teléfono: ${this.telefono}<br>`);
        document.write(`Población: ${this.poblacion}<br>`);
        document.write(`Código Postal: ${this.codPostal}<br>`);
        document.write(`Fecha de nacimiento: ${this.fechaNacimiento}<br>`);
        document.write(`Especialidad: ${this.especialidad}<br>`);
        document.write(`Sueldo: ${this.sueldo}<br>`);
        document.write(`Hospital: ${this.hospital.nombre}<br>`);
        document.write(`--------------------------------- <br>`)
    }
        }