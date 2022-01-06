const numbers1 = [1, 2, 3, 4, 5];

// my own implementation of .includes() method in JS
function includes(array, number) {
	for (elem of array) if (elem === number) return true;
	return false;
}

console.log(includes(numbers1, 1));
