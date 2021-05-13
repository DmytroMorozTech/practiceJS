const input = document.querySelector(".price");
input.addEventListener("focus", ()=>{
    input.classList.add("onFocus");
    input.classList.remove("error");
    input.classList.remove("success");
});

input.addEventListener("blur", ()=> { //прописываем логику: что будет, когда уберем с элемента фокус.
    input.classList.remove("onFocus"); // убираем класс onFocus.
    checkInputValue();
});

function checkInputValue () {
    let value = +input.value; // Плюсик перед значением автоматически преобразует его в число.
    if (value<0 || Number.isNaN(value)) {
        input.classList.add("error");
        showErrorMessage(value);
    }
    else {
        input.classList.add("success");
        createSpan(value);
        console.log(value);
        cancelButton.addEventListener("click", ()=> {
            document.body.querySelector("span").remove();
            input.value = "";
        });
    }
}

function showErrorMessage (value) {
        let paragraph = document.getElementById("error-message");
        paragraph.innerText = "Please enter correct price!";
        console.log(`${value} is wrong!`);
        setTimeout(()=> paragraph.innerText="" , 2000);
}

function createSpan (value) {
    if (document.body.querySelector("span")) {
        let span = document.body.querySelector("span");
        span.innerHTML = `Текущая цена: ${value}  <input id ="cancelButton" type="button" value="X">`;
        let cancelButton=document.getElementById("cancelButton");
        console.log(span.innerText);
        return cancelButton;
    }

    else {
    let newSpan = document.createElement("span");
    newSpan.innerHTML=`Текущая цена: ${value}  <input id ="cancelButton" type="button" value="X">`;
    console.log(newSpan.innerText);
    document.body.prepend(newSpan);
    };
}