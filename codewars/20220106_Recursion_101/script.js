// https://www.codewars.com/kata/5b752a42b11814b09c00005d/train/javascript

// My solution:
function solve(a, b) {
	return a === 0 || b === 0 ? [a, b] : step2(a, b);
}

const step2 = (a, b) => (a >= 2 * b ? solve(a - 2 * b, b) : step3(a, b));
const step3 = (a, b) => (b >= 2 * a ? solve(a, b - 2 * a) : [a, b]);

// -----------------------------------
// Alternative solution (not mine):
const solveAlternative = (a, b) =>
	!a || !b ? [a, b] : a >= 2 * b ? solve(a - 2 * b, b) : b >= 2 * a ? solve(a, b - 2 * a) : [a, b];
