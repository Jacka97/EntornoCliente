var consultas = ["Dr. Pérez", "Dr. Gómez", "Dr. López"];
var pacientes = [];
var citas = [[], [], []];

function agregarCita() {
    var nombrePaciente = document.getElementById("nombrePaciente").value;
    var numeroConsulta = parseInt(document.getElementById("numeroConsulta").value) - 1;

    if (numeroConsulta >= 0 && numeroConsulta < consultas.length) {
        pacientes.push(nombrePaciente);
        citas[numeroConsulta].push(nombrePaciente);
        document.getElementById('nombrePaciente').value = "";
        document.getElementById('numeroConsulta').value = "";
        mostrarConsultas();
        actualizarListaPacientes();
    } else {
        alert("Por favor, ingrese un nombre válido y un número de consulta válido.");
    }
}

function mostrarConsultas() {
    var consultasDiv = document.getElementById("consultasDiv");
    consultasDiv.innerHTML = ""; // Limpia el contenido del elemento
    consultas.forEach((consulta, index) => {
        var div = document.createElement("div");
        div.innerHTML += "<strong>Doctor " + consulta + "</strong>";
        div.innerHTML += "<button onclick='siguientePaciente(" + index + ")'>Siguiente</button>";
        citas[index].forEach((paciente) => {
            div.innerHTML += "<p>" + paciente + "</p>";
            
        });
        
        consultasDiv.appendChild(div);
    });
}

function siguientePaciente(index) {
    if (citas[index].length > 0) {
        alert("El siguiente paciente es: " + citas[index][0]);
        pacientes.splice(pacientes.indexOf(citas[index][0]), 1);//Elimina el paciente del array
        citas[index].shift(); // Elimina el primer paciente de la lista
        mostrarConsultas();
        actualizarListaPacientes();
    } else {
        alert('No hay pacientes en espera para esta consulta.');
    }
}

function actualizarListaPacientes() {
    const listaPacientesDiv = document.getElementById("listaPacientes");
    listaPacientesDiv.innerHTML = "";
    pacientes.forEach(paciente => {
        listaPacientesDiv.innerHTML += "<p>" + paciente + "</p>";
    });
}
