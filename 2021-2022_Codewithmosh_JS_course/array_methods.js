const arr = [-1, 3, 6, 7, 10];

const allPositive = arr.every(elem => elem > 0);
const allNegative = arr.every(elem => elem < 0);
const somePositive = arr.some(elem => elem > 0);
const someNegative = arr.some(elem => elem < 0);

console.log(`allPositive: ${allPositive}`); // allPositive: false
console.log(`allNegative: ${allNegative}`); // allNegative: false
console.log(`somePositive: ${somePositive}`); // somePositive: true
console.log(`someNegative: ${someNegative}`); // someNegative: true
