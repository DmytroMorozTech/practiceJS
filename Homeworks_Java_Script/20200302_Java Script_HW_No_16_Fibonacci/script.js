let number1 = +prompt("Please enter number 1 :", "F0");
while (!number1 || isNaN(number1)) {
    number1 = +prompt("Please enter number 1 :", "F0")
        }
console.log("F0 = " + number1);

let number2 = +prompt("Please enter number 2 :", "F1");
while (!number2 || isNaN(number2)) {
    number2 = +prompt("Please enter number 2 :", "F1")
}
console.log("F1 = " + number2);

let n = +prompt("Please enter n:", "n");
while (!n || isNaN(n)) {
    n = +prompt ("Please enter n:", "n");
}
console.log("n = " + n);
console.log ("------------------------------------------");

let result;

if (n>=2 && number1>0 && number2>0) {
    result = calcFibonacci(n);
}

else {
    result = calcFibonacciBelow0(n);
}

function calcFibonacci(n) {
    let arr = [number1, number2];
    console.log(arr[0]);
    console.log(arr[1]);
        for (let i=2; i<n; i++) {
            arr.push(eval(arr[i - 2] + arr[i - 1]));
            console.log(arr[i]);
        }
    return arr[n-1];
}

function calcFibonacciBelow0(n) {
    let arr = [number1, number2];
    console.log(arr[0]);
    console.log(arr[1]);
    for (let i=2; i<n; i++) {
        arr.push(eval(arr[i - 2] - arr[i - 1]));
        console.log(arr[i]);
    }
    return arr[n-1];
}

console.log ("Result: " + result);
alert("Result: " + result);