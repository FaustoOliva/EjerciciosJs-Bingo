//Ahora usen la función filter()

let numeros2 = [11, 33, 2, -1, 110, 99, 8];
//Filtra el vector con la condicion "% 2 != 0" y pone los numeros true al vector 
let numerosImpares2 = numeros2.filter(numeros2 => numeros2 % 2 != 0);

//Ordena el vector de mayor a menor
numerosImpares2.sort(function(a, b){return b - a});

console.log(numerosImpares2[1]);