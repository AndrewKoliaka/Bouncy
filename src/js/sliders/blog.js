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
                dotsClass: 'blog__pagination'
            });

            $(document).on('scroll', function() {
                if(app.utils.isScrolledIntoView(slider)) {
                    slider.slick('slickPlay');
                }
            });
        }
    }
})();