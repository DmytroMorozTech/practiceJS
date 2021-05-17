let number1 = numberCheck(1); //Присваиваем number1 значение, вызывая функцию numberCheck().
// Эта функция не только запросит у пользователя ввести число, но и проведет валидацию введенного числа.
let number2 = numberCheck(2); // Получаем number 2 тем же путем, что и number1 : вызываем функцию numberCheck().

function numberCheck (requestNum) {
    let number = prompt(`Please enter number ${requestNum} :`);
    while (!number || isNaN(number)) {
        let message = `${number} - is wrong!`;
        if (number === null) {
            message =`YOU HAVE TO ENTER A CORRECT NUMBER ${requestNum} !`;
        }

        number = prompt(`Please enter number ${requestNum} :`, message);
        if (number===message && number!==`YOU HAVE TO ENTER A CORRECT NUMBER ${requestNum} !`) {
            number = number.substr(0, (number.length - 12));
        }
    }
    return number; // Выдаем на финальном этапе выполнения функции валидное числовое значение.
}

let mathOperation = prompt("Please enter a mathematical operation to be performed:", " + , - , * , / ");
while (mathOperation!=="+" && mathOperation!=="-" && mathOperation!=="*" && mathOperation!=="/") {
    mathOperation = prompt("Please enter a mathematical operation to be performed:", " + , - , * , / ");
}

function resultOfMathOperation (number1, number2, mathOperation) {
    return eval (number1 + mathOperation + number2);
}

let result=resultOfMathOperation(number1, number2, mathOperation);
console.log ("Result: " + result);
alert("Result: " + result);
