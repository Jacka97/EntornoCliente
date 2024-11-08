document.addEventListener("DOMContentLoaded", function() {
    let colorSeleccionado = "";
    let pincel = false;

    function cambiarColor(event) {
        colorSeleccionado = event.target.id;
        document.getElementById("textoPincel").textContent = "Color seleccionado: " + colorSeleccionado;
      
    }

    function crearTabla() {
        let tabla = document.getElementById("tablaDibujo");
        tabla.innerHTML = ""; // Limpiar contenido previo

        let nuevaTabla = document.createElement("table");
        nuevaTabla.setAttribute("id", "canvas");

        for (let i = 0; i < 30; i++) {
            let fila = document.createElement("tr");
            for (let j = 0; j < 30; j++) {
                let celda = document.createElement("td");
                celda.setAttribute("id", i + "-" + j); // ID de la celda
                celda.style.width = "10px";
                celda.style.height = "10px";
                celda.style.backgroundColor = "white";
                celda.style.cursor = "pointer"; // Cambiar cursor al pasar sobre la celda

                celda.addEventListener("mouseenter", function() {
                    console.log("ID de la celda:", celda.id); // Muestra el ID en la consola
                });

                // Pintar cuando el ratón entra y el pincel está activado
                celda.addEventListener("mouseover", function() {
                    if (pincel) { // Solo pinta si el pincel está activado
                        pintarCelda(celda);
                    }
                });

                // Activar el pincel al hacer clic
                celda.addEventListener("mousedown", function() {
                    pincel = true; // Activar el modo pincel
                    pintarCelda(celda); // Pintar la celda en la que se hace clic
                });

                // Desactivar el pincel al soltar el botón del ratón
                document.addEventListener("mouseup", function() {
                    pincel = false; // Desactivar el modo pincel
                });

                fila.appendChild(celda);
            }
            nuevaTabla.appendChild(fila);
        }

        tabla.appendChild(nuevaTabla);
    }
    //Funcion que pinta segun el color
    function pintarCelda(celda) {
        switch(colorSeleccionado) {
            case "rojo":
                celda.style.backgroundColor = "red";
                break;
            case "azul":
                celda.style.backgroundColor = "blue";
                break;
            case "verde":
                celda.style.backgroundColor = "green";
                break;
            case "negro":
                celda.style.backgroundColor = "black";
                break;
            case "amarillo":
                celda.style.backgroundColor = "yellow";
                break;
            case "blanco":
                celda.style.backgroundColor = "white";
                break;
        }
    }

    window.onload = crearTabla;

    // Agregar evento a cada botón de color
    document.getElementById("amarillo").addEventListener("click", cambiarColor);
    document.getElementById("verde").addEventListener("click", cambiarColor);
    document.getElementById("negro").addEventListener("click", cambiarColor);
    document.getElementById("rojo").addEventListener("click", cambiarColor);
    document.getElementById("azul").addEventListener("click", cambiarColor);
    document.getElementById("blanco").addEventListener("click", cambiarColor);
});
