// "Homework No.2_JS_The task of increased complexity"

let m = +prompt("Please enter number 1 (a smaller one):");
let n = +prompt("Please enter number 2 (a bigger one):");

while ( m>n ) {
    alert("You have entered wrong numbers! Please enter correct numbers. Number 1 should be smaller than Number 2");
    m = prompt("Please enter number 1 (a smaller one):");
    n = prompt("Please enter number 2 (a bigger one):");
}

let i=m;

let str2 = "Result: ";
let counter2 = 0;

while (i <= n) {
    let primeNumber=true;
    let j=2;

    while (j < i) {
        if (i % j === 0) {
            primeNumber=false;
        }
        j++;
    }

    if (primeNumber) {
        str2 += " " + i;
        counter2++;
    }
    i++;
}

console.log(str2 + "    <<<<< Quantity of prime numbers: " + counter2 + " >>>>>");