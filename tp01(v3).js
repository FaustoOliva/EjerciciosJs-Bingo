const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

//Variables globales
let cartones = [];
const NUMEROS_EN_CARTONES = 15
let cantCartones = 0;
let nombres = [];


app.post("/Aleatorie", function (req, res) {
    console.log(req.body);
    res.send([Math.round(Math.random() * (req.body.numero - 1) + 1)]);
})

const CrearVector = () => { //Vector con los numeros disponibles del bingo
    const vectorNumeros = [];
    for (let index = 1; index < 101; index++) {
        vectorNumeros.push(index);

    }
    return vectorNumeros;
}

const CrearCarton = () => { //Crea el carton con los numeros disponibles del bingo y cumpliendo el extra '1'
    let carton = [];
    let vectDecenas = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    let CantDecenas = 11
    let decenasElegidas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let j = 1;
    Vector = CrearVector();

    for (let index = 0; index < vectDecenas.length; index++) { //Llena el carton con un solo numero correspondiente a cada decena (10)
        if (index != 10) {
            Rnd = Math.round(Math.random() * (vectDecenas[j] - vectDecenas[index]) + vectDecenas[index]);
            if (Vector[Rnd - 1] != -1) {
                carton.push(Vector[Rnd - 1]);
                Vector[Rnd - 1] = -1;
            }
            j = j + 1;
        }
    }

    for (let h = 1; h < (decenasElegidas.length / 2); h++) { //Llena los ultimos 5 lugares aleatoriamente de 5 decenas diferentes
        while (carton.length != NUMEROS_EN_CARTONES) {
            RndDec = Math.round(Math.random() * ((CantDecenas - 1) - 1) + 1);
            Rnd = Math.round(Math.random() * (vectDecenas[RndDec] - vectDecenas[RndDec - 1]) + vectDecenas[RndDec - 1]);
            if (Vector[Rnd - 1] != -1) {
                carton.push(Vector[Rnd - 1]);
                Vector[Rnd - 1] = -1;
                decenasElegidas[RndDec] = -1;
            }
        }
    }
    return carton;
}



app.post("/IniciarJuego", function (req, res) {
    console.log(req.body)
    let cartonesInternos = [];
    cantCartones = req.body.numero;
    for (let index = 0; index < cantCartones; index++) {
        cartonesInternos.push(CrearCarton());
    }
    res.send(cartonesInternos);
    cartones = cartonesInternos;
});



app.get('/ObtenerCarton/:nombre', function (req, res) {
    const nombre = req.params.nombre;
    nombres.push(nombre);
    console.log(nombres);
    i = nombres.length - 1;

    res.send(`El jugador le fue asignado un carton. El carton es ${cartones[i]}`);
});

app.get('/Cartones/:nombre?', function (req, res) {
    const nombre = req.params.nombre;
    console.log(nombre);
    if (nombre === undefined) {
        res.send(cartones);
    } else {
        console.log(nombres);
        let i = nombres.length - 1;

        res.send(`El jugador le fue asignado un carton. El carton es ${cartones[i]}`);
    }

});

const validarVacio = (Internos) => { //Valida cuando hay un ganador. Contando cuantos numeros salieron del carton, ya que los reemplazamos por '-1'
    for (let index = 0; index < Internos.length; index++) {
        carton = Internos[index]
        let contador = 0;
        for (let j = 0; j < carton.length; j++) {
            if (carton[j] == -1) {
                contador = contador + 1;
            }
            if (contador == NUMEROS_EN_CARTONES) {
                return index
            }
        }

    }
    return -1;
}

const SacarBolilla = (vect) => { //Con los numeros disponibles del bingo, saca numeros y los reemplaza por '-1', para que no vuelvan a salir
    let Rnd;
    let bolilla;
    do {
        Rnd = (Math.round(Math.random() * (99 - 1) + 1));
        if (vect[Rnd] != -1) {
            bolilla = vect[Rnd];
            vect[Rnd] = -1;
        } else { bolilla = -1 }

    } while (bolilla < 0);
    return bolilla;
}

const Juego = (Internos) => { //La logica del juego, llamando a las diferentes funciones
    while (validarVacio(Internos) == -1) {
        Bolilla = SacarBolilla(VectBolilla);
        for (let index = 0; index < cantCartones; index++) {
            carton = Internos[index]
            for (let j = 0; j < NUMEROS_EN_CARTONES; j++) {
                console.log(`Bolilla ${Bolilla}`);
                if (carton[j] === Bolilla) {
                    carton[j] = -1;
                }
            }
            console.log(Internos);
        }
    }
    return Internos;
}

app.get('/SacarNumero', function (req, res) {
    VectBolilla = CrearVector();
    Juego();
    if (validarVacio(cartones) > nombres.length - 1) {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}, el carton quedó vacante. Fracasados`)
    } else {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}, jugador ${nombres[validarVacio(cartones)]}`);
    }

});

app.get('/JugarContinuo', function (req, res) {
    cartonesInternos = cartones
    let internos;
    VectBolilla = CrearVector();
    internos = Juego(cartones);
    console.log("Internos " + cartonesInternos)
    console.log("Cartones " + cartones)
    console.log(internos)
    if (validarVacio(cartones) > nombres.length - 1) {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}[${cartonesInternos[validarVacio(cartones)]}], el carton quedó vacante. Fracasados`)
    } else {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}[${cartones[validarVacio(cartones)]}], jugador ${nombres[validarVacio(cartones)]}`);
    }


});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

