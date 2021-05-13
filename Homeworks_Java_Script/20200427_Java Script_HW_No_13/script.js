let lightModeBtn = document.querySelector(".light-mode");
let darkModeBtn = document.querySelector(".dark-mode");

document.addEventListener("DOMContentLoaded", () => {
    ((localStorage.getItem("mode")) === "dark") ? enableDarkMode() : enableLightMode();
})

function changeColorScheme (evt) {
    if (evt.target.innerText.trim() === "Light mode") {
        enableLightMode();
        // console.log("LIGHT MODE  On");
    }

    else if (evt.target.innerText.trim() === "Dark mode") {
        enableDarkMode();
        // console.log("DARK MODE  On");
    }
}

lightModeBtn.addEventListener("click", changeColorScheme);
darkModeBtn.addEventListener("click", changeColorScheme);

function enableDarkMode () {
    document.querySelector("body").classList.add("dark");
    localStorage.setItem("mode", "dark");

    let allNodes = document.querySelectorAll("*");
    let allTextNodes = Array.from(allNodes).filter( (item) => {
        return item.nodeName === "DIV" || item.nodeName === "SPAN" || item.nodeName === "P" || item.nodeName === "HEADER"
    });
    // Сначала с помощью querySelectorAll делаем выборку всех элементов на странице. Потом отфильтровываем только text Nodes.
    // Потом каждому текстовому узлу на странице добавляем класс "dark", который отвечает за смену цветовой гаммы.
    allTextNodes.forEach((item) => {
        if (!item.classList.contains("doNotChangeStyle") && !item.parentNode.classList.contains("doNotChangeStyle")) {
            item.classList.add("dark")
        }
    // Если какие-то из узлов я хочу добавить в исключения при смене цветовой схемы dark/light, то этим элементам
    // я добавил отдельный класс doNotChangeStyle, который учитываю при фильтрации.
    });
}

function enableLightMode () {
    document.querySelector("body").classList.remove("dark");
    localStorage.setItem("mode", "light");

    let allNodes = document.querySelectorAll("*");
    let allTextNodes = Array.from(allNodes).filter( (item) => {
        return item.nodeName === "DIV" || item.nodeName === "SPAN" || item.nodeName === "P" || item.nodeName === "HEADER"
    });
    allTextNodes.forEach((item) => {
        item.classList.remove("dark");
    });
}