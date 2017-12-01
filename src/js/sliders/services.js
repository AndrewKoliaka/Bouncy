var app = app || {};

app.servicesSlider = (function () {
    var slider = $('.services__slider'),
        pagination = $('.services__paginator');

    function animateSlide(slide) {
        var percents = $(slide).find('.radial-progress__percent'),
            fills = $(slide).find('.radial-progress__fill');

        app.utils.counterUp(percents);      
        app.utils.startAnimation(fills);
    }

    return {
        init: function () {

            slider.slick({
                fade: true, 
                arrows: false, 
                autoplaySpeed: 10000, 
                speed: 500,
                responsive: [
                    {
                        breakpoint: 750,
                        settings: {
                            fade: false
                        }
                    }
                ]
            });

            $(document).on('scroll', function () {
                if (app.utils.isScrolledIntoView(slider)) {
                    var activeSlide = $('.services__slide.slick-active');

                    animateSlide(activeSlide);
                    slider.slick('slickPlay');          
                }
            });

            pagination.on('click', function (event) {
                var slideIndex = $(event.currentTarget).index();

                slider.slick('slickGoTo', slideIndex);
                app.utils.makePaginatorActive(pagination, slideIndex);
            });

            slider.on('afterChange', function(event, slick, index) {
                var currentSlide = slider.slick('getSlick').$slides[index];

                app.utils.makePaginatorActive(pagination, index);
                animateSlide(currentSlide);
            });
        }
    }
})();