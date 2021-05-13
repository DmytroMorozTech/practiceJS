const button = document.querySelector("#button");
let counter = 0;

button.addEventListener("click", ()=>{
        if (counter>=1) {
            checkInputValue();
        }
        else {
            let info = document.createElement("p");
            let input = document.createElement("input");
            info.innerText = "Пожалуйста введите диаметр круга в пикселях:";
            document.body.append(info);
            document.body.append(input);
            counter++;
        }
});

function checkInputValue () {
    let input=document.querySelector('input:last-child');
    let value = +input.value;
    if (value<0 || Number.isNaN(value)) {
        input.classList.add("error");
        input.classList.remove("success");
        showErrorMessage();
    }
    else {
        input.classList.add("success");
        input.classList.remove("error");
        console.log(value);
        drawCircles(value);
        }
}

function showErrorMessage () {
        let p = document.createElement("p");
        p.innerText = "Пожалуйста введите корректное значение!";
        document.body.append(p);
        setTimeout(()=> document.querySelector("p:last-child").remove() , 2000);
}

function drawCircles (value) {
    let numberOfCircles = 100;
    let div = document.createElement("div");
    div.classList.add("divWithCircles");
    div.style.width=value*10+5*2*10+10+"px";
    //we sum up the width of 10 circles, their margins(5*2*10=100) and padding specified in .divWithCircles (total of 10px).
    div.addEventListener("click", removeOneCircle);
    document.body.append(div);

    for (let i=1; i<=numberOfCircles; i++) {
        let circle = document.createElement("div");
        circle.innerHTML=i;
        circle.classList.add("circle");
        circle.style.height = value + "px";
        circle.style.width = value + "px";

        function r() { return Math.floor(Math.random() * 255) };
        let color = 'rgb(' + r() + "," + r() + "," + r() + ')';
        circle.style.backgroundColor = color;
        div.appendChild(circle);
    };
}

function removeOneCircle () {
    if (event.target === event.currentTarget) return;
    // event.target.style.display="none";
    // this approach doesn't fit us. Circles will not be deleted from DOM-tree. They'll simply get hidden.
    event.currentTarget.removeChild(event.target);
    console.log(event.target);
}

// event.target - the most deeply nested element that caused the event.
// event.currentTarget (=this) – the current element that handles the event (the one that has the handler on it);
// In our case this is div (row 45).