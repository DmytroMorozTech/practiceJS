function sumFromString(str) {
	const foundNumbers = str.match(/\d+/g);
	if (str.length === 0 || foundNumbers.length === 0) return 0;
	return foundNumbers.reduce((prev, val) => prev + +val, 0);
}

const str = "In 2015, I want to know how much does iPhone 6+ cost? 500 USD or more?";
console.log(sumFromString(str)); // 2521

// Not my solution:
function sumFromStringAlternative(str) {
	return (str.match(/\d+/g) || []).map(Number).reduce((a, b) => a + b, 0);
}
