// Situation 1
let numbers1 = [1, 2, 3, 4];
let another = numbers1;

numbers1.length = 0;
// in this way we are truncating the array and all elems that were stored in this array
// will be removed from computer memory

console.log(another);
console.log(numbers1);

// Situation 2
let numbers1 = [10, 11, 12, 13, 14, 15];
let another1 = numbers1;
numbers1 = [];
console.log(`numbers1: ${numbers1}`);
console.log(`another1: ${another1}`);
//Expected output:
// numbers1:
// another1: 10, 11, 12, 13, 14, 15;

// This means that we managed to reassign reference of numbers1. Now it is pointing
// to an empty array in computer memory.
// But at that moment there already was a reference to numbers1 array (on the heap)
// from another variable -> another1
// And as we see in the console.log output, another1 variable is still referencing the same
// array [10, 11, 12, 13, 14, 15], which is still stored on the heap.
