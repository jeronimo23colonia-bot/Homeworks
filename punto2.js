x = prompt('Ingrese un numero: ');
elige = prompt('Elija una opcion (1 o 2): ');
if (elige == '1') {
    impar1(x);
} 
else if (elige == '2') {
    impar2(x);
}

function impar1 (x) {
    if (x % 2 !== 0) {
        return true;
    }    
    return false;
}

const impar2 = (x) => {
    if (x % 2 !== 0) {
        return true;
    }       
    return false;
}

console.log(impar1(6)); 
console.log(impar2(4)); 