/**
 * This function finds all permutations of number N, that are greater than N.
 * Figures that are present in N should not be duplicated in permutations.
 * We only have the right to swap their positions.
 * @param {number} N A positive integer.
 * @returns {Array.<number>} An array with all possible permutations of N, that are greater than N.
 */
function findPermutationsGreater(N) {
	const num = N.toString()
		.split('')
		.map(n => parseInt(n));

	const res = [];

	// Iterate over every permutation of N which is greater than N
	while (next_permutation_greater(num)) {
		if (parseInt(num[0]) === 0) continue;
		const newPermutation = num.join('');
		res.push(newPermutation);
	}
	return res;
}

/**
 * This function finds all permutations of number N, that are smaller than N.
 * Figures that are present in N should not be duplicated in permutations.
 * We only have the right to swap their positions.
 * @param {number} N A positive integer.
 * @returns {Array.<number>} An array with all possible permutations of N, that are smaller than N.
 */
function findPermutationsSmaller(N) {
	const num = N.toString()
		.split('')
		.map(n => parseInt(n));
	const res = [];

	// Iterate over every permutation of N which is smaller than N
	while (next_permutation_smaller(num)) {
		if (parseInt(num[0]) === 0) continue;
		const newPermutation = num.join('');
		res.push(newPermutation);
	}
	return res;
}

function next_permutation_greater(p) {
	for (let a = p.length - 2; a >= 0; --a) {
		if (p[a] < p[a + 1]) {
			for (let b = p.length - 1; ; --b) {
				if (p[b] > p[a]) {
					let t = p[a];
					p[a] = p[b];
					p[b] = t;
					for (++a, b = p.length - 1; a < b; ++a, --b) {
						t = p[a];
						p[a] = p[b];
						p[b] = t;
					}
					return true;
				}
			}
		}
	}
	return false;
}

function next_permutation_smaller(p) {
	for (let a = p.length - 2; a >= 0; --a) {
		if (p[a] > p[a + 1]) {
			for (let b = p.length - 1; ; --b) {
				if (p[b] < p[a]) {
					let t = p[a];
					p[a] = p[b];
					p[b] = t;
					for (++a, b = p.length - 1; a < b; ++a, --b) {
						t = p[a];
						p[a] = p[b];
						p[b] = t;
					}
					return true;
				}
			}
		}
	}
	return false;
}

console.log('***********************************');
let N1 = 907;
console.log(`N1: ${N1}`);
const calcGreater1 = findPermutationsGreater(N1);
console.log(`Permutations greater than N1: ${calcGreater1}`);
// Permutations greater than N1: 970

const calcSmaller1 = findPermutationsSmaller(N1);
console.log(`Permutations smaller than N1: ${calcSmaller1}`);
// Permutations smaller than N1: 790,709
console.log('***********************************');

let N2 = 100342;
console.log(`N2: ${N2}`);
const calcGreater2 = findPermutationsGreater(N2);
console.log(`Permutations greater than N2: ${calcGreater2}`);
//Permutations greater than N2: 100423,100432,102034,102043,102304,102340,102403,102430,
// 103024,103042,103204,103240,103402,103420,104023,104032,104203,104230,104302,104320,120034,
// 120043,120304,120340,120403,120430,123004,123040,123400,124003,124030,124300,130024,130042,
// 130204,130240,130402,130420,132004,132040,132400,134002,134020,134200,140023,140032,140203,
// 140230,140302,140320,142003,142030,142300,143002,143020,143200,200134,200143,200314,200341,
// 200413,200431,201034,201043,201304,201340,201403,201430,203014,203041,203104,203140,203401,
// 203410,204013,204031,204103,204130,204301,204310,210034,210043,210304,210340,210403,210430,213004,
// 213040,213400,214003,214030,214300,230014,230041,230104,230140,230401,230410,231004,231040,231400,
// 234001,234010,234100,240013,240031,240103,240130,240301,240310,241003,241030,241300,243001,243010,
// 243100,300124,300142,300214,300241,300412,300421,301024,301042,301204,301240,301402,301420,302014,
// 302041,302104,302140,302401,302410,304012,304021,304102,304120,304201,304210,310024,310042,310204,
// 310240,310402,310420,312004,312040,312400,314002,314020,314200,320014,320041,320104,320140,320401,
// 320410,321004,321040,321400,324001,324010,324100,340012,340021,340102,340120,340201,340210,341002,
// 341020,341200,342001,342010,342100,400123,400132,400213,400231,400312,400321,401023,401032,401203,
// 401230,401302,401320,402013,402031,402103,402130,402301,402310,403012,403021,403102,403120,403201,
// 403210,410023,410032,410203,410230,410302,410320,412003,412030,412300,413002,413020,413200,420013,
// 420031,420103,420130,420301,420310,421003,421030,421300,423001,423010,423100,430012,430021,430102,
// 430120,430201,430210,431002,431020,431200,432001,432010,432100

const calcSmaller2 = findPermutationsSmaller(N2);
console.log(`Permutations smaller than N2: ${calcSmaller2}`);
// Permutations smaller than N2: 100324,100243,100234
console.log('***********************************');
