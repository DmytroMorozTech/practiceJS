let name = prompt("Please enter your name:", "Your name");

while (!name || !isNaN(name) || name=="Your name") { // условие !isNaN сработает в том случае, если name окажется числом.
    name = prompt("Please enter your name:","Your name");
}

let enteredAge = prompt("Please enter your age:");
let age = parseInt(enteredAge);
while (isNaN(enteredAge)) {
        let message = `${enteredAge} - is wrong!`;
        if (enteredAge === null) {
            message = 'You have to enter your valid age!'
        }

        enteredAge = prompt("Please enter your age:", message);
        if (enteredAge==message) {
            enteredAge = enteredAge.substr(0, (enteredAge.length - 12));
        }
}

console.log(age);

if (age<18 ) {
    alert("You are not allowed to visit this website")
}
else if (age >= 18 && age <= 22) {
    const isContinue = confirm("Are you sure you want to continue?")
    if (isContinue) {  /*Если значение будет TRUE*/
        alert("Welcome " + name)   /* Конкатенация строк; лат. concatenatio «присоединение цепями; сцепле́ние»*/
    }
    else {  /*Если значение будет FALSE*/
        alert("You are not allowed to visit this website")
    }
}

else {
    alert("Welcome " + name)
}