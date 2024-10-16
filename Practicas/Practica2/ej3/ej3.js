var consultas = ["Dr. Pérez", "Dr. Gómez", "Dr. López"];
var pacientes = [];
var citas = [[][]];

function agregarCita() {
    var nombrePaciente = document.getElementById("nombrePaciente").value;
    var numeroConsulta = parseInt(document.getElementById("numeroConsulta").value) - 1;

    if (numeroConsulta >= 0 && numeroConsulta <= consultas.length) {
        pacientes.push(nombrePaciente);
        citas[numeroConsulta].push(nombrePaciente);
        document.getElementById('nombrePaciente').value = "";
        document.getElementById('numeroConsulta').value = "";
        mostrarConsultas();
    } else {
        alert("Por favor, ingrese un nombre válido y un número de consulta válido.");
    }
}

function mostrarConsultas() {
    const consultasDiv = document.getElementById("consultas");
    consultasDiv.innerHTML = "";

    for(var i = 0;  i < citas[i].length; i++) {
        var div = document.createElement("div");
        div.innerHTML += "<strong>" + citas[i] + "</strong>";
}
}

function siguientePaciente(index) {
    if (citas[index].length > 0) {
        alert(`El siguiente paciente es: ${citas[index][0]}`);
        citas[index].shift(); // Elimina el primer paciente de la lista
        mostrarConsultas();
    } else {
        alert('No hay pacientes en espera para esta consulta.');
    }
}

function actualizarListaPacientes() {
    const listaPacientesDiv = document.getElementById("listaPacientes");
    listaPacientesDiv.innerHTML = "";
    
}