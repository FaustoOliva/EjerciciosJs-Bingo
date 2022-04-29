const CrearVector =()=>{
    const vectorNumeros = [];
    for (let index = 1; index < 100; index++) {
        vectorNumeros.push(index); 
        
    }
    return vectorNumeros;
}

let carton = [];
Vector = CrearVector();
while(carton.length != 10) {
    Rnd = Math.round(Math.random() * (99 - 1) + 1);
    if(Vector[Rnd] != -1){
    carton.push(Vector[Rnd]);
    Vector[Rnd] = -1;
    }
    
}
console.log(Vector, carton)