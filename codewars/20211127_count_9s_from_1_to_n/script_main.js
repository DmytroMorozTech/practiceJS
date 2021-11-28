// https://www.codewars.com/kata/55143152820d22cdf00001bb

const mp = {};
function fillMapWithValues() {
	mp[9] = 1;
	for (let i = 9; i < 100000000000000; i = 10 * i + 9) {
		mp[10 * i + 9] = mp[i] * 10 + (i + 1);
	}
}

function number9(n) {
	let answer = 0;
	if (n < 9) return 0;
	if (n === 9) return 1;

	let temp = n;
	let divisor = 1;

	while (parseInt(temp / 10)) {
		temp /= 10;
		divisor *= 10;
	}

	let first_digit = parseInt(n / divisor);
	let rem = n % divisor;

	answer += mp[divisor - 1] * first_digit;
	answer += first_digit === 9 ? rem + 1 : 0;
	answer += number9(rem);
	return answer;
}

fillMapWithValues();

console.log(number9(999)); // expected output: 300
console.log(number9(1234)); // expected output: 343
console.log(number9(10000)); // expected output: 4'000
console.log(number9(1000000)); // expected output: 600'000
console.log(number9(10000000)); // expected output: 7'000'000
console.log(number9(10000000000)); // expected output: 10'000'000'000
// for the number of 10 billions (10 * 10^9) the quantity of "9"s in this range ([0 - 10*10^9]) will be equal to 10 billions.
