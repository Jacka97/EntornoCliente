document.addEventListener("DOMContentLoaded", function() {
    let colorSeleccionado = ""; // Color por defecto

    function cambiarColor(event) {
        colorSeleccionado = event.target.id;
        document.getElementById("textoPincel").textContent = "Color seleccionado: " + colorSeleccionado;
        console.log(colorSeleccionado);
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

                celda.addEventListener("click", function() {
                    switch(colorSeleccionado){
                        case "rojo":
                            celda.style.backgroundColor = "red";
                            break;
                        case "azul":
                            celda.style.backgroundColor = "blue";
                            break;
                        case  "verde":
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
                    // Cambia el color de la celda
                });

                fila.appendChild(celda);
            }
            nuevaTabla.appendChild(fila);
        }

        tabla.appendChild(nuevaTabla);
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
