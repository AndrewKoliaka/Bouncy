//= ../../node_modules/jquery/dist/jquery.min.js
//= ../../node_modules/slick-carousel/slick/slick.min.js

$(document)
    .ready(function () {
        $('.apps__slider').slick({
            arrows: false,
            autoplay: true
        });

        $('.testimonial__slider').slick({
            arrows: false,
            autoplay: true
        });

        $('.course-info__slider').slick({
            arrows: false,
            autoplay: true
        });

    });