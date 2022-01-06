// Puzzle: by starting from number 1 and repeatedly either adding 5 or multiplying by 3
// we should try to find the sequence of additions and multiplications that produce that number.

function findSolution(target) {
	function find(current, history) {
		if (current == target) return history;
		else if (current > target) return null;
		else {
			return find(current + 5, `(${history} + 5)`) || find(current * 3, `${history} * 3`);
		}
	}
	return find(1, '1');
}

console.log(findSolution(124)); //(((((1 + 5) + 5) * 3 + 5) * 3 + 5) + 5)
console.log(findSolution(62)); //(((1 * 3 * 3 + 5) + 5) * 3 + 5)
