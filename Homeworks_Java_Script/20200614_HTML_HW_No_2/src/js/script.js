const menuBtn = document.querySelector(".header__btn");
const navLinks = document.querySelector(".header__links");
const links = document.querySelectorAll(".header__links li");
let offsetY;

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade-in");
    })
})
