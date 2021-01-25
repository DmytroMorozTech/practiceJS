// https://www.codewars.com/kata/59f7597716049833200001eb/train/javascript

function solve(x, y) {
    let counter = 0;
    for (let i = x; i < y; i++) {
        counter = checkIfNumbIsUpsideDown(i) ? counter + 1 : counter;
    }
    console.log(`counter: ${counter}`);
    return counter;
}

function checkIfNumbIsUpsideDown(numb) {
    let allowedMiddleDigits = [0, 1, 8];
    let numbOfDigits = numb.toString().length;
    if (numbOfDigits === 1 && allowedMiddleDigits.includes(numb)) return true;

    if (numbOfDigits % 2 === 0) return checkForMirroredNumb(numb);

    let indOfMiddleDgt = Math.floor(numbOfDigits / 2);
    let digitInTheMiddle = Number(numb.toString().split("")[indOfMiddleDgt]);
    if (!allowedMiddleDigits.includes(digitInTheMiddle)) return false;

    let modifiedNumb = numb.toString().split("");
    modifiedNumb.splice(indOfMiddleDgt, 1);
    modifiedNumb = modifiedNumb.join("");
    return checkForMirroredNumb(modifiedNumb);

}

function checkForMirroredNumb(numb) {
    numb = numb.toString();
    let mapping = new Map;
    mapping.set("0", "0");
    mapping.set("1", "1");
    mapping.set("6", "9");
    mapping.set("8", "8");
    mapping.set("9", "6");

    let digitsInNumberArr = numb.split("");
    let numbOfDigits = digitsInNumberArr.length;
    let counter = 0;
    for (let i = 0; i <= (numbOfDigits / 2); i++) {
        let currentNumb = digitsInNumberArr[i];
        let mirroredNumb = digitsInNumberArr[numbOfDigits - i - 1];
        counter = mapping.get(currentNumb) === mirroredNumb
            ? counter
            : counter + 1;
    }
    return counter === 0;
}

solve(10000, 20000);