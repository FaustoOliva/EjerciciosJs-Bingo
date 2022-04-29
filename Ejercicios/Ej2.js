//Dado el array multiplicar todos sus valores por el que se encuentra en la posicion anterior 
//menos al siguiente, sin modificar el array original

// typeof es un operador que devuelve el tipo de dato que es
// (true/false) ? true : false;  es como un if y un else en una linea
const data = [
    2, 3, 5, 12, 54, 5, -1, 0, 4, 23, 66, 7
]
 
const NumMultiplicado =[];
 
for (let i = 0; i < data.length; i++) {
    if(i == 0){
    NumMultiplicado[i] = data[i] * 0 - data[i+1]; 
    }else if((data.length-1) == i){
        NumMultiplicado[i] = data[i] * data[i-1] - 0; 
    }else{
        NumMultiplicado[i] = data[i] * data[i-1] - data[i+1];
    }
    
    console.log(NumMultiplicado[i]);
}
