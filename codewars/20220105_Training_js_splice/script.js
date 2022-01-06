// https://www.codewars.com/kata/572cb264362806af46000793/train/javascript

// My solution:
const arr1 = [1, 3, 5, 2, 4, 6, 7, 7, 7];
const arr2 = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6];

function threeInOne(arr) {
	let sum = 0;
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		if ((i + 1) % 3 !== 0) sum += arr[i];
		if ((i + 1) % 3 === 0) {
			sum += arr[i];
			result.push(sum);
			sum = 0;
		}
	}
	return result;
}

console.log(threeInOne(arr1));
console.log(threeInOne(arr2));
console.log('****************************');

// -------------------------------
// Alternative solution No.1:
const threeInOneV1 = arr =>
	[...Array(arr.length / 3)].map((_, idx) =>
		arr.slice((idx *= 3), idx + 3).reduce((pre, val) => pre + val)
	);
console.log(threeInOneV1(arr1));
console.log(threeInOneV1(arr2));
console.log('****************************');

// -------------------------------
// Alternative solution No.2:
function threeInOneV2(arr) {
	var result = [];
	for (var i = 0; i < arr.length; i += 3) {
		result.push(arr[i] + arr[i + 1] + arr[i + 2]);
	}
	return result;
}

console.log(threeInOneV2(arr1));
console.log(threeInOneV2(arr2));
console.log('****************************');
