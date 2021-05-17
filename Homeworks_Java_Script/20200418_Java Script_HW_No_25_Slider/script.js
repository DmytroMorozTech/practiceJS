const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// Кнопки
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

//Счетчик, который отвечает за текущее положение слайдера: какое изображение отображается в данный момент.
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px';

//Обработчики событий
nextBtn.addEventListener('click', ()=> {
    if (counter>=carouselImages.length-1) return;
    // если очень быстро кликать по кнопке "Next", то не будет успевать отрабатывать обработчик событий, назначенный на событие "transitionend".
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px';
});

previousBtn.addEventListener('click', ()=> {
    if (counter<=0) return;
    // если очень быстро кликать по кнопке "Previous", то не будет успевать отрабатывать обработчик событий, назначенный на событие "transitionend".
    // эта строка (if (counter<=0) return)  нужна, чтобы устранить этот баг.
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px';
});

carouselSlide.addEventListener('transitionend', () => {
   if (carouselImages[counter].id==="lastClone") {
       carouselSlide.style.transition = "none";
       counter = carouselImages.length - 2;
       carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px';
   }
    if (carouselImages[counter].id==="firstClone") {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px';
    }
});