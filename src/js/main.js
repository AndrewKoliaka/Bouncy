//= ../../node_modules/jquery/dist/jquery.min.js
//= ../../node_modules/slick-carousel/slick/slick.min.js
//= ../../node_modules/scrollreveal/dist/scrollreveal.min.js
//= ../../node_modules/waypoints/lib/jquery.waypoints.min.js
//= ../../node_modules/jquery.counterup/jquery.counterup.min.js

var app = {};

//= utils.js
//= sliders.js

$(document)
    .ready(function () {

        var progressNumbers = $('.radial-progress__percent')

        // fade in effect on scrolling
        var sr = ScrollReveal({
            delay: 300,
            mobile: false
        });

        app.sliders.init();

        sr.reveal('.section__container');

        $(document).on('scroll', function() {


            if(app.utils.isScrolledIntoView('.services__slider')) {

                $('.radial-progress__percent').text(function() {
                    return $(this).data('value');
                });

                var activeSlide = $('.services__slide.slick-active');
                var percents = activeSlide.find('.radial-progress__percent');
                var fills = activeSlide.find('.radial-progress__fill');

                for(var i = 0; i < fills.length; i++) {
                    $(fills[i]).css('animation-play-state', 'running');
                }

                app.utils.counterUp(percents);
            }
        });

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