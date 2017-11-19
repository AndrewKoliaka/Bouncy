//= ../../node_modules/jquery/dist/jquery.min.js
//= ../../node_modules/slick-carousel/slick/slick.min.js

$(document)
    .ready(function () {
        var detailsSlider = $('.details__slider'),
            detailsControls = $('.details__control');

        function makeControlActive(controls, index, modifier) {
            controls.removeClass(modifier);
            $(controls.get(index)).addClass(modifier);
        }

        detailsSlider.slick({
            fade: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 500,
        });

        detailsControls.click(function(event) {
            var slideIndex = $(event.currentTarget).index();
            detailsSlider.slick('slickGoTo', slideIndex);
            makeControlActive(detailsControls, slideIndex, 'details__control--active');
        });

        detailsSlider.on('beforeChange', function(event, slick) {
            var nextSlideIndex = slick.currentSlide === 2 ? 0 : slick.currentSlide + 1;
            makeControlActive(detailsControls, nextSlideIndex, 'details__control--active');
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