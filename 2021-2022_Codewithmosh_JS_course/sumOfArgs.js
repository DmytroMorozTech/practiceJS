// create a function that will calculate the sum of all arguments
// there might be an arbitrary number of arguments
// at the same time we should deal with the case, whenv there is only 1 argument: an array with numbers

function sumOfArgs(...items) {
	if (items.length == 1 && Array.isArray(items[0])) {
		items = [...items[0]];
	}
	return items.reduce((prev, val) => +prev + val, 0);
}

console.log(sumOfArgs([2, 5, 7, 2]));
