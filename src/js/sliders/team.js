var app = app || {};

app.teamSlider = (function () {

    var slider = $('.team__slider');

    function animate(index) {
        var currentSlide = slider.slick('getSlick').$slides[index];
        var fills = $(currentSlide).find('.progress__fill');
        app.utils.startAnimation(fills);
    }

    return {
        init: function () {

            slider.slick({
                arrows: false, 
                autoplaySpeed: 5000, 
                speed: 500, 
                dots: true, 
                dotsClass: 'team__pagination',
                responsive: [
                    {
                        breakpoint: 750,
                        settings: {
                            dots: false
                        }
                    }
                ]
            });

            $(document).on('scroll', function () {
                if (app.utils.isScrolledIntoView(slider)) {
                    slider.slick('slickPlay');
                    animate(slider.slick('slickCurrentSlide'));
                }
            });

            slider.on('afterChange', function(event, slick, index) {
                animate(index);
            });

            $('.team__next').on('click', function() {
                slider.slick('slickNext');
            });

            $('.team__prev').on('click', function() {
                slider.slick('slickPrev');
            });
        }
    }
})();