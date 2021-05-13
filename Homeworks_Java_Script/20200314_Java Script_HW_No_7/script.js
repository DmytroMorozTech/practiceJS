function setUpEvents () {
    let initialArray = ["hello", "world", ["one", "two", "three", "four"], { name: "John", surname: "Malkovich", age: 66 }, "Kyiv", "Kharkiv", "Odessa", "Lviv"];

    const isArray = (elem) => Array.isArray(elem); //Функция, которая проверяет, является ли элемент массивом.
    const isObject = (elem) => typeof elem === 'object';//Функция, которая проверяет, является ли элемент объектом.

    const objectToList = (obj) => {
        const liItems = Object.entries(obj).map(([key, value]) => `<li>${key} - ${value}</li>`);
        const listHTML = `<ol>${liItems.join('')}</ol>`
        return listHTML;
    }

    const createList = (items) => {
        const liItems = items.map(item => {
            if (isArray(item)) {
                return `<li>List from Array${createList(item)}</li>`;
            }

            if (isObject(item)) {
                return `<li>List from Object${objectToList(item)}</li>`;
            }

            return `<li>${item}</li>`;
        });
        const listHTML = `<ul>${liItems.join('')}</ul>`;
        return listHTML;
    }

    const list = createList(initialArray);
    document.body.innerHTML = list;
// ----------------------------------------------------------------
// Counter block.
    let counter = 10;
    let timer = document.createElement('p');
    document.body.append(timer);
    timer.innerText = counter;
    console.log(counter);

    function сountDownTimer() {
        counter --;
        timer.innerText = counter;
        console.log(counter);
    };

    let myVar = setInterval(сountDownTimer, 1000);

    setTimeout( ()=>clearInterval(myVar) , 10000); // первый аргумент в функции setTimeout задан стрелочной функцией.

// ----------------------------------
    let clearScreen = function () {
        let toBeRemovedEl = document.querySelector("ul");
        console.log(toBeRemovedEl);
        document.body.removeChild(toBeRemovedEl);
        // удаляем заданный элемент из html.
    };
    setTimeout(clearScreen, 10000);
    // с задержкой в указанное время (2й аргумент) запускаем функцию clearScreen, которая удаляет список <ul></ul>.
// ----------------------------------
}

window.onload = function () {
    setUpEvents();
};


