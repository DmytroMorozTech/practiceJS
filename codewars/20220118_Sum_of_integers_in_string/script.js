// https://www.codewars.com/kata/598f76a44f613e0e0b000026
// Your task in this kata is to implement a function that calculates
// the sum of the integers inside a string. For example, in the string
// "The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog", the sum of the integers is 3635.

const text = 'The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog';
// const calc = 30 + 20 + 10 + 1203 + 914 + 3 + 1349 + 102 + 4; // expected calculations

// My solution
function sumOfIntegersInString(s) {
	const matches = s.match(/(\d+)/g);
	return !matches || matches.length === 0
		? 0
		: matches.length === 1
		? +matches[0]
		: matches.reduce((a, b) => parseInt(a) + parseInt(b));
}

// Alternative solution No.1
function sumOfIntegersInStringAlt1(s) {
	return s
		.replace(/\D/gi, ' ')
		.split(' ')
		.map(value => Number(value))
		.reduce((a, b) => a + b);
}

// Alternative solution No.2
function sumOfIntegersInStringAlt2(s) {
	return (s.match(/\d+/g) || []).reduce((s, n) => s + +n, 0);
}

console.log(sumOfIntegersInString(text)); //3635
console.log(sumOfIntegersInStringAlt1(text)); //3635
console.log(sumOfIntegersInStringAlt2(text)); //3635

// My alternative solution without using regex
function sumOfIntegersInStringNoRegex(s) {
	const startInts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const charArr = [...s];
	let temp = '';
	let result = 0;

	for (let i = 0; i < charArr.length; i++) {
		let currentChar = charArr[i];
		let isCurrentCharInInts = startInts.includes(parseInt(currentChar));

		if (!temp && isCurrentCharInInts) {
			temp = temp.concat(currentChar);
			continue;
		}
		if (temp && (isCurrentCharInInts || +currentChar === 0)) {
			temp = temp.concat(currentChar);
			continue;
		}

		if (temp && !isCurrentCharInInts) {
			const newlyFoundNumber = parseInt(temp);
			// console.log(`newlyFoundNumber: ${newlyFoundNumber}`);
			result += newlyFoundNumber;
			temp = '';
			// console.log(`Result: ${result}`);
		}
	}

	return result;
}

console.log(sumOfIntegersInStringNoRegex(text)); //3635
