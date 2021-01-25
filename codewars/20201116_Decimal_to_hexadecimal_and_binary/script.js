const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let remaindersArray;

let recursiveAsyncReadLine = function () {
    remaindersArray = [];
    rl.question('Please enter a decimal number:',
        (userInput) => {
            if (Number.parseInt(userInput) === Number(userInput)) {
                console.log(`You have entered a correct decimal number: ${userInput}`);
                let isPositiveNumber = Number(userInput) > 0;

                let hexVal = findHexadecimalValue(+userInput, isPositiveNumber);
                remaindersArray = [];
                let binaryVal = findBinaryValue(+userInput, isPositiveNumber);

                console.log(`It was converted to following number systems:`)
                console.log(`HEX: ${hexVal}`);
                console.log(`BINARY: ${binaryVal}`);
                console.log("-------------------------------------------------")
                return recursiveAsyncReadLine();
            }
            if (userInput === "quit") {
                console.log('Closing the program. You have entered QUIT...');
                rl.close();
                process.exit(0);
            } else {
                console.log("-------------------------------------");
                console.log("Please enter a correct decimal number.")
                console.log("-------------------------------------");
                return recursiveAsyncReadLine();
            }
        });
}

function findHexadecimalValue(decimalValue, isPositiveNumber) {
    findDivisionRemainder(Math.abs(decimalValue), 16);
    let reversedRemaindersArr = remaindersArray.reverse();

    let hexaDecimalValue = mapDecimalToHexadecimal(reversedRemaindersArr);
    hexaDecimalValue = isPositiveNumber ? hexaDecimalValue : "-".concat(hexaDecimalValue);
    return hexaDecimalValue;
}

function findDivisionRemainder(dividend, divisor) {
    if (dividend < divisor) {
        remaindersArray.push(dividend);
        return;
    }

    let divisionResultInt = Math.floor(dividend / divisor);
    let divisionRemainder = dividend % divisor
    remaindersArray.push(divisionRemainder);

    findDivisionRemainder(divisionResultInt, divisor);
}

function mapDecimalToHexadecimal(arr) {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case 10:
                result += "A";
                break;
            case 11:
                result += "B";
                break;
            case 12:
                result += "C";
                break;
            case 13:
                result += "D";
                break;
            case 14:
                result += "E";
                break;
            case 15:
                result += "F";
                break;
            default:
                result += arr[i];
        }
    }
    return result;
}

function findBinaryValue(decimalValue, isPositiveNumber) {
    findDivisionRemainder(Math.abs(decimalValue), 2);
    let reversedRemaindersArr = remaindersArray.reverse();
    let binaryValue = reversedRemaindersArr.join("");
    binaryValue = isPositiveNumber ? binaryValue : "-".concat(binaryValue);
    return binaryValue;
}

recursiveAsyncReadLine();