// https://www.codewars.com/kata/585d7d5adb20cf33cb000235/train/javascript

// My solution
function findUniq(arr) {
    let mainElem;
    if (arr[0] === arr[1]) mainElem = arr[0];
    if (arr[0] === arr[3]) mainElem = arr[0];
    if (arr[2] === arr[3]) mainElem = arr[2];

    let nextElem;
    let uniqueElem;
    for (let i = 0; i < arr.length; i++) {
        nextElem = arr[i];
        if (nextElem !== mainElem) {
            uniqueElem = nextElem;
            break;
        }
    }

    return uniqueElem;
}

// Alternative solution from codeWars:
// function findUniq(arr) {
//     arr.sort((a, b) => a - b);
//     return arr[0] == arr[1] ? arr.pop() : arr[0]
// }