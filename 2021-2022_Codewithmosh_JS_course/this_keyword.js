// const video = {
// 	title: 'a',
// 	tags: ['a', 'b', 'c'],
// 	showTags() {
// 		this.tags.forEach(function (tag) {
// 			console.log(this, tag);
// 		}, this);
// 	},
// };

// video.showTags();

const sum = {
	operation() {
		return [...arguments].reduce((a, b) => a + b);
	},
};

const multiplication = {
	operation() {
		return [...arguments].reduce((a, b) => a * b);
	},
};

function haveSomeFun(a, b, c) {
	return this.operation(...arguments);
}

console.log(haveSomeFun.call(sum, 1, 3, 5)); // expected output: 9
console.log(haveSomeFun.apply(sum, [1, 3, 5])); // expected output: 9

console.log(haveSomeFun.call(multiplication, 1, 3, 5)); // expected output: 15
console.log(haveSomeFun.apply(multiplication, [1, 3, 5])); // expected output: 15

const multiplicationFn = haveSomeFun.bind(multiplication);
console.log(`multiplicationFn: ${multiplicationFn(1, 3, 5, 10)}`); // multiplicationFn: 150
