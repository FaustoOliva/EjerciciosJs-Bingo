//Duplicar(concat()) el array anterior y aplicarle la función raíz a todos los elementos, 
//obteniendo como resultado(push()); [{original 9; modificado 3}], {..}]
 
const data = [
    2, 3, 5, 12, 54, 5, -1, 0, 4, 23, 66, 7
];
const data2 = data.concat(data); //[1,2,3]-->[1,2,3,1,2,3]
let arrayFinal=[];

 
for (let i = 0; i < data2.length; i++) {
   
    const squareRoot = Math.sqrt(data2[i]).toFixed(2); //Limita el numero a dos decimales 
    const rounded = Math.round(squareRoot*100)/100; // Lo convierte en número
    //const rounded = Number(squareRoot);
    //const rounded = parseFloat(squareRoot);
    //const rounded = number(squareRoot);
    
    if(!isNaN(rounded)){ //No llama cuando el número es negativo
        arrayFinal.push({
            original: data2[i], 
            modificado: rounded 
        });
    }
}  
console.log(arrayFinal);