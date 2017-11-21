var app = app || {};

app.servicesSlider = (function () {
    var slider = $('.services__slider'),
        pagination = $('.services__paginator'),
        clickedIndex = null;

    function animateSlide(slide) {
        var percents = $(slide).find('.radial-progress__percent'),
            fills = $(slide).find('.radial-progress__fill');

        app.utils.startAnimation(fills);
        app.utils.counterUp(percents);
    }

    return {
        init: function () {

            slider.slick({fade: true, arrows: false, autoplaySpeed: 10000, speed: 500});

            $(document).on('scroll', function () {
                var activeSlide = null;

                if (app.utils.isScrolledIntoView(slider)) {
                    slider.slick('slickPlay');
                    activeSlide = $('.services__slide.slick-active');

                    $('.radial-progress__percent').text(function () {
                        return $(this).data('value');
                    });
                    animateSlide(activeSlide);
                }
            });

            pagination.on('click', function (event) {
                var slideIndex = $(event.currentTarget).index();

                clickedIndex = slideIndex;
                slider.slick('slickGoTo', slideIndex);
                app.utils.makePaginatorActive(pagination, slideIndex);
            });

            slider.on('beforeChange', function (event, slick, prevIndex) {
                var currentIndex = null,
                    currentSlide = null,
                    slidePercents = null;

                if (clickedIndex) {
                    currentIndex = clickedIndex;
                    clickedIndex = null;
                } else {
                    currentIndex = prevIndex === slick.slideCount - 1
                        ? 0
                        : prevIndex + 1;
                }

                app.utils.makePaginatorActive(pagination, currentIndex);

                if (app.utils.isScrolledIntoView(slider)) {
                    currentSlide = $('.services__slide').get(currentIndex);
                    animateSlide(currentSlide);
                }
            });
        }
    }
})();