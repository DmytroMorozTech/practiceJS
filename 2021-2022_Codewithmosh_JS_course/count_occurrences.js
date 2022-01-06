const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 4, 3, 4, 5, 3];

function getMax(array, searchElement) {
	return array.reduce((acc, elem) => {
		return elem === searchElement ? acc + 1 : acc;
	}, 0);
}

const count3 = getMax(numbers, 3); // 4
console.log(count3);

const count5 = getMax(numbers, 5); // 2
console.log(count5);

const count2 = getMax(numbers, 2); // 1
console.log(count2);
