// https://www.codewars.com/kata/586538146b56991861000293/javascript

const NATO = {
	a: "Alfa ",
	b: "Bravo ",
	c: "Charlie ",
	d: "Delta ",
	e: "Echo ",
	f: "Foxtrot ",
	g: "Golf ",
	h: "Hotel ",
	i: "India ",
	j: "Juliett ",
	k: "Kilo ",
	l: "Lima ",
	m: "Mike ",
	n: "November ",
	o: "Oscar ",
	p: "Papa ",
	q: "Quebec ",
	r: "Romeo ",
	s: "Sierra ",
	t: "Tango ",
	u: "Uniform ",
	v: "Victor ",
	w: "Whiskey ",
	x: "Xray ",
	y: "Yankee ",
	z: "Zulu ",
	"?": "? ",
	".": ". ",
	" ": "",
	"!": "! ",
	",": ", ",
};

function transformIntoCodedWord(word) {
	return word
		.toLowerCase()
		.split("")
		.map(letter => NATO[letter]);
}

function to_nato(words) {
	const splittedStr = words.match(/\w+|[,.!?]/g);
	const arrOfArrays = splittedStr.map(transformIntoCodedWord);
	return [].concat(...arrOfArrays).join("");
}

const text = "If, you can read?";
console.log(to_nato(text));
// Expected output:
// India Foxtrot , Yankee Oscar Uniform Charlie Alfa November Romeo Echo Alfa Delta ?

//-----------------------------------------
// Best practice code (not my solution):
function to_nato_alternative(words) {
	return words
		.replace(/\s/g, "")
		.toLowerCase()
		.split("")
		.map(e => (NATO[e] ? NATO[e] : e))
		.join(" ");
}
