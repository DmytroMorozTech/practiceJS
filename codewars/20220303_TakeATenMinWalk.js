function isValidWalk(walk) {
	if (walk.length !== 10) return false;
	const startingPoint = new Point(0, 0);
	const currentPoint = new Point(0, 0);

	for (let i = 0; i < walk.length; i++) {
		const direction = walk[i];
		currentPoint.move(direction);
	}
	return startingPoint.equals(currentPoint);
}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	move(direction) {
		if (direction === 'n') this.y++;
		if (direction === 's') this.y--;
		if (direction === 'w') this.x--;
		if (direction === 'e') this.x++;
	}

	equals(point) {
		return this.x === point.x && this.y === point.y;
	}
}

const arg = ['n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 's'];
const arg2 = ['w', 'e', 'w', 'e', 'w', 'e', 'w', 'e', 'w', 'e', 'w', 'e'];
const arg3 = ['w'];
const arg4 = ['n', 'n', 'n', 's', 'n', 's', 'n', 's', 'n', 's'];

console.log(isValidWalk(arg4));
