var app = app || {};

app.testimonialsSlider = (function () {

    var slider = $('.testimonials__slider');

    return {
        init: function () {
            slider.slick({
                arrows: false, 
                autoplaySpeed: 5000, 
                speed: 500, 
                dots: true, 
                dotsClass: 'testimonials__pagination',
                responsive: [
                    {
                        breakpoint: 750,
                        settings: {
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

            $('.testimonials__prev').on('click', function() {
                slider.slick('slickPrev');
            });

            $('.testimonials__next').on('click', function() {
                slider.slick('slickNext');
            });
        }
    }
})();