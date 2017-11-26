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
                dotsClass: 'testimonials__pagination'
            });

            $(document).on('scroll', function() {
                if(app.utils.isScrolledIntoView(slider)) {
                    slider.slick('slickPlay');
                }
            });
        }
    }
})();