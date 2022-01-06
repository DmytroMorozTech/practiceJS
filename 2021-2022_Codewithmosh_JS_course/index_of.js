const numbers1 = [1, 2, 3, 4, 5, 1, 9, 22];

console.log(numbers1.indexOf('a')); // expected output: -1, because there is no such element in array
console.log(numbers1.indexOf('1')); // expected output: -1, because there is no string value '1' in array
// and type of the primitive that we are looking for is crucial here
console.log(numbers1.indexOf(1)); // expected output: 0
console.log(numbers1.lastIndexOf(1)); // expected output: 5 -> we are searching for given element from the end of array

const elemIsInArray = numbers1.includes(3);
console.log(elemIsInArray); // expected output: true

const courses = [
	{ id: 1, name: 'a' },
	{ id: 2, name: 'b' },
	{ id: 3, name: 'c' },
	{ id: 4, name: 'd' },
	{ id: 5, name: 'e' },
];

const foundCourse = courses.find(course => course.name === 'e');
console.log(foundCourse || 'No course was found');
