// https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5
// My solution:
const units = {
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
	eleven: 11,
	twelve: 12,
	thirteen: 13,
	fourteen: 14,
	fifteen: 15,
	sixteen: 16,
	seventeen: 17,
	eighteen: 18,
	nineteen: 19,
};

const tens = {
	ten: 10,
	twenty: 20,
	thirty: 30,
	fourty: 40,
	forty: 40,
	fifty: 50,
	sixty: 60,
	seventy: 70,
	eighty: 80,
	ninety: 90,
};

/**
 *  This function allows us to convert a string into an integer.
 *  (i.e. one hundred and seventy-five -> 175; 'zero' -> 0; 'million' -> 1000000)
 * @param {string} string A string that declares some number in the range [0,1000000], represented in words.
 * @returns A number that represents the one, encoded with words in given string.
 */
function parseInt(string) {
	if (string.includes('million')) return 1000000;
	if (string.includes('zero')) return 0;
	const str2 = string.replace(new RegExp(' and', 'g'), '');
	// here we get a string where word "and" is totally removed from it
	const containsThousands = str2.includes('thousand');
	if (containsThousands) {
		const arr = str2.split('thousand');
		let nOfThousands = 0;

		const thousandIsTheLastWordInStr = isLastWordInStr(str2, 'thousand');
		if (thousandIsTheLastWordInStr) {
			const strWithoutWordThousand = str2.slice(0, str2.lastIndexOf('thousand'));
			nOfThousands = recognize3Digits(strWithoutWordThousand);
			return nOfThousands * 1000;
		}

		nOfThousands = recognize3Digits(arr[0]); // thousands
		const second3Digits = recognize3Digits(arr[1]); // hundreds
		return nOfThousands * 1000 + second3Digits;
	}

	// If we arrived here, means that str doesn't contain word "thousand",
	// which accordingly suggests that incoming number is within range [0-999].
	// Therefore we will use function recognize3Digits(str) and return the result of it's execution.
	return recognize3Digits(str2);
}

function recognize3Digits(s) {
	const str = s.trim();
	if (str.length === 0) return 0;

	const containsHundreds = str.includes('hundred');
	//if the string doesn't contain word 'hundred' then it should be recognized as a 2-digit string
	if (!containsHundreds) return recognize2DigitNumber(str);

	const hundredIsTheLastWordInStr = isLastWordInStr(str, 'hundred');
	const splitString = str.split('hundred');
	const numberOfHundreds = splitString[0].trim();
	if (hundredIsTheLastWordInStr) return units[numberOfHundreds] * 100;

	const strAfterWordHundred = splitString[1].trim();
	const twoDigitNumber = recognize2DigitNumber(strAfterWordHundred);
	return units[numberOfHundreds] * 100 + twoDigitNumber;
}

// recognize a 2-digit number, representedby a string (range[11-99])
function recognize2DigitNumber(s) {
	const str = s.trim();
	if (str.includes('-')) {
		const arr = str.split('-');
		const tensDigit = arr[0];
		const unitsDigit = arr[1];
		const result = tens[tensDigit] + units[unitsDigit];
		return result;
	}
	return units[str] || tens[str];
}

function isLastWordInStr(str, word) {
	const lastIndexOfWord = str.lastIndexOf(word);
	return str.length === lastIndexOfWord + word.length;
}

console.log(parseInt('one')); // 1
console.log(parseInt('two')); // 2
console.log(parseInt('three')); // 3
console.log(parseInt('ten')); // 10
console.log(parseInt('eleven')); // 11
console.log(parseInt('twelve')); // 12
console.log(parseInt('nineteen')); // 19
console.log(parseInt('twenty')); // 20
console.log(parseInt('seventy')); // 70
console.log(parseInt('seventy-seven')); // 77
console.log(parseInt('ninety-five')); // 95
console.log(parseInt('one thousand')); // 1000
console.log(parseInt('seven hundred')); // 700
console.log(parseInt('seven hundred thirty')); // 730
console.log(parseInt('seven hundred and thirty-six')); // 736
console.log(parseInt('five thousand')); // 5000
console.log(parseInt('five hundred and eighty-three thousand')); // 583000
console.log(parseInt('five hundred and eighty-three thousand one hundred and eighty-three')); // 583183
console.log(parseInt('seven hundred and seventy-five thousand seven hundred and fifty-seven')); // 775757
console.log(parseInt('seven hundred and ninety-two thousand three hundred and ninety-seven')); // 792397
console.log(parseInt('two hundred forty-six')); // 246
console.log(parseInt('seven hundred thousand')); // 700000
