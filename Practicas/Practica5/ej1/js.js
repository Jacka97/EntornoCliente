document.addEventListener("DOMContentLoaded", function () {


    // Función para cargar los datos de los empleados
    function cargarDatosBase() {
        var peticion = new XMLHttpRequest();
        peticion.onreadystatechange = function () {
            if (peticion.readyState == 4 && peticion.status == 200) {
                var datosJson = JSON.parse(peticion.responseText);
                var empleadosRecibidos = datosJson;

                // Establecemos el encabezado de la tabla solo una vez
                var tabla = document.getElementById("empleados");
                tabla.innerHTML = "<tr>" +
                    "<th>ID</th>" +
                    "<th>Nombre</th>" +
                    "<th>Edad</th>" +
                    "<th>Cargo</th>" +
                    "<th>Contratado</th>" +
                    "<th>Acciones</th>" +
                    "</tr>"; // Esto establece las cabeceras de la tabla

                // Agregamos los datos de los empleados a la tabla
                for (var i = 0; i < empleadosRecibidos.length; i++) {
                    var nombreEmpleado = empleadosRecibidos[i].nombre;
                    var idEmpleado = empleadosRecibidos[i].id;
                    var edadEmpleado = empleadosRecibidos[i].edad;
                    var cargoEmpleado = empleadosRecibidos[i].cargo;
                    var contratado = empleadosRecibidos[i].contratado ? "Sí" : "No";

                    // Crear un nuevo tr para agregarlo a la tabla
                    var fila = document.createElement("tr");

                    // Crear celdas (td) para cada campo de la fila
                    var tdId = document.createElement("td");
                    tdId.textContent = idEmpleado;

                    var tdNombre = document.createElement("td");
                    tdNombre.textContent = nombreEmpleado;

                    var tdEdad = document.createElement("td");
                    tdEdad.textContent = edadEmpleado;

                    var tdCargo = document.createElement("td");
                    tdCargo.textContent = cargoEmpleado;

                    var tdContratado = document.createElement("td");
                    tdContratado.textContent = contratado;

                    var tdAcciones = document.createElement("td");

                    // Crear botones de acciones
                    var botonModificar = document.createElement("button");
                    botonModificar.classList.add('mod');
                    botonModificar.setAttribute("data-id", idEmpleado);
                    botonModificar.textContent = "Modificar";
                    botonModificar.addEventListener("click", function () {
                        var idEmpleado = this.getAttribute('data-id');
                        modificarEmpleado(idEmpleado);
                    });

                    var botonEliminar = document.createElement("button");
                    botonEliminar.classList.add('del');
                    botonEliminar.setAttribute("data-id", idEmpleado);
                    botonEliminar.textContent = "Eliminar";
                    botonEliminar.addEventListener("click", function () {
                        var idEmpleado = this.getAttribute('data-id');
                        eliminarEmpleado(idEmpleado);
                    });

                    // Agregar los botones al td de acciones
                    tdAcciones.appendChild(botonModificar);
                    tdAcciones.appendChild(botonEliminar);

                    // Agregar las celdas (td) a la fila (tr)
                    fila.appendChild(tdId);
                    fila.appendChild(tdNombre);
                    fila.appendChild(tdEdad);
                    fila.appendChild(tdCargo);
                    fila.appendChild(tdContratado);
                    fila.appendChild(tdAcciones);

                    // Finalmente, agregamos la fila a la tabla
                    tabla.appendChild(fila);
                }


            }
        };
        var botonesModificar1 = document.getElementsByClassName("mod");
        var botonesModificar2 = document.getElementsByClassName("del");

        // Recorrer todos los elementos y añadirles el evento 'click'
        for (let i = 0; i < botonesModificar1.length; i++) {
            botonesModificar1[i].addEventListener("click", function () {
                // Obtener el id del empleado desde el atributo 'data-id'
                var idEmpleado = this.getAttribute('data-id');
                modificarEmpleado(idEmpleado);
            });
        }

        for (let j = 0; j < botonesModificar2.length; j++) {
            botonesModificar2[j].addEventListener("click", function () {
                // Obtener el id del empleado desde el atributo 'data-id'
                var idEmpleado = this.getAttribute('data-id');
                eliminarEmpleado(idEmpleado);
            });
        }

        peticion.open("GET", "http://test-api.jtarrega.es/api/empleados", true);
        peticion.send();
    }

    // Cargar la lista de empleados al cargar la página
    cargarDatosBase();


    // Función para mostrar el formulario de nuevo empleado
    function nuevoEmpleado() {
        // Cambiar la visibilidad de las secciones
        document.getElementById('listaEmpleados').classList.remove('visible');
        document.getElementById('listaEmpleados').classList.add('oculto');
        document.getElementById('nuevoEmp').classList.remove('oculto');
        document.getElementById('nuevoEmp').classList.add('visible');

    }

    // Función para agregar un nuevo empleado
    function sendNuevoEmpleado() {
        console.log("La función sendNuevoEmpleado ha sido llamada."); // Verifica si esta línea aparece en la consola

        // Obtener valores del formulario
        var nombreForm = document.getElementById("nombre").value;
        var edadForm = document.getElementById("edad").value;
        var cargoForm = document.getElementById("cargo").value;
        var contratadoForm = document.getElementById("contratado").checked ? 1 : 0;
        var capa = document.getElementById("capa");
        capa.innerHTML = "";


        // Crear objeto de datos
        const dataToSend = {
            nombre: nombreForm,
            edad: parseInt(edadForm),
            cargo: cargoForm,
            contratado: contratadoForm
        };

        console.log("Datos a enviar:", dataToSend); // Verifica que los datos están bien formados

        // Convertir objeto a JSON
        const jsonData = JSON.stringify(dataToSend);

        // Crear objeto XMLHttpRequest
        var peticion = new XMLHttpRequest();

        // Configurar solicitud
        peticion.open("POST", "http://test-api.jtarrega.es/api/empleados", true);
        peticion.setRequestHeader("Content-Type", "application/json");

        // Definir comportamiento de la solicitud
        peticion.onreadystatechange = function () {
            if (peticion.readyState === 4) {
                if (peticion.status === 200 || peticion.status === 201) {
                    console.log("Respuesta recibida:", peticion.responseText);
                    cargarDatosBase();
                    document.getElementById('capa').innerHTML = "Empleado agregado con éxito.";
                } else {
                    console.error("Error en la solicitud:", peticion.status, peticion.statusText);
                    document.getElementById('capa').innerHTML = "Error al agregar empleado.";
                }
            }
        };

        // Enviar datos
        peticion.send(jsonData);
        document.getElementById('listaEmpleados').classList.remove('oculto');
        document.getElementById('listaEmpleados').classList.add('visible');
        document.getElementById('nuevoEmp').classList.remove('visible');
        document.getElementById('nuevoEmp').classList.add('oculto');
        cargarDatosBase();

    }


    // Función para modificar un empleado
    function modificarEmpleado(id) {
        console.log("Iniciando metodo modificar");
        // Cambiar la visibilidad: ocultar la lista de empleados y mostrar el formulario
        document.getElementById("listaEmpleados").classList.remove('visible');
        document.getElementById('listaEmpleados').classList.add('oculto');
        document.getElementById("modEmple").classList.remove('oculto');
        document.getElementById('modEmple').classList.add('visible');

        // Realizar la solicitud GET para obtener los datos del empleado
        var peticion = new XMLHttpRequest();
        peticion.open("GET", 'http://test-api.jtarrega.es/api/empleados/' + id, true);

        peticion.onreadystatechange = function () {
            if (peticion.readyState === 4 && (peticion.status === 200 || peticion.status === 201 || peticion.status === 204)) {
                var empleado = JSON.parse(peticion.responseText)[0];
                console.log(empleado);
                document.getElementById('modDatos').innerHTML += " " + empleado.id;
                // Pre-llenar el formulario con los datos del empleado
                document.getElementById("nombre2").value = empleado.nombre;
                document.getElementById("edad2").value = empleado.edad;
                document.getElementById("cargo2").value = empleado.cargo;
                document.getElementById("contratado2").checked = empleado.contratado;


            }
        };
        peticion.send();
        //Funcion para enviar los cambios al servidor
        

    }
    function enviarCambios() {
        console.log("Iniciando metodo enviar cambios");
        //conseguir el id del objeto empleado
        var id = document.getElementById('modDatos').innerHTML;
        var nombre = document.getElementById('nombre2').value
        var edad = document.getElementById('edad2').value
        var cargo = document.getElementById('cargo2').value
        var contratado = document.getElementById('contratado2').checked
        if(contratado == true){
            contratado = 1;
        }else{
            contratado = 0;
        }
        const dataToSend = {
            id: parseInt(id),
            nombre: nombre,
            edad: parseInt(edad),
            cargo: cargo,
            contratado: contratado
        };
        console.log(dataToSend);
        var peticion = new XMLHttpRequest();
        console.log(id);
        peticion.open("PUT", 'http://test-api.jtarrega.es/api/empleados/' + parseInt(id), true);
        peticion.setRequestHeader("Content-Type", "application/json");
 
        if(peticion.readyState == 4 && peticion.status == 200 || peticion.status == 201 || peticion.status == 204){
        console.log(peticion.responseText);
        
        console.log("Cambios enviados");
        // Cambiar la visibilidad: ocultar el formulario y mostrar la lista de empleados
        document.getElementById("modEmple").classList.remove('visible');
        document.getElementById('modEmple').classList.add('oculto');
        document.getElementById("listaEmpleados").classList.remove('oculto');
        document.getElementById('listaEmpleados').classList.add('visible');
        }
        let jsonData = JSON.stringify(dataToSend);
        peticion.send(jsonData);
    }
    // Función para eliminar un empleado
    function eliminarEmpleado(id) {
        console.log("Se ha llamado a la funcion eliminar")
        var peticion = new XMLHttpRequest();
        peticion.open("DELETE", "http://test-api.jtarrega.es/api/empleados/" + id, true);
        peticion.setRequestHeader("Content-Type", "application/json");

        peticion.onreadystatechange = function () {
            if (peticion.readyState === 4) {
                if (peticion.status === 200) {
                    console.log("Empleado eliminado con éxito");
                    cargarDatosBase(); // Recargar los datos después de eliminar un empleado
                    document.getElementById('capa').innerHTML = "Empleado eliminado con éxito.";
                } else {
                    console.error("Error al eliminar empleado:", peticion.status, peticion.statusText);
                    document.getElementById('capa').innerHTML = "Error al eliminar empleado.";
                }
            }
        };

        peticion.send();
    }



    document.getElementById("Cancelar1").addEventListener("click", function () {
        document.getElementById('listaEmpleados').classList.remove('oculto');
        document.getElementById('listaEmpleados').classList.add('visible');
        document.getElementById('nuevoEmp').classList.remove('visible');
        document.getElementById('nuevoEmp').classList.add('oculto');
    });
    document.getElementById("Cancelar2").addEventListener("click", function () {
        document.getElementById('listaEmpleados').classList.remove('oculto');
        document.getElementById('listaEmpleados').classList.add('visible');
        document.getElementById('modEmple').classList.remove('visible');
        document.getElementById('modEmple').classList.add('oculto');
    });
    document.getElementById("nuevoEmpleado").addEventListener("click", nuevoEmpleado); // Mostrar formulario de nuevo empleado
    document.getElementById("Aceptar1").addEventListener("click", function (event) {
        event.preventDefault(); // Evitar la recarga de la página
        sendNuevoEmpleado();
    });
    document.getElementById("Aceptar2").addEventListener("click", function (event) {
        event.preventDefault(); // Evitar la recarga de la página
        document.getElementById('listaEmpleados').classList.remove('oculto');
        document.getElementById('listaEmpleados').classList.add('visible');
        document.getElementById('modEmple').classList.remove('visible');
        document.getElementById('modEmple').classList.add('oculto');
        enviarCambios();
    });


});

