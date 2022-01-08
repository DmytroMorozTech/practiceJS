// https://www.codewars.com/kata/57bd0abcb9799763f1001bdc/train/javascript

function max(array) {
	if (array.length === 0) return -Infinity;
	if (array.length === 1) return array[0];
	const firstElem = array[0];
	const remainingArr = array.slice(1);
	return firstElem > max(remainingArr) ? firstElem : max(remainingArr);
}
