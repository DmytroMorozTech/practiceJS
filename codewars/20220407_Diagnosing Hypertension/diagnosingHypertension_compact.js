// https://www.codewars.com/kata/621470ede0bb220022c9e396

// Alternative solution (not mine):
const input = [
	["130/90", "140/94"],
	["160/110"],
	["200/120"],
	["150/94", "140/90", "120/90"],
	["140/94", "140/90", "120/80", "130/84"],
];

const is_hypertensive = patient => {
	let len = patient.length,
		sum_s = 0,
		sum_d = 0;

	for (let test of patient) {
		let [s, d] = test.split("/").map(Number);

		if (s >= 180 && d >= 110) return true;

		sum_s += s;
		sum_d += d;
	}

	return len >= 2 && (sum_s / len >= 140 || sum_d / len >= 90);
};

const hypertensive = patients =>
	patients.reduce((count, patient) => count + is_hypertensive(patient), 0);

console.log(hypertensive(input)); // 3
