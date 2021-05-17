// TASK 1
// You are given an array with String values that represent the names of different fruits.
// Some fruits may be repeated in this array for many times.
// Expected output: an array with unique names of fruits sorted based on the quantity of fruits (Descending order);

function task1() {
	let words = [
		'banana',
		'grapefruit',
		'banana',
		'qiwi',
		'grapefruit',
		'banana',
		'orange',
		'banana',
		'qiwi',
		'qiwi',
		'qiwi',
		'qiwi',
	];

	let hashMap = {};
	for (let word of words) {
		hashMap[word] = hashMap[word] + 1 || 1;
	}
	// console.log(hashMap);

	let result = Object.entries(hashMap) // we get an array of entries here -> [[key,value], [key, value],...]
		.sort((e1, e2) => e2[1] - e1[1]) // sort entries based on their values (Descending order)
		.map(e => e[0]); // convert entry into it's key
	console.log(result);
	return result;
}

// task1();

//--------------------------------------------------------
// TASK 2
// There is a function multiplyByTwo(1,2,3,4,5,6)
// Please create a function that will return an array of numbers that represents those args, that were passed to this
// function, but they should be multiplied by two! Number of argguments may vary.

function task2() {
	function multiplyByTwo(...args) {
		return args.map(elem => elem * 2);
	}

	return multiplyByTwo(1, 2, 3, 4, 5, 6);
}

// console.log(task2());

//--------------------------------------------------------
// TASK 3
// You should write function sum
// function sum() {...some code here}
// so that this function could be run in as follows: sum(5)(7);

function sum(a) {
	return function (b) {
		return a + b;
	};
}

// console.log(sum(5)(7)); // 12

//--------------------------------------------------------
// TASK 4
// We should write a function with such signature:
// function(a,b,op){...some code here}
// This function should take two numbers and some function op.
// Expected output: result of execution of op function with args: a,b.

function add(a, b) {
	return a + b;
}

function multiply(a, b) {
	return a * b;
}

function subtract(a, b) {
	return a - b;
}

function task4(a, b, op) {
	return op(a, b);
}

// console.log(task4(3, 5, multiply)); // expected output: 15

//--------------------------------------------------------
// TASK 5
// You should write a function thath will be called like that:
// calculate(sum)(4)(10); // 14
// calculate(mul)(4)(10); // 40

function task5() {
	let sumTask5 = (a, b) => a + b;
	let multiplyTask5 = (a, b) => a * b;

	function calculate(callBackFunc) {
		return a => {
			return b => {
				return callBackFunc(a, b);
			};
		};
	}

	console.log(calculate(sumTask5)(4)(10)); // 14
	console.log(calculate(multiplyTask5)(4)(10)); // 40
}

// task5();

//--------------------------------------------------------
// TASK 6
// You should write function sum
// function sum() {...some code here}
// so that this function could be run in as follows: sum(1)(2)(3)(4)();
// Number of args that we pass with new function calls may vary.
// In order to stop taking new args we will call this function with empty parentheses  -> ()
// sum(1)(2)(3)(4)();

function sumTask6(a) {
	let currentSum = a;

	function f(b) {
		if (!b) return currentSum;

		currentSum += b;
		return f;
	}

	return f;
}

console.log(sumTask6(1)(2)(3)(4)()); // 10
