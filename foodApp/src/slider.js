// $('#top-restaurant-carousel').carousel('pause');

$(window).on('scroll',()=>{
    var scroll = $(window).scrollTop();

    if (scroll >= 350) {
        $(".home-nav").addClass("home-nav-scroll");
    } else {
        $(".home-nav").removeClass("home-nav-scroll");
    }
})