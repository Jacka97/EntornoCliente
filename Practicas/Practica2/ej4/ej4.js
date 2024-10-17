function Factura(empresa, cliente, detalle, tIva, formaPago) {
    // Propiedades de la factura
    this.empresa = {
        nombre: empresa.nombre,
        direccion: empresa.direccion,
        telefono: empresa.telefono,
        nif: empresa.nif
    };
    
    this.cliente = {
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        nif: cliente.nif
    };
    
    this.detalle = detalle; // Este será un array de objetos { descripcion, precio, cantidad }
    this.tIva = tIva; // Tipo de IVA en porcentaje
    this.formaPago = formaPago; // Forma de pago
    this.baseImponible = 0;
    this.importeTotal = 0;
}

// Método para calcular el total de la factura
Factura.prototype.calculaTotal = function() {
    this.baseImponible = this.detalle.reduce((total, item) => {
        return total + (item.precio * item.cantidad);
    }, 0);
    
    const iva = this.baseImponible * (this.tIva / 100);
    this.importeTotal = this.baseImponible + iva;
};

// Método para mostrar el total de la factura
Factura.prototype.muestraTotal = function() {
    console.log(`Importe Total: ${this.importeTotal.toFixed(2)}€`);
    console.log(`IVA Aplicado: ${this.baseImponible * (this.tIva / 100).toFixed(2)}€`);
    console.log(`Forma de Pago: ${this.formaPago}`);
};

// Método para imprimir la factura
Factura.prototype.imprimirFactura = function() {
    const facturaHTML = `
        <h1>Factura</h1>
        <h2>Empresa</h2>
        <p>Nombre: ${this.empresa.nombre}</p>
        <p>Dirección: ${this.empresa.direccion}</p>
        <p>Teléfono: ${this.empresa.telefono}</p>
        <p>NIF: ${this.empresa.nif}</p>
        
        <h2>Cliente</h2>
        <p>Nombre: ${this.cliente.nombre}</p>
        <p>Dirección: ${this.cliente.direccion}</p>
        <p>Teléfono: ${this.cliente.telefono}</p>
        <p>NIF: ${this.cliente.nif}</p>
        
        <h2>Detalle de la Factura</h2>
        <ul>
            ${this.detalle.map(item => `<li>${item.descripcion}: ${item.cantidad} x ${item.precio}€</li>`).join('')}
        </ul>
        
        <h2>Totales</h2>
        <p>Base Imponible: ${this.baseImponible.toFixed(2)}€</p>
        <p>IVA: ${(this.baseImponible * (this.tIva / 100)).toFixed(2)}€</p>
        <p>Importe Total: ${this.importeTotal.toFixed(2)}€</p>
        <p>Forma de Pago: ${this.formaPago}</p>
    `;
    
    document.body.innerHTML += facturaHTML; // Imprime la factura en el documento actual
    
};
 // Crear una instancia de Factura
 const empresa = {
    nombre: "Empresa XYZ",
    direccion: "Calle Falsa 123",
    telefono: "123456789",
    nif: "A12345678"
};

const cliente = {
    nombre: "Cliente ABC",
    direccion: "Avenida Siempre Viva 742",
    telefono: "987654321",
    nif: "B87654321"
};

const detalle = [
    { descripcion: "Producto 1", precio: 10.00, cantidad: 2 },
    { descripcion: "Producto 2", precio: 15.00, cantidad: 1 }
];

const tIva = 21; // Tipo de IVA en porcentaje
const formaPago = "Tarjeta de Crédito";
const factura = new Factura(empresa, cliente, detalle, tIva, formaPago);
        factura.calculaTotal();
        factura.muestraTotal();
        factura.imprimirFactura();