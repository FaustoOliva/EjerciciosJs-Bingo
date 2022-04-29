const CrearVector = () => {
    const vectorNumeros = [];
    for (let index = 1; index < 100; index++) {
        vectorNumeros.push(index);

    }
    return vectorNumeros;
}

const SacarBolilla = (vect) => {
    let Rnd;  
    let bolilla;
       
    do {
        Rnd = (Math.round(Math.random() * (99 - 1) + 1));
        if (vect[Rnd] != -1) {
            bolilla = vect[Rnd];
            vect[Rnd] = -1;
            console.log(bolilla)
        } else{bolilla = -1; console.log(bolilla)}
        
    } while (bolilla<0);

    return bolilla;
   

}


vectBolilla = CrearVector();
let Bolilla = [];

for (let index = 1; index < 100; index++) {

    Bolilla.push(SacarBolilla(vectBolilla));
    
}
    console.log(`Bolillero ${Bolilla}`)

