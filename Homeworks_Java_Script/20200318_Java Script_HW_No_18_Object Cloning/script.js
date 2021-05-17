const metroStore = {
    directorName:"Ivan Petrovych",
    directorLastName:"Zagorulko",
    proficiencyIndex:8,
    totalNumberOfEmployees: 202,
    grocerySection: {
        directorName:"Lidiya Vasylivna",
        directorLastName:"Bevz",
        totalNumberOfEmployees: 15,
    },
    meatSection: {
        directorName:"Antonina Petrivna",
        directorLastName:"Krucha",
        totalNumberOfEmployees: 5,
        employeesList: {
            engineer: "Petro Inkermanov",
            "marketing-director": "Ivan Navi",
            merchandiser: "Andriy Vovk",
            "sales-manager": "Vitaliy Kovtunyuk",
            "cleaning-manager": "Eva Makarchuk"
        }
    },
    milkSection: {
        directorName:"Lidiya Vasylivna",
        directorLastName:"Ivanenko",
        totalNumberOfEmployees: 3,
            employeesList: {
                engineer: "Petro Inkermanov",
                "marketing-director": "Ivan Navi",
                merchandiser: "Andriy Vovk"
            }
    },
    property: [11,22,34,66,34,312,99,102],
    unknown: null
}

let anotherObject = {};

function cloneObject (initialObject, resultingObject) {
    for (let key in initialObject) {
        resultingObject[key] = initialObject[key];
        if (isObject(initialObject[key]) && !isArray(initialObject[key]) && initialObject[key]!==null) {
            cloneObject(initialObject[key], resultingObject[key]);
        };
    };
}

const isArray = (elem) => Array.isArray(elem); //Функция, которая проверяет, является ли элемент массивом.
const isObject = (elem) => typeof elem === 'object'; //Функция, которая проверяет, является ли элемент объектом.

cloneObject (metroStore, anotherObject);
console.log(anotherObject);