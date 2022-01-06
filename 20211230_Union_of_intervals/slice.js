// practicing with method Array.prototype.slice()

const myl = [
	[0, 2],
	[3, 6],
	[7, 7],
	[9, 12],
];
const interval = [1, 8];

console.log(myl.slice(0, -1)); // [ [ 0, 2 ], [ 3, 6 ], [ 7, 7 ] ]
// we are slicing all elements from the initial array, except the last one

console.log(myl.slice(1)); // [ [ 3, 6 ], [ 7, 7 ], [ 9, 12 ] ]
// we are slicing all elements from the initial array, except the first one
// the starting index for slicing procedure is specified as one; no end index,
// so the method .slice() will continue slicing the array from index 1 and until the very end
