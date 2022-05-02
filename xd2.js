const CrearVector = () => {
    const vectorNumeros = [];
    for (let index = 1; index < 100; index++) {
        vectorNumeros.push(index);

    }
    return vectorNumeros;
}

let numeros = 15;
let carton = [];
let vectDecenas = [1, 9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 100]
Vector = CrearVector();

    for (let index = 0; index < vectDecenas.length; index++) {
        Rnd = Math.round(Math.random() * (vectDecenas[index+1] - vectDecenas[index]) + vectDecenas[index]); 
        console.log(Rnd); 
        if (Vector[Rnd] != -1) {
            carton.push(Vector[Rnd]);
            Vector[Rnd] = -1;
                       
        }
        index = index + 1;
    }
    
    

console.log(carton);



