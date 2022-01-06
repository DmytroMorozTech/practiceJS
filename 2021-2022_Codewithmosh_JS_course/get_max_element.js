const numbers = [1, 2, 3, 4, 5, 19, -3, 1000, 99999, 1000000, 2, 3];

function getMax(array) {
	if (!array || array.length === 0) return undefined;

	return array.reduce((a, b) => (a > b ? a : b));
}

const max = getMax(numbers);
console.log(max); // 1000000
