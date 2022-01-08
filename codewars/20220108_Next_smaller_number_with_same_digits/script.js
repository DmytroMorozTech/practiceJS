// https://www.codewars.com/kata/5659c6d896bc135c4c00021e

/**
 * This function takes a positive integer and returns the next smaller positive integer containing the same digits.
 * @param {number} n
 * @returns {number}
 */
function nextSmaller(n) {
	const num = n
		.toString()
		.split('')
		.map(n => parseInt(n));
	const res = [];

	while (next_permutation_smaller(num)) {
		if (parseInt(num[0]) === 0) continue;
		const newPermutation = parseInt(num.join(''));
		res.push(newPermutation);
		break;
	}

	return res.length !== 0 ? res[0] : -1;
}

function next_permutation_smaller(p) {
	for (let a = p.length - 2; a >= 0; --a) {
		if (p[a] > p[a + 1]) {
			for (let b = p.length - 1; ; --b) {
				if (p[b] < p[a]) {
					let t = p[a];
					p[a] = p[b];
					p[b] = t;
					for (++a, b = p.length - 1; a < b; ++a, --b) {
						t = p[a];
						p[a] = p[b];
						p[b] = t;
					}
					return true;
				}
			}
		}
	}
	return false;
}

console.log(nextSmaller(970)); // 907
console.log(nextSmaller(9772)); // 9727
console.log(nextSmaller(999)); // -1
console.log(nextSmaller(100342)); // 100324
console.log(nextSmaller(9414)); // 9144
