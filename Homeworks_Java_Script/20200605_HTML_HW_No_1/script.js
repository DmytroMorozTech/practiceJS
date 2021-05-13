const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade-in");
    })
})

// we block scrolling when drop-down menu is popped up.
window.addEventListener("scroll", (evt)=>{
    if (navLinks.classList.contains("open")) {
        window.scrollTo(0,0);
    }
});