document.addEventListener("DOMContentLoaded", function () {
    function cargarDatosBase() {
        var peticion = new XMLHttpRequest();
        peticion.onreadystatechange = function () {
            console.log(peticion.readyState);
            if (peticion.readyState == 4 && peticion.status == 200) {
                var datosJson = JSON.parse(peticion.responseText);
                var empleadosRecibidos = datosJson;
                console.log(datosJson);

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
                    var contratado = empleadosRecibidos[i].contratado;

                    // Concatenamos las filas de la tabla correctamente
                    tabla.innerHTML += "<tr>" +
                        "<td>" + idEmpleado + "</td>" +
                        "<td>" + nombreEmpleado + "</td>" +
                        "<td>" + edadEmpleado + "</td>" +
                        "<td>" + cargoEmpleado + "</td>" +
                        "<td>" + contratado + "</td>" +
                        "<td><button onclick='modificarEmpleado(" + empleadosRecibidos[i].id + ")'>Modificar</button>" +
                        "<button onclick='borrarEmpleado(" + empleadosRecibidos[i].id + ")'>Borrar</button>" +
                        "</td>" +
                        "</tr>";
                }
            }
        };

        peticion.open("GET", "http://test-api.jtarrega.es/api/empleados", true);
        peticion.send();
    }

    cargarDatosBase();
});
