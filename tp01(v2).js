const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/Aleatorie", function (req, res) {
    console.log(req.body);
    res.send([Math.round(Math.random() * (req.body.numero - 1) + 1)]);
})

let cartones = [];

const CrearVector = () => {
    const vectorNumeros = [];
    for (let index = 1; index < 101; index++) {
        vectorNumeros.push(index);

    }
    return vectorNumeros;
}

const CrearCarton = () => {
    let numeros = 15;
    let carton = [];
    let vectDecenas = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    let CantDecenas = 11
    let decenasElegidas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let j = 1;
    Vector = CrearVector();

    for (let index = 0; index < vectDecenas.length; index++) {
        if (index != 10) {
            Rnd = Math.round(Math.random() * (vectDecenas[j] - vectDecenas[index]) + vectDecenas[index]);
            if (Vector[Rnd - 1] != -1) {
                carton.push(Vector[Rnd - 1]);
                Vector[Rnd - 1] = -1;
            }
            j = j + 1;
        }
    }

    for (let h = 0; h < (decenasElegidas.length / 2); h++) {
        while (carton.length != 15) {
            RndDec = Math.round(Math.random() * (CantDecenas - 1) + 1);
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

cantCartones = 0;

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

let nombres = [];

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

const validarVacio = (cartones) => {
    for (let index = 0; index < cartones.length; index++) {
        carton = cartones[index]
        let contador = 0;
        for (let j = 0; j < carton.length; j++) {
            if (carton[j] == -1) {
                contador = contador + 1;
            }
            if (contador == 10) {
                return index
            }
        }

    }
    return -1;
}

const SacarBolilla = (vect) => {
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

const Juego = () => {
    while (validarVacio(cartones) == -1) {
        Bolilla = SacarBolilla(VectBolilla);
        for (let index = 0; index < cantCartones; index++) {
            carton = cartones[index]
            for (let j = 0; j < 10; j++) {
                console.log(`Bolilla ${Bolilla}`);
                if (carton[j] === Bolilla) {
                    carton[j] = -1;
                }
            }
            console.log(carton);
        }
    }
    return cartones;
}

app.get('/SacarNumero', function (req, res) {
    VectBolilla = CrearVector();
    Juego();
    if (validarVacio(cartones) > nombres.length) {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}, el carton quedó vacante. Fracasados`)
    } else {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}, jugador ${nombres[validarVacio(cartones)]}`);
    }

});

app.get('/JugarContinuo', function (req, res) {
    cartonesInternos = cartones
    VectBolilla = CrearVector();
    while (validarVacio(cartones) == -1) {
        Bolilla = SacarBolilla(VectBolilla);
        for (let index = 0; index < cantCartones; index++) {
            carton = cartonesInternos[index]
            for (let j = 0; j < 10; j++) {
                console.log(`Bolilla ${Bolilla}`);
                if (carton[j] === Bolilla) {
                    carton[j] = -1;
                }
            }
            console.log(carton);
        }
    }
    if (validarVacio(cartones) > nombres.length) {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}, el carton quedó vacante. Fracasados`)
    } else {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}, jugador ${nombres[validarVacio(cartones)]}`);
    }


});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

