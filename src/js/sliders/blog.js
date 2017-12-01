var app = app || {};

app.blogSlider = (function () {

    var slider = $('.blog__slider');

    return {
        init: function () {
            slider.slick({
                arrows: false, 
                autoplaySpeed: 5000, 
                speed: 500, 
                dots: true,
                vertical: true,
                verticalSwiping: true,
                dotsClass: 'blog__pagination',
                responsive: [
                    {
                        breakpoint: 750,
                        settings: {
                            vertical: false,
                            verticalSwiping: false,
                            dots: false
                        }
                    }
                ]
            });

            $(document).on('scroll', function() {
                if(app.utils.isScrolledIntoView(slider)) {
                    slider.slick('slickPlay');
                }
            });

            $('.blog__next').on('click', function() {
                slider.slick('slickNext');
            });

            $('.blog__prev').on('click', function() {
                slider.slick('slickPrev');
            });
        }
    }
})();