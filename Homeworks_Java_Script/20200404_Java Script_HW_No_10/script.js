let passwordEntered = document.getElementById("passwordEntered");
let passwordConfirmation = document.getElementById("passwordConfirmation");

let  showHideIcon1 = passwordEntered.nextElementSibling;
let  showHideIcon2 = passwordConfirmation.nextElementSibling;

showHideIcon1.addEventListener("click", changePwdView);
showHideIcon2.addEventListener("click", changePwdView);

function changePwdView() {
    if (event.target.getAttribute("hide")==="true") {
        event.target.className="fas fa-eye icon-password";
        event.target.setAttribute("hide","false");
        event.target.previousElementSibling.setAttribute("type", "text");
    }
    else if (event.target.getAttribute("hide")==="false") {
        event.target.className="fas fa-eye-slash icon-password";
        event.target.setAttribute("hide","true");
        event.target.previousElementSibling.setAttribute("type", "password");
    }
}

let button = document.querySelector(".btn");
button.addEventListener("click", compareValues);

function compareValues() {
    if (passwordEntered.value===passwordConfirmation.value) {
        alert("You are welcome!");
    }
    else if (passwordEntered.value!==passwordConfirmation.value) {
        let paragraph = document.createElement("p");
        paragraph.innerText="The values of password in both fields should be equal! Please check.";
        paragraph.classList.add("notification");
        document.body.append(paragraph);
        setTimeout(()=> paragraph.innerText="" , 3000);
    }
}