// http://www.codewars.com/kata/59590976838112bfea0000fa

https: function beggars(values, n) {
	if (values.length == 0 || n == 0) return [];

	let position;
	let beggars = {};
	for (let i = 0; i < values.length; i++) {
		position = i % n;
		if (!beggars.hasOwnProperty(position)) beggars[position] = new Array();
		beggars[position].push(values[i]);
	}

	if (values.length < n) {
		let delta = n - values.length;
		for (let i = values.length; i < values.length + delta; i++) {
			beggars[i] = [0];
		}
	}

	// console.log(`Beggars: \n ${JSON.stringify(beggars, null, 3)}`);

	let result = Object.values(beggars).map(arr => arr.reduce((a, b) => a + b));

	return result;
}

let result = beggars([1, 2, 3, 4, 5], 2);
console.log(result);

// -------------------------------------------------
// Below goes NOT MY solution, but it's just great:

// const beggars = (vals, n) =>
// 	vals.reduce((a, v, x) => {
// 		// a - accamulator; v - value from vals array; x - index of that value in array.
// 		a[x % n] += v;
// 		return a;
// 	}, Array(n).fill(0));

// as an accamulator an Array of length n is created and it is filled with zeros (0) straight away;
// so if the number of beggars will exceed the number of possible values, that will be OK for our result;
// because conditions of the task envisage, that if the beggar is unable to get any money -
// the output for him should be 0.
