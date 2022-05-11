const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

//Variables globales
let cartones = [];
let cantCartones = 0;
let nombres = [];

app.post("/Aleatorie", function (req, res) {
    console.log(req.body);
    res.send([Math.round(Math.random() * (req.body.numero - 1) + 1)]);
})



const CrearVector = () => {
    const vectorNumeros = [];
    for (let index = 1; index < 100; index++) {
        vectorNumeros.push(index);

    }
    return vectorNumeros;
}

const CrearCarton = () => {
    let carton = [];
    Vector = CrearVector();
    while (carton.length != 10) {
        Rnd = Math.round(Math.random() * (99 - 1) + 1);
        if (Vector[Rnd] != -1) {
            carton.push(Vector[Rnd]);
            Vector[Rnd] = -1;
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
    cartones = Juego();
    if (validarVacio(cartones) > nombres.length - 1) {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}, el carton quedó vacante. Fracasados`)
    } else {
        res.send(`El carton ganador es ${validarVacio(cartones) + 1}, jugador ${nombres[validarVacio(cartones)]}`);
    }

});


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

