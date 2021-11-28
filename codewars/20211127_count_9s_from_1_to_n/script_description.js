// https://www.codewars.com/kata/55143152820d22cdf00001bb

const mp = {};
function fillMapWithValues() {
	mp[9] = 1;
	for (let i = 9; i < 100000000000000; i = 10 * i + 9) {
		mp[10 * i + 9] = mp[i] * 10 + (i + 1);
	}
}

// the function fillMapWithValues is needed to create an object, that will store the precalculated amount of "9"s in range of tens, hundreds, thousands, etc.
// it will look something like that:
// 	{
//   '9': 1,
//   '99': 20,
//   '999': 300,
//   '9999': 4000,
//   '99999': 50000,
//   '999999': 600000,
//   '9999999': 7000000,
//   '99999999': 80000000,
//   '999999999': 900000000,
//   '9999999999': 10000000000,
//   '99999999999': 110000000000
// }

// therefore having such object will allow us to use these "cached" values in forthcoming calculations;
// and this will allow us to achieve complexity of algorithm of O(log n)
// Of course, we could use some naive approach and iterate through all numbers within given range, checking each number
// for how many "9"s there are in it. But this would result into O(n) complexity, whic is by far not as efficient as O(log n)

function number9(n) {
	fillMapWithValues();

	let answer = 0;
	if (n < 9) return 0;
	if (n === 9) return 1;

	let temp = n;
	let divisor = 1;

	// trying to find the maximum divisor for current n
	while (parseInt(temp / 10)) {
		temp /= 10;
		divisor *= 10;
	}

	// having maximum divisor "in hand" we are able to get the first digit of the number
	let first_digit = parseInt(n / divisor);
	// we can get the remainder of number (what remains from number after we remove the first digit from it)
	let rem = n % divisor;

	// we increment the answer variable by the nuber of "9"s, that will be brought up by the first digit in number
	// for example, we have number 912;
	// first_digit = parseInt(912/100) = 9;
	// rem = 912%100 = 12;
	// mp[divisor - 1] * first_digit = mp [100-1] * 9 = mp[99] * 9 = 20 * 9 = 180;
	answer += mp[divisor - 1] * first_digit;

	// above we have calculated how many "9"s are contributed to the answer by the first_digit
	// so 9 hundreds will add 180 "9"s to the answer, because each hundred adds 20 "9"s
	// But what if the first_digit itself is also 9 ? This means that we should also add such rule:
	answer += first_digit === 9 ? rem + 1 : 0;
	// it will take into account all those nines that are present in numbers 900,901,902,903,904,905,906,907,908,909,910,911,912
	// and if we count them according to the formula in place (rem + 1), then we'll find out that there are exactly 13 of them (12 + 1)

	// we should also pass the remainder for another round of calculations recursively
	answer += number9(rem);

	// after all recursive calculations are finished -> the function will return the final result
	// which is "number of 9s within given positive range of numbers"
	return answer;
}

console.log('This script contains description of the algorithm');
console.log(number9(999)); // expected output: 300
console.log(number9(1234)); // expected output: 343
console.log(number9(10000)); // expected output: 4'000
console.log(number9(1000000)); // expected output: 600'000
console.log(number9(10000000)); // expected output: 7'000'000
console.log(number9(10000000000)); // expected output: 10'000'000'000
// for the number of 10 billions (10 * 10^9) the quantity of "9"s in this range ([0 - 10*10^9]) will be equal to 10 billions.
