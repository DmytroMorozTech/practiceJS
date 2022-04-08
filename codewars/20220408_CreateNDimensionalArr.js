// https://www.codewars.com/kata/6161847f52747c0025d0349a

// My solution:
const createNDimensionalArray = (n, size) => {
	let parentArr = [];
	let deepestArr = createNestedArr(n, parentArr);
	const word = "level " + n;
	for (let i = 0; i < size; i++) {
		deepestArr.push(word);
	}

	for (let i = n - 1; i >= 1; i--) {
		duplicateArraysOnLevelNTimes(parentArr, i, size);
	}
	return parentArr;
};

function duplicateArraysOnLevelNTimes(arr, levelOfNesting, size) {
	const nestedArr = getNestedArr(arr, levelOfNesting);
	for (let i = 1; i < size; i++) {
		nestedArr.push(nestedArr[0]);
	}
}

function getNestedArr(parentArr, levelOfNesting) {
	let res = parentArr;
	for (let i = 1; i < levelOfNesting; i++) {
		res = res[0];
	}
	return res;
}

function createNestedArr(levefOfNesting, prevArr) {
	if (levefOfNesting === 1) return prevArr;
	prevArr.push([]);
	const nestedArr = prevArr[prevArr.length - 1];
	return createNestedArr(--levefOfNesting, nestedArr);
}

console.log(JSON.stringify(createNDimensionalArray(3, 2)));
// createNDimensionalArray(3, 2) => [[["level 3","level 3"],["level 3","level 3"]],[["level 3","level 3"],["level 3","level 3"]]]

// createNDimensionalArray(4, 3) =>
// [
//     [
//         [
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"]
//         ],
//         [
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"]
//         ],
//         [
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"]
//         ]
//     ],
//     [
//         [
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"]
//         ],
//         [
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"]
//         ],
//         [
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"]
//         ]
//     ],
//     [
//         [
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"]
//         ],
//         [
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"]
//         ],
//         [
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"],
//             ["level 4","level 4","level 4"]
//         ]
//     ]
// ]

//---------------------------------------------------------------
// Alternative solution (not mine). More elegant.
const createNDimensionalArrayAlternative = (depth, size) => {
	let deep = Array(size).fill(`level ${depth}`);
	if (depth === 1) return deep;
	for (let i = 1; i < depth; i += 1) {
		deep = Array(size).fill(deep);
	}

	return deep;
};
