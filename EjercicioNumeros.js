let numeros = [11, 33, 2, -1, 110, 99, 8];
let NumerosImpares = [];

//Recorre el vector y agrega los numeros impares a un nuevo vector
for (let i = 0; i < numeros.length; i++) {
    if(numeros[i] % 2 != 0){
        NumerosImpares[i] = numeros[i];    
    }
 
}

//Ordena el vector de mayor a menor
NumerosImpares.sort(function(a, b){return b - a});
    /*if(a<b){
        return 1;
    }
    if(a>B){
        return -1;
    }
    return 0;});*/
    

console.log(NumerosImpares[1]);

//

let numeros2 = [11, 33, 2, -1, 110, 99, 8];
//Filtra el vector con la condicion "% 2 != 0" y pone los numeros true al vector 
let numerosImpares2 = numeros2.filter(numeros2 => numeros2 % 2 != 0);

//Ordena el vector de mayor a menor
numerosImpares2.sort(function(a, b){return b - a});

console.log(numerosImpares2[1]);
