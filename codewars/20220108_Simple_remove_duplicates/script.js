// My solution:
function solve(arr) {
	const elems = {};
	for (item of arr) {
		if (!elems[item]) {
			elems[item] = 1;
			continue;
		}
		elems[item]++;
	}
	const res = [];

	for (let i = 0; i < arr.length; i++) {
		const current = arr[i];
		if (elems[current] != 1) {
			elems[current]--;
			continue;
		}
		res.push(current);
	}
	return res;
}

const input = [3, 4, 4, 3, 6, 3];

console.log(solve(input));

// --------------------------------------------
// Much more elegant solution V1 (not mine):
function solve2(arr) {
	return arr.filter((val, i) => arr.lastIndexOf(val) == i);
}

// Much more elegant solution V2 (not mine):
function solve3(arr) {
	return [...new Set(arr.reverse())].reverse();
}
