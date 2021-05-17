document.addEventListener("keypress", changeColor );

function changeColor (event) {
    let currentlyActiveButton = document.querySelector(".activeBtn");
    // заносим в отдельную переменную тот элемент, который на данный момент имеет класс "activeBtn".

    let keyEnter = document.querySelector(".btn-wrapper button:nth-child(1)");
    let keyS = document.querySelector(".btn-wrapper button:nth-child(2)");
    let keyE = document.querySelector(".btn-wrapper button:nth-child(3)");
    let keyO = document.querySelector(".btn-wrapper button:nth-child(4)");
    let keyN = document.querySelector(".btn-wrapper button:nth-child(5)");
    let keyL = document.querySelector(".btn-wrapper button:nth-child(6)");
    let keyZ = document.querySelector(".btn-wrapper button:nth-child(7)");
    // с помощью Query-selector выносим в отдельные переменные все кнопки.

    switch (event.code) {
        case "Enter":
            if (currentlyActiveButton) {
                currentlyActiveButton.classList.remove("activeBtn")
            };
            keyEnter.classList.add("activeBtn");
            break;
        case "KeyS":
            if (currentlyActiveButton) {
                currentlyActiveButton.classList.remove("activeBtn")
            };
            keyS.classList.add("activeBtn");
            break;
        case "KeyE":
            if (currentlyActiveButton) {
                currentlyActiveButton.classList.remove("activeBtn")
            };
            keyE.classList.add("activeBtn");
            break;
        case "KeyO":
            if (currentlyActiveButton) {
                currentlyActiveButton.classList.remove("activeBtn")
            };
            keyO.classList.add("activeBtn");
            break;
        case "KeyN":
            if (currentlyActiveButton) {
                currentlyActiveButton.classList.remove("activeBtn")
            };
            keyN.classList.add("activeBtn");
            break;
        case "KeyL":
            if (currentlyActiveButton) {
                currentlyActiveButton.classList.remove("activeBtn")
            };
            keyL.classList.add("activeBtn");
            break;
        case "KeyZ":
            if (currentlyActiveButton) {
                currentlyActiveButton.classList.remove("activeBtn")
            };
            keyZ.classList.add("activeBtn");
            break;
    }
}