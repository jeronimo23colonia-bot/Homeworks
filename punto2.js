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

console.log(impar1(1)); 
console.log(impar2(4)); 