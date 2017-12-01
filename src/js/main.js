//= ../../node_modules/jquery/dist/jquery.min.js
//= ../../node_modules/slick-carousel/slick/slick.min.js
//= ../../node_modules/scrollreveal/dist/scrollreveal.min.js
//= ../../node_modules/waypoints/lib/jquery.waypoints.min.js
//= ../../node_modules/jquery.counterup/jquery.counterup.min.js
//= ../../node_modules/isotope-layout/dist/isotope.pkgd.min.js

var app = {};

//= utils.js
//= sliders/details.js
//= sliders/services.js
//= sliders/team.js
//= sliders/testimonials.js
//= sliders/blog.js

$(document).ready(function () {

        var scrollTopBtn = $('.scroll-top');

        // fade in effect on scrolling
        var sr = ScrollReveal({
            delay: 300,
            mobile: false
        });

        sr.reveal('.section__container');
        sr.reveal('.projects');
        sr.reveal('.map');
        sr.reveal('.footer');

        app.detailsSlider.init();
        app.servicesSlider.init();
        app.teamSlider.init();
        app.testimonialsSlider.init();
        app.blogSlider.init();

        var mosaic = $('.portfolio__mosaic');

        mosaic.isotope({
            itemSelector: '.portfolio-work',
            percentPosition: true
        });

        $('.portfolio__nav-link').on('click', function(event){
            event.preventDefault();
            var selector = $(this).attr('data-filter');
            mosaic.isotope({ filter: selector });
            return false;
        });

        $('.portfolio__nav-link').first().focus();

        $('.map__overlay').on('click', function() {
            $(this).hide();
        });

        $('.header__link').on('click', function() {
            if($('.header__toggle-btn').is(':visible')) {
                $('.header__list').slideToggle();    
            }
        });

        $('.header__toggle-btn').on('click', function() {
            $('.header__list').slideToggle();
        });

        $(document).on('scroll', function() {
            if($(this).scrollTop() > 700) {
                scrollTopBtn.fadeIn();
            } else {
                scrollTopBtn.fadeOut();
            }
        });

        $(window).on('resize', function() {
            if($(this).outerWidth() > 1000) {
                $('.header__list').removeAttr('style');
            }
        });

        // smooth transition effect between sections after click on link
        $("a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash)
                        .offset()
                        .top
                }, 700, function () {
                    window.location.hash = hash;
                });
            }
        });
    });