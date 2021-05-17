let student = {
    name: "",
    "last name": "",
    tabel: "",
};

student.name = prompt("Пожалуйста, введите имя студента:", "Имя");
while (!nameSurnameCheck(student.name)) {
    student.name = prompt("Пожалуйста, введите имя студента:", "Имя");
}

student["last name"] = prompt("Пожалуйста, введите фамилию студента:", "Фамилия");
while (!nameSurnameCheck(student["last name"])) {
    student["last name"] = prompt("Пожалуйста, введите фамилию студента:", "Фамилия");
}

function nameSurnameCheck(value) {
    return value!==null && isNaN(value) && value!=="Имя" && value!=="Фамилия";
}; // пока эта функция будет возвращать false, до тех пор будет работать цикл в строке 8.

console.log(student);

while (true) { /* делаем бесконечный цикл, который будет остановлен с помощью оператора break внутри него при выполнении определенного условия*/
    let schoolSubject = prompt("Пожалуйста, введите название предмета", "название предмета");
    if (schoolSubject == null) {
        alert("Вы нажали CANCEL. Скрипт будет остановлен.");
        break;
    }

    let tabelScore = prompt("Пожалуйста, введите Ваш балл по данному предмету:", "балл по предмету");
    tabelScore = parseInt(tabelScore);
    while (!tabelScore || isNaN(tabelScore)) {
        if (tabelScore === null) {
            alert("Так просто я не сдамся. :)  Пожалуйста, введите корректный балл по предмету!");
        }
        tabelScore = prompt("Пожалуйста, введите Ваш балл по данному предмету:", "балл по предмету");
    }
    student.tabel += tabelScore + " ";
}

let tabelData = student.tabel
    .split(' ');
tabelData.pop();

console.log(tabelData);

let numberOfBadMarks = 0;
let totalSumOfMarks = 0;
let averageMark = 0;

results(tabelData);

function results (tabelData) {
    tabelData.forEach(function(item){
        if (item<4) {
            numberOfBadMarks++;
        };
        totalSumOfMarks += parseInt(item);
    });
    if (numberOfBadMarks === 0) {
        alert ("Студент переведен на следующий курс!");
    }
    else {
        alert ("НЕ ФАКТ, что студент будет переведен на следующий курс :( ");
    }
    console.log("Total sum of marks = " + totalSumOfMarks);
    averageMark = totalSumOfMarks/tabelData.length;
    console.log("Average mark = " + averageMark);
    console.log(averageMark);

    if (averageMark>7) {
        alert("Студенту назначена стипендия.");
    };
}






