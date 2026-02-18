
// push()
let a1 = [1,2,3];
a1.push(4);
console.log("push():", a1);

// pop()
let a2 = [1,2,3];
let eliminado1 = a2.pop();
console.log("pop():", a2, "Eliminado:", eliminado1);

// shift()
let a3 = [1,2,3];
let eliminado2 = a3.shift();
console.log("shift():", a3, "Eliminado:", eliminado2);

// unshift()
let a4 = [2,3];
a4.unshift(1);
console.log("unshift():", a4);

// splice()
let a5 = [1,2,3,4];
a5.splice(1,2,"X","Y");
console.log("splice():", a5);

// sort()
let a6 = [5,1,4,2];
a6.sort((a,b)=>a-b);
console.log("sort():", a6);

// reverse()
let a7 = [1,2,3];
a7.reverse();
console.log("reverse():", a7);

// fill()
let a8 = [1,2,3,4];
a8.fill(0,1,3);
console.log("fill():", a8);

// copyWithin()
let a9 = [1,2,3,4,5];
a9.copyWithin(0,3);
console.log("copyWithin():", a9);

console.log("\n=== MÉTODOS QUE NO MODIFICAN ===");

// concat()
let b1 = [1,2];
let b2 = [3,4];
console.log("concat():", b1.concat(b2));

// slice()
let b3 = [1,2,3,4];
console.log("slice():", b3.slice(1,3));

// join()
let b4 = ["Hola","Mundo"];
console.log("join():", b4.join(" "));

// toString()
let b5 = [1,2,3];
console.log("toString():", b5.toString());

console.log("\n=== BÚSQUEDA ===");

// indexOf()
let c1 = [1,2,3,2];
console.log("indexOf():", c1.indexOf(2));

// lastIndexOf()
console.log("lastIndexOf():", c1.lastIndexOf(2));

// includes()
console.log("includes():", c1.includes(3));

// find()
console.log("find():", c1.find(x=>x>2));

// findIndex()
console.log("findIndex():", c1.findIndex(x=>x>2));

// findLast()
console.log("findLast():", c1.findLast(x=>x>1));

// findLastIndex()
console.log("findLastIndex():", c1.findLastIndex(x=>x>1));

console.log("\n=== RECORRIDO ===");

// forEach()
let d1 = [1,2,3];
d1.forEach((v,i)=>console.log("forEach:",i,v));

// map()
let d2 = [1,2,3];
console.log("map():", d2.map(x=>x*2));

// filter()
let d3 = [1,2,3,4];
console.log("filter():", d3.filter(x=>x%2===0));

// reduce()
let d4 = [1,2,3,4];
console.log("reduce():", d4.reduce((a,b)=>a+b,0));

// reduceRight()
console.log("reduceRight():", d4.reduceRight((a,b)=>a+b,0));

// some()
console.log("some():", d4.some(x=>x>3));

// every()
console.log("every():", d4.every(x=>x>0));

console.log("\n=== ITERADORES ===");

// keys()
let e1 = ["a","b","c"];
console.log("keys():",[...e1.keys()]);

// values()
console.log("values():",[...e1.values()]);

// entries()
for(let [i,v] of e1.entries()){
  console.log("entries():",i,v);
}

console.log("\n=== ESTÁTICOS ===");

// Array.isArray()
console.log("Array.isArray():", Array.isArray([1,2]));
console.log("Array.isArray():", Array.isArray("Hola"));

// Array.from()
console.log("Array.from():", Array.from("Hola"));

// Array.of()
console.log("Array.of():", Array.of(1,2,3));

console.log("\n=== MODERNOS ===");

// flat()
let f1 = [1,[2,[3]]];
console.log("flat():", f1.flat(2));

// flatMap()
let f2 = [1,2,3];
console.log("flatMap():", f2.flatMap(x=>[x,x*2]));

// at()
let f3 = [10,20,30];
console.log("at():", f3.at(-1));

console.log("\n=== PROPIEDADES ===");

let g1 = [1,2,3];
console.log("length:", g1.length);

console.log("\n=== MÉTODOS NUEVOS (INMUTABLES - ES2023) ===");

// toSorted()
let h1 = [3,1,2];
console.log("toSorted():", h1.toSorted((a,b)=>a-b));
console.log("Original:", h1);

// toReversed()
let h2 = [1,2,3];
console.log("toReversed():", h2.toReversed());
console.log("Original:", h2);

// toSpliced()
let h3 = [1,2,3,4];
console.log("toSpliced():", h3.toSpliced(1,2,"X"));
console.log("Original:", h3);

// with()
let h4 = [1,2,3];
console.log("with():", h4.with(1,99));
console.log("Original:", h4);

console.log("\n=== EJEMPLOS PRÁCTICOS ===");

// eliminar duplicados
let dup = [1,2,2,3,3];
console.log("Sin duplicados:", [...new Set(dup)]);

// agrupar
let productos = [
  {nombre:"Manzana",cat:"Fruta"},
  {nombre:"Zanahoria",cat:"Verdura"},
  {nombre:"Banana",cat:"Fruta"}
];
let agrupado = productos.reduce((acc,p)=>{
  if(!acc[p.cat]) acc[p.cat]=[];
  acc[p.cat].push(p.nombre);
  return acc;
},{});
console.log("Agrupado:", agrupado);

// rango
console.log("Rango:", Array.from({length:5},(_,i)=>i+1));

// máximo y mínimo
let nums = [5,2,8,1];
console.log("Max:", Math.max(...nums));
console.log("Min:", Math.min(...nums));
