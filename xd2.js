const CrearVector = () => {
    const vectorNumeros = [];
    for (let index = 1; index < 101; index++) {
        vectorNumeros.push(index);

    }
    return vectorNumeros;
}

let numeros = 15;
let carton = [];
let vectDecenas = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
let CantDecenas = 11
let decenasElegidas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let j = 1;
Vector = CrearVector();

    
for (let index = 0; index < vectDecenas.length; index++) {
    if(index!=10){
        Rnd = Math.round(Math.random() * (vectDecenas[j] - vectDecenas[index]) + vectDecenas[index]); 
        console.log(Rnd); 
        if (Vector[Rnd-1] != -1) {
            carton.push(Vector[Rnd-1]);
            Vector[Rnd-1] = -1;
        }
            
        j = j + 1;
    }
}
console.log(carton);
for (let h = 0; h < (decenasElegidas.length/2); h++) {
    console.log(h);
    while (carton.length != 15) {
        RndDec = Math.round(Math.random() * (CantDecenas - 1) + 1);
        console.log(RndDec);
        Rnd = Math.round(Math.random() * (vectDecenas[RndDec] - vectDecenas[RndDec-1]) + vectDecenas[RndDec-1]); 
        if (Vector[Rnd-1] != -1) {
        carton.push(Vector[Rnd-1]);
        Vector[Rnd-1] = -1;
        decenasElegidas[RndDec] = -1;

        }
    }

}
 
console.log(Vector);
    
console.log(carton);


