// https://www.codewars.com/kata/5495bfa82eced2146100002f

const myl = [
	[0, 2],
	[3, 6],
	[7, 7],
	[9, 12],
];
const interval = [1, 8];

intervalInsert = function (myl, interval) {
	if (myl.length === 0) return new Array(interval);
	if (!interval || interval.length === 0) return myl;

	if (myl.length === 1 && !intervalsIntersect(myl[0], interval))
		return [myl[0], interval].sort((i1, i2) => i1[0] - i2[0]);
	if (myl.length === 1 && intervalsIntersect(myl[0], interval)) {
		const unitedInterval = [Math.min(myl[0][0], interval[0]), Math.max(myl[0][1], interval[1])];
		return new Array(unitedInterval);
	}
	// managing edge cases

	let result = [];
	let lowerBorder, upperBorder;
	let startOfIntersectionWasFound = false;
	let intersectionCounter = 0;

	for (const currentInterval of myl) {
		const isLastElemInArr = myl.indexOf(currentInterval) === myl.length - 1;
		const intersectionWasDetected = intervalsIntersect(currentInterval, interval);
		if (intersectionWasDetected) intersectionCounter++;

		if (!startOfIntersectionWasFound && intersectionWasDetected) {
			startOfIntersectionWasFound = true;
			lowerBorder = Math.min(currentInterval[0], interval[0]);
			upperBorder = Math.max(currentInterval[1], interval[1]);

			if (isLastElemInArr) result.push([lowerBorder, upperBorder]);
			continue;
		}
		// if we haven't found the start of intersection yet, then we will have to execute code within this block;
		// we'll do it only once: when we find intersection between initial interval and currentInterval

		if (startOfIntersectionWasFound && intersectionWasDetected) {
			upperBorder = Math.max(currentInterval[1], interval[1]);
			if (isLastElemInArr) {
				result.push([lowerBorder, upperBorder]);
			}
			continue;
		}
		// we continue iterating through the intervals within myl array and as long as we still have the initial interval
		// intersecting with the upcoming currentInterval within myl array, we will raise the limit for upperBorder
		// of united interval

		if (startOfIntersectionWasFound && !intersectionWasDetected) {
			result.push([lowerBorder, upperBorder]);
			startOfIntersectionWasFound = false;
		}
		result.push(currentInterval);
	}

	if (intersectionCounter === 0) {
		result.push(interval);
	}
	// if we've reached the end of array myl and haven't found any intersections with given interval,
	// then we should add this interval to the resulting array of intervals

	return result.sort((i1, i2) => i1[0] - i2[0]);
};

const intervalsIntersect = function (i1, i2) {
	return (
		(i1[0] >= i2[0] && i1[0] <= i2[1]) ||
		(i1[1] >= i2[0] && i1[1] <= i2[1]) ||
		(i2[0] >= i1[0] && i2[0] <= i1[1]) ||
		(i2[1] >= i1[0] && i2[1] <= i1[1])
	);
};

console.log(intervalInsert(myl, interval));
// Expected output here:
// [ [ 0, 8 ], [ 9, 12 ] ]

//----------------------------------------
// console.log(
// 	intervalInsert(
// 		[
// 			[6, 10],
// 			[15, 25],
// 			[35, 51],
// 			[100, 101],
// 		],
// 		[-20, 4]
// 	)
// );

//Expected output here:
// [ [ -20, 4 ], [ 6, 10 ], [ 15, 25 ], [ 35, 51 ], [ 100, 101 ] ]
