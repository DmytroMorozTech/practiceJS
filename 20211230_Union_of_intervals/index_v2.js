const myl = [
	[0, 2],
	[3, 6],
	[7, 7],
	[9, 12],
];
const interval = [1, 8];

/**
 * @param {number} value
 * @param {number} left
 * @param {number} right
 * @returns {boolean}
 */
const isBetween = (value, left, right) => value >= left && value <= right;

/**
 * @template Item
 * @param {Item[]} items
 * @returns {Item}
 */
const last = items => items[items.length - 1];

class Interval {
	/**
	 * @param {[number, number]} param0
	 */
	constructor([start, end]) {
		this.start = start;
		this.end = end;
	}

	/**
	 * @param {Interval} right
	 * @returns {boolean}
	 */
	isIntersecting(right) {
		return (
			isBetween(right.start, this.start, this.end) || isBetween(right.end, this.start, this.end)
		);
	}

	/**
	 * @param {Interval} right
	 * @returns {Interval}
	 */
	union(right) {
		return new Interval([Math.min(this.start, right.start), Math.max(this.end, right.end)]);
	}

	/**
	 * @returns {[number, number]}
	 */
	toArray() {
		return [this.start, this.end];
	}
}

/**
 * @param {[number, number][]} myl
 * @param {[number, number]} z
 */
function intervalInsert(myl, z) {
	const intervals = [...myl, z].map(item => new Interval(item)).sort((a, b) => a.start - b.start);
	return intervals
		.slice(1)
		.reduce(
			(result, item) =>
				last(result).isIntersecting(item)
					? [...result.slice(0, -1), last(result).union(item)]
					: [...result, item],
			intervals.slice(0, 1)
		)
		.map(item => item.toArray());
}

console.log(intervalInsert(myl, interval));
