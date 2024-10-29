document.addEventListener("DOMContentLoaded", function() {
    let dificultad = "";
    let pincel = false;
    let dificultadAr = [10,  20, 30, 40];

    function cambiarColor(event) {
        dificultad = event.target.id;
        document.getElementById("dificultad").textContent = "Dificultad seleccionada: " + dificultad;
        console.log(dificultad);
        crearTabla();
      
    }
    let casillas;
        switch (dificultad){
            case "facil":
                casillas = dificultadAr[0];
                break;
            case "medio":
                casillas = dificultadAr[1];
                break;
            case "dificil":
                casillas = dificultadAr[2];
                break;
            case "vietnam":
                casillas = dificultadAr[3];
                break;
        }

    function crearTabla() {
        let tabla = document.getElementById("tablaDibujo");
        let casillas;
        tabla.innerHTML = ""; // Limpiar contenido previo
        switch (dificultad){
            case "facil":
                casillas = dificultadAr[0];
                break;
            case "medio":
                casillas = dificultadAr[1];
                break;
            case "dificil":
                casillas = dificultadAr[2];
                break;
            case "vietnam":
                casillas = dificultadAr[3];
                break;
        }
        let nuevaTabla = document.createElement("table");
        nuevaTabla.setAttribute("id", "canvas");

        for (let i = 0; i < casillas; i++) {
            let fila = document.createElement("tr");
            for (let j = 0; j < casillas; j++) {
                let celda = document.createElement("td");
                celda.setAttribute("id", i + "-" + j); // ID de la celda
                celda.style.width = "10px";
                celda.style.height = "10px";
                celda.style.backgroundColor = "white";
                celda.style.cursor = "pointer"; // Cambiar cursor al pasar sobre la celda

               
                fila.appendChild(celda);
            }
            nuevaTabla.appendChild(fila);
        }

        tabla.appendChild(nuevaTabla);
    }

    // Agregar evento a cada botón de color
    document.getElementById("facil").addEventListener("click", cambiarColor);
    document.getElementById("medio").addEventListener("click", cambiarColor);
    document.getElementById("dificil").addEventListener("click", cambiarColor);
    document.getElementById("vietnam").addEventListener("click", cambiarColor);

});