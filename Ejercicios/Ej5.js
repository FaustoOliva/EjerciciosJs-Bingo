//Cuantas cartas con número par y negras hay en una baraja de poker

const palos =["corazon","diamante","trebol","pique"];
const figuras =["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J","Q","K"];

const mazo=[];

for(const palo of palos){
    
    const color = palo === "corazon" || palo === "diamante" ? "Negro" : "Rojo"
    
    for(const figura of figuras){
        mazo.push({
            palo, 
            figura,
            color
        });
    }
}

console.log(mazo);
let count = 0;

for(const carta of mazo){
    if(carta.color ==="Negro" && carta.figura % 2 === 0){
        count++;
    }
}

console.log(`Existen ${count} cartas par y negras`);
//Eliminar 6 cartas de la baraja al azar y calcular en promedio(haciendo 1000 iterracciones)
//cuanto valen las cartas(con número) que quedan.

const cartaAlAzar = (mazo) => Math.round(Math.random() * mazo.length);
const rnd1 = cartaAlAzar(mazo);

const eliminadas=[];

for (let index = 0; index < 6; index++) {
    eliminadas.push(cartaAlAzar(mazo));
    
}

console.log(eliminadas);

console.log(`Se eliminan las cartas ${JSON.stringify(eliminadas)}`)

let suma = 0;
count = 0;

for (let index = 0; index < mazo.length; index++) {
    const carta = mazo[index];
    
    if(!eliminadas.includes(carta.figura) && typeof carta.figura==="number"){
        count ++;
        suma += carta.figura;
    }
}
const promedio = suma /count;

const limites = 1000;
let promedioTotal;

for (let index = 0; index < limites; index++) {
    suma += promedio;
    promedioTotal = suma / limites;
}

console.log(`El promedio es ${promedioTotal}`);