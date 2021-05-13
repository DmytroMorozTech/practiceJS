let number = numberCheck();

function numberCheck () { //Функция для валидации введенного значения. Это должно быть только целое число.
    let number = prompt(`Пожалуйста, введите целое число:`);
    while (!number || isNaN(number) || number%1!==0) {
        let message = `${number} - это некорректный ввод!`;
        if (number === null) {
            message =`Вы должны ввести корректное целое число!`;
        }

        number = prompt(`Пожалуйста, введите целое число:`, message);
        if (number===message && number!==`Вы должны ввести корректное целое число!`) {
            number = number.substr(0, (number.length - 25));
        }
    }
    return number;
    // Выдаем на финальном этапе выполнения функции валидное числовое значение.
}

function factorial(n) { //Основная функция, которая вычисляет факториал числа.
    return (n != 1) ? n * factorial(n - 1) : 1;
}

let result = factorial(number);
console.log(`Факториал числа ${number} составляет: ${result}`);

function addToThePage () {
    let resultingParagraph = document.createElement("p");
    document.body.appendChild(resultingParagraph);
    resultingParagraph.innerHTML = `Факториал числа ${number} составляет: ${result}`;
}

addToThePage();