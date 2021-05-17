const allImages = Array.from(document.querySelectorAll('.pictures img'));

// Кнопки
const pauseSlideShow = document.getElementById("pauseSlideShow");
const resumeSlideShow = document.getElementById("resumeSlideShow");

//Счетчик, который отвечает за текущее положение слайдера: какое изображение отображается в данный момент.
let counter = 0;
let pauseBtnClicked = 0;
let resumeBtnClicked = 0;
let slideShowId;
let stopShowingImgId;
let setDateTimeId;

slideShow(); // первый запуск функции.
countDownTimer(); // первый запуск таймера обратного отсчета.

function slideShow () {
    let currentImage = allImages[counter];
    currentImage.style.visibility = "visible";
    currentImage.style.animationName = "fade";
    stopShowingImgId = setTimeout(stopShowingImg,10000, currentImage);
    counter++;
    if (counter===4) {counter=0};
    // Данная функция отвечает за смену картинок в слайдере с указанным интервалом времени и заданными эффектами.
}

slideShowId = setInterval(slideShow, 10000);// запускаем функцию переодически с указанным интервалом времени.

function stopShowingImg (currentImg) {
    currentImg.style.visibility = "hidden";
    currentImg.style.animationName = "none";
}

pauseSlideShow.addEventListener("click", pauseSlides); // Event handler для кнопки "Прекратить".
resumeSlideShow.addEventListener("click", resumeSlides);// Event handler для кнопки "Возобновить показ".

function pauseSlides () {
    if (pauseBtnClicked>0) {return false};
    clearInterval(slideShowId);
    clearTimeout(stopShowingImgId);
    clearTimeout(setDateTimeId); // останавливаем таймер обратного отсчета.
    counter = counter === 0 ? 3 : counter -1;
    // здесь мы как-бы "отматываем" counter на одну позицию назад, так как
    // в функции slideShow он был инкрементирован на единицу (с целью продолжения слайд-шоу).
    console.log(`counter: ` + counter);
    allImages[counter].style.animationName="none";
    allImages[counter].style.animationIterationCount="unset";
    pauseBtnClicked++;
    resumeBtnClicked=0;
    // мы остлеживаем количество кликов по кнопкам "Прекратить" и "Возобновить показ". Если по любой из кнопок
    // user нажмет более одного раза, то отработает код только для первого клика. Для второго клика - ничего не произойдет.
    // Это позволит избежать багов.
}

function resumeSlides() {
    if (resumeBtnClicked>0) {return false};
    allImages[counter].style.animationName="fade";
    allImages[counter].style.animationIterationCount="infinite";
    slideShow();
    slideShowId = setInterval(slideShow, 10000);
    resumeBtnClicked++;
    pauseBtnClicked=0;

    resetTimerData(); // Обнуляем все исходные данные таймера перед перезапуском.
    countDownTimer();
}

// Ниже реализован таймер обратного отсчета с точностью до миллисекунд.

let startTime = new Date().getTime();
let endTime = 0;
let timePassed = 0;
let timeDiff = 0;
// console.log(`startTime: ` + startTime);

function countDownTimer () {
    let seconds = document.getElementById("seconds");
    let milliseconds = document.getElementById("milliseconds");

    let s = 9;
    let ms = 1000;
    let i = 1;

    setDate();

    function setDate() {

        is_int(i);
        let innerSeconds = Math.floor(s).toString().padStart(2, "0");
        seconds.innerHTML = '<strong>' + innerSeconds + '</strong>';

        isZero(ms);
        milliseconds.innerHTML = '<strong>' + ms + '</strong>';

        setDateTimeId = setTimeout(setDate, 10);
        // рекурсивно вызываем функцию setDate каждые 10 миллисекунд.
    }

    function is_int(value) {
        if ((parseFloat(value / 100) == parseInt(value / 100)) && !isNaN(value)) {
        // если i (кол-во выполненных циклов по 10мс) кратно 100, то есть если прошли очередные 100 циклов по 10мс.
            i++;
            timePassed += 1000;
            // console.log(timePassed);
            endTime = new Date().getTime();
            // console.log(`endTime: ` + endTime)
            timeDiff = (endTime - startTime) - timePassed;
            // timeDiff - это то дополнительное время, которое процессор затратил, чтобы отрисовать 1000мс.
            // Мы должны вычесть timeDiff из общего времени выполнения следующего цикла. Получится 1000 - timeDiff.
            // console.log(`timeDiff: ` + timeDiff);

            s -= 1;
            if (s === -1) {
                s = 9
            }
            ;

            } else {
                i++;
            }
        // Это функция-помощник, которая отслеживает, когда нужно декрементировать секунды на единицу.
        // Каждые 10мс рекурсивно запускается функция setDate(), которая, в свою очередь, запускает эту функцию.
        // Как только i становится кратным 100, это означает, что прошло 100 циклов по 10 миллисекунд, то есть 1 секунда.
        // А значит нужно уменьшить количество секунд на единицу (  s-= 1; ).
    };

    function isZero(value) {
        if (value == 0 || value<0) {
            timeDiff = Math.round(timeDiff / 10) * 10;
            ms = 1000 - timeDiff;
            i = timeDiff/10;
            // console.log(`timeDiff: ` + timeDiff);
        } else {
            ms -= 10;
        }
    };
}

function resetTimerData () {
    s = 9;
    ms = 1000;
    i = 1;
    startTime = new Date().getTime();
    endTime = 0;
    timePassed = 0;
    timeDiff = 0;
};