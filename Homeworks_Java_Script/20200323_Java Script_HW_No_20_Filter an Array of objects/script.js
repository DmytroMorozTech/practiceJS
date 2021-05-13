let directors = [
    // Задаем массив, который состоит из обьектов, для дальнейшей работы с ним.
    {
        directorName: "Steve",
        middleName: "",
        directorLastName: "Jobs",
        nationality: "US"
    },
    {
        directorName: "Antonina",
        middleName: "Petrivna",
        directorLastName: "Krucha",
        nationality: "UA"
    },
    {
        directorName: "Lidiya",
        middleName: "Vasylivna",
        directorLastName: "Ivanenko",
        nationality: "RU"
    },
    {
        directorName: "Michael ",
        middleName: "",
        directorLastName: "Bay",
        nationality: "US"
    },
    {
        directorName: "Freddie",
        directorLastName: "Mercury",
        nationality: "NZ"
    },
    {
        directorName: "Grigoriy",
        middleName: "Maksimovich",
        directorLastName: "Ivanenko",
        nationality: "RU"
    },
    {
        directorName: "Vitaliy",
        middleName: "Igorevich",
        directorLastName: "Drozdov",
        nationality: "RU"
    }
];

const filterCollection = (coll, keyWords, includeAllKeywords) => {
    const kWords = keyWords.split(" ");

    if (includeAllKeywords) {
        return coll.filter((item,index) => {
            console.log(`Перебираем объект № ${index+1}`);
            let numberOfMatches = 0;
            for (let key in item) {
                for (let kw of kWords) {
                    if (item[key] === kw) {
                    numberOfMatches ++;
                    };
                }
            };
            console.log(`Количество совпадений в рамках объекта: ` + numberOfMatches);
            if (numberOfMatches===(kWords.length)) {
                return true;
            };
            return false;
        });
    }

    else {
        return coll.filter(item => {
            for (let key in item) {
                for (let kw of kWords) {
                    if (item[key] === kw) {
                        console.log(`Совпавшее слово: ` + item[key]);
                        return true;
                    }
                }
            };
            return false;
        });
    }
};

// -----------------------------------------------------
const isArray = (elem) => Array.isArray(elem); //Функция, которая проверяет, является ли элемент массивом.
const isObject = (elem) => typeof elem === 'object'; //Функция, которая проверяет, является ли элемент объектом.


const filtered = filterCollection(directors, "Ivanenko RU", true);
console.log(filtered);




// Еще один рабочий вариант цикла if, который можно вставить вместо строк 49-66.
//
//     if (includeAllKeywords) {
//         return coll.filter(item => {
//             const itemValues = Object.values(item);
//             for (let kw of kWords) {
//                 if (!itemValues.includes(kw)) {
//                     return false;
//                 }
//             }
//             return true;
//         });