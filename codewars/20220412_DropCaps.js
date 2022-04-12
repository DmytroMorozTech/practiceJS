// https://www.codewars.com/kata/559e5b717dd758a3eb00005a/javascript

// My solution
function dropCap(n) {
	const res = n.replace(/\w{3,}/g, word => word[0].toUpperCase() + word.slice(1).toLowerCase());
	return res;
}

const inputArr = ["apple", "apple of banana", "one space", "     space WALK      "];
console.log(inputArr.map(dropCap));

//----------------------------------------------------------------------------------------------
// Not my solution:
const dropCapAlternative = n =>
	n.replace(/\b([a-z])([a-z]{2,})/gi, (match, $1, $2) => $1.toUpperCase() + $2.toLowerCase());

// Let's consider params of this function:
// (match, $1, $2) => $1.toUpperCase() + $2.toLowerCase())
// param1 - matched item;
// param2,param3,... - The nth string found by a parenthesized capture group
