
let enteredNumber = +prompt("Please enter some number:");
while (enteredNumber !== parseInt(enteredNumber)) { // пока enteredNumber не будет равняться integer (целому числу)
    enteredNumber = +prompt("Please enter some integer number:") // программа будет повторно просить пользователя ввести цифру
}

let str = "Result: ";
let counter = 0;
let i = 1;
while (i <= enteredNumber) {
    if (i % 5 === 0) {
        counter++;
        str += " " + i;
        i += 4;
    }
    i++;
}

if (counter === 0) {
    alert ("Sorry, no numbers")
}

console.log(str + " Counter: " + counter);


