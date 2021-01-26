// https://www.codewars.com/kata/554b4ac871d6813a03000035

function highAndLow(numbers) {
    let charArr = numbers.split(" ").map(i => parseInt(i));
    if (charArr.length == 1) return String(charArr[0] + " " + charArr[0]);
    let filteredArr = charArr.sort((a, b) => a - b);
    console.log(filteredArr)
    return String(filteredArr[filteredArr.length - 1] + " " + filteredArr[0]);
}

console.log(highAndLow("1 9 3 4 -5"));
// expected output: "9 -5"

console.log(highAndLow("-214 -3 -6 -64 0 1 29 4 4 5 54 542 6"));
// expected output: "542 -214"