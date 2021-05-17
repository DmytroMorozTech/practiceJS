let indicatorPanel = document.querySelector("input");
let inputValue = "";
let extraInfo = document.getElementById("extraInfo");
let keys = document.querySelector("div.keys");

let allInputButtons = [...document.querySelectorAll("input[type = button]")];
// Собираем все кликабельные кнопки на калькуляторе в одну коллекцию.
// Используя spread operator, преобразуем эту коллекцию в массив.
console.log(allInputButtons);

keys.addEventListener("click", pressKeysWithMouse);

let result = 0;
let mathOperation = "";
let nextNumber = 0;
let nextAction = false;
let actionsArray = [];
let memoryCell = 0;
// let mrcNumberOfCalls = 0;
let allKeysPressed = [];

function pressKeysWithMouse(event){
    let target = event.target;
    let value = event.target.value;
    allKeysPressed.push(value);

    if (!allInputButtons.includes(target)) {return false};
    // если пользователь кликнет мимо кнопки на калькуляторе - ничего не произойдет.

    if (nextAction) {
        indicatorPanel.value = "";
        nextAction = false;
    };
    // если до этого уже было введено какое-то число, потом пользователь нажал знак матем. действия, а сейчас снова
    // вводит число, то поле ввода вверху калькулятора очистится перед тем, как начинать отображать новое число.

    switch (value) {
        case "9": case "8": case "7": case "6": case "5": case "4": case "3": case "2": case "1": case "0": case "." :
            indicatorPanel.value += value;
            break;

        case "-":
            if (!indicatorPanel.value) {
                indicatorPanel.value+= "-";
                break;
            }

        case "+": case"-": case"*": case"/":
            nextNumber = indicatorPanel.value;
            if (actionsArray.length!==1) {
                actionsArray.push(nextNumber);
            }
            actionsArray.push(value);
            // console.log(actionsArray);
            if (actionsArray.length===4) {
                result = calculate(...actionsArray);
                result = result.toString().length>14 ? result.toFixed(14) : result;
                indicatorPanel.value = result;
                // console.log(result);
                actionsArray.splice(0,3);
                actionsArray.unshift(result);
                // console.log(actionsArray);
            }

            nextAction = true;
            break;

        case "=" :
            nextNumber = indicatorPanel.value;
            actionsArray.push(nextNumber);
            result = calculate(...actionsArray);
            result = result.toString().length>14? result.toFixed(14) : result;
            indicatorPanel.value = result;
            // console.log(result);
            actionsArray.splice(0,3);
            actionsArray.unshift(result);
            // console.log(actionsArray);
            break;

        case "C":
            actionsArray = [];
            indicatorPanel.value = "";
            break;

        case "m+":
            extraInfo.style.visibility='visible';
            memoryCell+= +indicatorPanel.value;
            console.log(`memoryCell = ` + memoryCell);
            break;

        case "m-":
            extraInfo.style.visibility='visible';
            memoryCell-=indicatorPanel.value;
            console.log(`memoryCell = ` + memoryCell);
            break;

        case "mrc":
            if (allKeysPressed[allKeysPressed.length - 2]!== "mrc") {
                indicatorPanel.value = memoryCell;
                break;
            }

            memoryCell = 0;
            indicatorPanel.value = "";
            extraInfo.style.visibility='hidden';
            actionsArray = [];
            allKeysPressed = [];
    }
}

function calculate (number1, mathOperation, number2) {
    return eval(number1 + mathOperation + number2);
};