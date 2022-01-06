// https://www.codewars.com/kata/53a1eac7e0afd3ad3300008b

function F(n) {
	if (n === 0) return 1;
	return n - M(F(n - 1));
}

function M(n) {
	if (n === 0) return 0;
	return n - F(M(n - 1));
}
