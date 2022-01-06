const numbers1 = [1, 2, 3, 4];
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Function creates a new array from initial array and moves 1 element with given index to a position,specified
 * with offset parameter. Due to that other array elements may be also be moved and re-indexed.
 * @param {Array.<number>} array
 * @param {*} index Index of element that has to be moved within array to another position.
 * @param {*} offset An offset, which defines where to move the element with given index.
 * If offset is positive - ascending direction (move to the right), if negative - descending direction(move to the left).
 * @returns {Array.<number>} Modified array with swapped elements
 */
function move(array, index, offset) {
	const copiedArr = [...array];
	if (offset === 0) return copiedArr;

	const position = index + offset;
	if (offset > 0) {
		if (position >= array.length || position < 0) {
			console.error('Out of bounds');
			return;
		}

		let ind = index;
		for (let i = 1; i <= offset; i++) {
			moveElement(copiedArr, ind, ind + 1);
			ind++;
		}
		return copiedArr;
	}

	if (offset < 0) {
		let ind = index;
		for (let i = 1; i <= Math.abs(offset); i++) {
			moveElement(copiedArr, ind, ind - 1);
			ind--;
		}
		return copiedArr;
	}
}

/**
 * This function takes an array of numbers and two indexes of elements in this array,
 * that have to be swapped.
 * @param {Array.<number>} arr An array in which two elements have to be swapped
 * @param {number} i1 Index of first array element
 * @param {number} i2 Index of second array element
 * @returns {Array.<number>} An array, where 2 elements with given indexes
 * have already been swapped
 */
function moveElement(arr, i1, i2) {
	const temp = arr[i2];
	arr[i2] = arr[i1];
	arr[i1] = temp;
	return arr;
}

console.log(move(numbers1, 1, 1)); // [1,3,2,4]
console.log(move(numbers2, 5, -3)); // [1,2,6,3,4,5,7,8,9,10]

//------------------------------------------------------------
// Another solution using method splice()
function moveUsingSplice(array, index, offset) {
	const output = [...array];
	const position = index + offset;

	//basic validation
	if (position >= array.length || position < 0) {
		console.error('Out of bounds');
		return;
	}

	const element = output.splice(index, 1)[0];
	output.splice(position, 0, element);
	return output;
}

console.log('*****************************');
console.log(moveUsingSplice(numbers1, 1, 1)); // [1,3,2,4]
console.log(moveUsingSplice(numbers2, 5, -3)); // [1,2,6,3,4,5,7,8,9,10]
