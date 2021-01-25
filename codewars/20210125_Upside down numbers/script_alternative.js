// This solution is not mine. But I really liked it.

const upsideDownNumbers = {
    "0": 0,
    "1": 1,
    "8": 8,
    "6": 9,
    "9": 6
};

function isUpsideDown(number) {
    const result = +number.toString().split("").reverse().map(item => upsideDownNumbers[item]).join("");

    return result === number;
}

function solve(x, y) {
    let count = 0;
    for (let i = x; i < y; i++) {
        if (isUpsideDown(i)) {
            count++;
        }
    }

    console.log(count);
    return count;
}

solve(10000, 20000);