//Calcular los años bisietos que habrá antes de 2150

let arrayBisiestos=[];

for (let index = 2022; index < 2150; index++) {
   if(index % 4 == 0){
    arrayBisiestos.push(index);
   }
    
}
console.log(arrayBisiestos);