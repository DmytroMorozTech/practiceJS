let contactBtn = document.querySelector(".btn.contact-us");
contactBtn.addEventListener("click", contactBtnOnClick);

function contactBtnOnClick() {
    document.cookie = "cookie-experiment=novalue";

    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    document.cookie = "expires=" + date;

    let cookies = document.cookie
        .split(";")
        .map(keyValue => keyValue.split("=").map(str => str.trim()))
        .reduce((acc,[key,value]) => ({...acc, [key]: value}) ,{});
    // we have just transform the string with cookies into an object with key:value structure.

    let newUser = cookies["new-user"];
    if (!newUser) {
        document.cookie = "new-user=true";
    }
    else if (newUser) {
        document.cookie = "new-user=false";
    }
}
