$(document).ready(function() {
    $("a[href='#mostPopularPosts']").on("click",(evt) => {
        evt.preventDefault();
        let top = $("a[name='mostPopularPosts']").offset().top;
        $("html, body").animate({scrollTop: top}, 500);
    });

    $("a[href='#mostPopularClients']").on("click",(evt) => {
        evt.preventDefault();
        let top = $("a[name='mostPopularClients']").offset().top;
        $("html, body").animate({scrollTop: top}, 1000);
    });

    $("a[href='#topRated']").on("click",(evt) => {
        evt.preventDefault();
        let top = $("a[name='topRated']").offset().top;
        $("html, body").animate({scrollTop: top}, 1000);
    });

    $("a[href='#hotNews']").on("click",(evt) => {
        evt.preventDefault();
        let top = $("a[name='hotNews']").offset().top;
        $("html, body").animate({scrollTop: top}, 1000);
    });


    $('#hideShowSection').on('click', (evt)=> {
        evt.preventDefault();
        $("section.most-popular-posts").slideToggle(1000);
    })

    $('#scrollUpBtn').on('click',(evt) => {
        evt.preventDefault();
        $("html, body").animate({scrollTop: 0}, 300);
    });

    let btnStatusActive = false;
    let $win = $(window);
    $win.on('scroll', function() {
        // console.log($win.scrollTop());
        // console.log('WinHeight: ' + $win.height());
        if ($win.scrollTop()>$win.height() && btnStatusActive===false) {
            $('#scrollUpBtn').fadeToggle(1000,"swing");
            btnStatusActive=true;
        }
        if ($win.scrollTop()<=$win.height() && btnStatusActive===true) {
            $('#scrollUpBtn').fadeToggle(1000,"swing");
            btnStatusActive=false;
        }
    })
});