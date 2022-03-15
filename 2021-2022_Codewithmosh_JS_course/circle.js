// we should create a class Circle, with 2 property
// 1. Property "radius" that we can read or write to
// 2. Property "area" that should be read only.

class Circle {
	constructor(radius) {
		this.radius = radius;
	}

	get area() {
		let area = Math.PI * Math.pow(this.radius, 2);
		return area.toFixed(4);
	}
}

let c1 = new Circle(3);
console.log(c1);
console.log(c1.area);

c1.radius = 5;
console.log(c1);
console.log(c1.area);
