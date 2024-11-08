document.addEventListener("DOMContentLoaded", function() {
    let dificultad = "";
    let minasMarcadas = 0;
    let tablero = [];
    let numMinas = 0;
    let tiempo = 0;
    let temporizador;

    // Matriz de rangos de celdas por dificultad
    let dificultadAr = [[10, 20], [20, 40], [40, 80], [80, 100]];

    // Cambiar dificultad seleccionada
    function cambiarDificultad(event) {
        dificultad = event.target.id;
        document.getElementById("dificultad").textContent = "Dificultad seleccionada: " + dificultad;
        numMinas = (dificultad === "facil") ? 25 : (dificultad === "medio") ? 60 : (dificultad === "dificil") ? 100 : 140;
        crearTabla();
    }

    // Función para obtener un valor aleatorio en el rango
    function mathRandom(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Función para crear la tabla según la dificultad seleccionada
    function crearTabla() {
        let tabla = document.getElementById("tablaDibujo");
        tabla.innerHTML = ""; // Limpiar tabla previa

        let min, max;
        
        // Determinar el rango según la dificultad
        switch (dificultad) {
            case "facil":
                [min, max] = dificultadAr[0];
                break;
            case "medio":
                [min, max] = dificultadAr[1];
                break;
            case "dificil":
                [min, max] = dificultadAr[2];
                break;
            case "vietnam":
                [min, max] = dificultadAr[3];
                break;
            default:
                [min, max] = dificultadAr[0]; // por defecto "facil"
        }

        let casillas = mathRandom(min, max); // Número de filas y columnas de la tabla
        tablero = []; // Reiniciar el tablero

        // Crear nueva tabla
        let nuevaTabla = document.createElement("table");
        nuevaTabla.setAttribute("id", "canvas");

        // Inicializar la matriz de celdas y colocar minas
        for (let i = 0; i < casillas; i++) {
            let fila = [];
            let tr = document.createElement("tr");

            for (let j = 0; j < casillas; j++) {
                let td = document.createElement("td");
                td.setAttribute("data-fila", i);
                td.setAttribute("data-columna", j);
                td.addEventListener("click", descubrirCelda);
                td.addEventListener("contextmenu", marcarCelda);
                td.style.width = "20px";
                td.style.height = "20px";
                td.style.backgroundColor = "white";
                td.style.cursor = "pointer";
                fila.push({ mina: false, revelada: false, marcado: false, numero: 0 });
                tr.appendChild(td);
            }
            nuevaTabla.appendChild(tr);
            tablero.push(fila);
        }

        tabla.appendChild(nuevaTabla);

        // Colocar las minas aleatoriamente en el tablero
        let minasColocadas = 0;
        while (minasColocadas < numMinas) {
            let fila = mathRandom(0, casillas - 1);
            let columna = mathRandom(0, casillas - 1);
            if (!tablero[fila][columna].mina) {
                tablero[fila][columna].mina = true;
                minasColocadas++;
            }
        }

        // Calcular los números de las celdas (cuántas minas hay alrededor)
        for (let i = 0; i < casillas; i++) {
            for (let j = 0; j < casillas; j++) {
                if (tablero[i][j].mina) continue;
                let minasAlrededor = 0;
                for (let fi = -1; fi <= 1; fi++) {
                    for (let ci = -1; ci <= 1; ci++) {
                        let ni = i + fi;
                        let nj = j + ci;
                        if (ni >= 0 && ni < casillas && nj >= 0 && nj < casillas && tablero[ni][nj].mina) {
                            minasAlrededor++;
                        }
                    }
                }
                tablero[i][j].numero = minasAlrededor;
            }
        }

        // Iniciar el temporizador
        if (temporizador) clearInterval(temporizador);
        tiempo = 0;
        temporizador = setInterval(function() {
            tiempo++;
            document.getElementById("timer").textContent = "Tiempo: " + tiempo + "s";
        }, 1000);
        document.getElementById("minas").textContent = "Minas plantadas:" + numMinas;
        document.getElementById("minasRestantes").textContent = "Minas marcadas restantes: " + (numMinas - minasMarcadas);
    }

    // Función para descubrir una celda
    function descubrirCelda(event) {
        let fila = parseInt(event.target.getAttribute("data-fila"));
        let columna = parseInt(event.target.getAttribute("data-columna"));
        let celda = tablero[fila][columna];

        if (celda.revelada || celda.marcado) return; // No hacer nada si ya está revelada o marcada

        celda.revelada = true;
        let td = event.target;
        td.style.backgroundColor = "lightgray";

        if (celda.mina) {
            td.textContent = "💣";
            td.style.backgroundColor = "red";
            perderJuego();
        } else {
            td.textContent = celda.numero > 0 ? celda.numero : "";
            if (celda.numero === 0) {
                // Si no hay minas alrededor, descubrir celdas vecinas
                descubrirVecinas(fila, columna);
            }
        }

        comprobarVictoria();
    }

    // Función para descubrir celdas vecinas
    function descubrirVecinas(fila, columna) {
        for (let fi = -1; fi <= 1; fi++) {
            for (let ci = -1; ci <= 1; ci++) {
                let ni = fila + fi;
                let nj = columna + ci;
                if (ni >= 0 && ni < tablero.length && nj >= 0 && nj < tablero[0].length) {
                    let celdaVecina = tablero[ni][nj];
                    if (!celdaVecina.revelada && !celdaVecina.mina) {
                        let tdVecina = document.querySelector(`#canvas td[data-fila='${ni}'][data-columna='${nj}']`);
                        celdaVecina.revelada = true;
                        tdVecina.style.backgroundColor = "lightgray";
                        tdVecina.textContent = celdaVecina.numero > 0 ? celdaVecina.numero : "";
                        if (celdaVecina.numero === 0) {
                            descubrirVecinas(ni, nj);
                        }
                    }
                }
            }
        }
    }

    // Función para marcar una celda con bandera
    function marcarCelda(event) {
        event.preventDefault();
        let fila = parseInt(event.target.getAttribute("data-fila"));
        let columna = parseInt(event.target.getAttribute("data-columna"));
        let celda = tablero[fila][columna];

        if (celda.revelada) return; // No se puede marcar una celda ya revelada

        celda.marcado = !celda.marcado;
        let td = event.target;

        if (celda.marcado) {
            td.textContent = "🚩";
            minasMarcadas++;
        } else {
            td.textContent = "";
            minasMarcadas--;
        }
        document.getElementById("minas").textContent = "Minas plantadas:" + numMinas;
        document.getElementById("minasRestantes").textContent = "Minas marcadas restantes: " + (numMinas - minasMarcadas);
    }

    // Función para comprobar la victoria
    function comprobarVictoria() {
        let celdasReveladas = 0;
        for (let i = 0; i < tablero.length; i++) {
            for (let j = 0; j < tablero[i].length; j++) {
                if (tablero[i][j].revelada && !tablero[i][j].mina) celdasReveladas++;
            }
        }

        if (celdasReveladas === (tablero.length * tablero[0].length - numMinas)) {
            document.getElementById("estado").style.display =  "block";
            document.getElementById("estado").textContent = "Has ganado!!!!"
            reiniciar = setInterval(function() {
                window.location.reload()
            },5000);
            
        }
    }

    // Función para perder el juego
    function perderJuego() {
        document.getElementById("estado").style.display =  "block";
        document.getElementById("estado").textContent = "Has perdido!!!!"
        reiniciar = setInterval(function() {
            window.location.reload()
        },5000);
    }
    document.getElementById("reiniciar").addEventListener("click", perderJuego);

    // Event listeners para los botones de dificultad
    document.getElementById("facil").addEventListener("click", cambiarDificultad);
    document.getElementById("medio").addEventListener("click", cambiarDificultad);
    document.getElementById("dificil").addEventListener("click", cambiarDificultad);
    document.getElementById("vietnam").addEventListener("click", cambiarDificultad);
});
