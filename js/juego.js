var juego = {
    'filas': [
        [],
        [],
        []
    ],
    'espacioVacio': {
        fila: 2,
        columna: 2
    },
    'iniciar': function(elemento) {
        // this === juego
        this.instalarPiezas(elemento);
        this.capturarTeclas();
        this.mezclarFichas(50);
    },
    crearPieza: function(numero, fila, columna) {
        var pieza = $('<div/>');
        pieza.addClass('pieza');
        pieza.css({
            'backgroundImage': 'url("piezas/' + numero + '.jpg")',
            'top': 200 * fila + 'px',
            'left': 200 * columna + 'px'
        });

        return {
            dom: pieza,
            fila: fila,
            columna: columna,
            numero: numero
        };
    },
    instalarPiezas: function(elemento) {
        var numero = 1;
        for (var fila = 0; fila < 3; fila++) {
            for (var columna = 0; columna < 3; columna++) {
                if (fila === this.espacioVacio.fila &&
                    columna === this.espacioVacio.columna) {
                    this.filas[fila][columna] = null;
                } else {
                    var pieza = this.crearPieza(numero, fila, columna);
                    this.filas[fila][columna] = pieza;
                    numero++;
                    elemento.append(pieza.dom);
                }
            }
        }
    },
    mezclarFichas: function(veces) {
        var nombreMetodos = ["moverHaciaAbajo", "moverHaciaArriba", "moverHaciaLaDerecha", "moverHaciaLaIzquierda"];
        var i = 0;
        var mezcla = function() {
            var random = Math.floor(Math.random() * 4); // 0 y 3, entero.
            i++;

            var nombreMetodo = nombreMetodos[random];
            // nombreMetodo === 'moverHaciaAbajo'
            this[nombreMetodo]();
            if (i > veces) {
                // Terminar si es setInterval o repetir si es setTimeout.
            }
        };

        
    },
    chequearSiGano: function() {
        var gano = true;
        for (var fila = 0; fila < 3; fila++) {
            for (var columna = 0; columna < 3; columna++) {
                var pieza = this.filas[fila][columna];
                // guardo la pieza actual en una variable

                if (pieza === null) {
                    // es el espacio vacío, así que no lo reviso
                    continue; // reinicia el ciclo ^
                }

                var filaInicial = pieza.fila;
                var columnaInicial = pieza.columna;

                var ganoPorAhora = filaInicial === fila && columnaInicial === columna;
                if (!ganoPorAhora) { gano = false}  

   
            }
        }
        if (gano) {
            alert('ganó!');
        }
    },
    moverFichaFilaColumna: function(ficha) {
        console.log(this.filas[2][2]); // null
        var fila = this.espacioVacio.fila;
        var columna = this.espacioVacio.columna;
        ficha.dom.animate({
            'left': columna * 200 + 'px',
            'top': fila * 200 + 'px'
        }, 200);
        this.filas[fila][columna] = ficha;
        console.log(this.filas[2][2]); // ficha movida
    },
    guardarEspacioVacio: function(fila, columna) {
        console.log(this.filas[1][2]); // ficha
        this.espacioVacio.fila = fila;
        this.espacioVacio.columna = columna;
        this.filas[fila][columna] = null;
        console.log(this.filas[1][2]); // null
    },
    intercambiarPosicionConEspacioVacio: function(fila, columna) {
        var ficha = this.filas[fila][columna];

        this.moverFichaFilaColumna(ficha);
        this.guardarEspacioVacio(fila, columna);
        this.chequearSiGano();
    },
    moverHaciaAbajo: function() {
        if (this.espacioVacio.fila === 0) {
            return;
        }
        var filaOrigen = this.espacioVacio.fila - 1;
        var columnaOrigen = this.espacioVacio.columna;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaArriba: function() {
        if (this.espacioVacio.fila === this.filas.length - 1) {
            return;
        }
        var filaOrigen = this.espacioVacio.fila + 1;
        var columnaOrigen = this.espacioVacio.columna;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaLaDerecha: function() {
        if (this.espacioVacio.columna === 0) {
            return;
        }
        var filaOrigen = this.espacioVacio.fila;
        var columnaOrigen = this.espacioVacio.columna - 1;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaLaIzquierda: function() {
        if (this.espacioVacio.columna === this.filas[0].length - 1) {
            return;
        }
        var filaOrigen = this.espacioVacio.fila;
        var columnaOrigen = this.espacioVacio.columna + 1;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    capturarTeclas: function() {
        var that = this;

        var keyListener = function(event) {
            switch (event.which) {
                case 37:
                    that.moverHaciaLaIzquierda();
                    break;
                case 38:
                    that.moverHaciaArriba();
                    break;
                case 39:
                    that.moverHaciaLaDerecha();
                    break;
                case 40:
                    that.moverHaciaAbajo();
                    break;
                default:
                    console.log("Tecla invalida");
                    break;
            }
        };

        $(document).keydown(keyListener);
    }
};

$(document).ready(function() {
    juego.iniciar($('#juego'));
});