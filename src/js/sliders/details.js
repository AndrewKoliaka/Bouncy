var app = app || {};

app.detailsSlider = (function () {

    var slider = $('.details__slider'),
        pagination = $('.details__paginator');

    return {
        init: function () {

            slider.slick({fade: true, arrows: false, autoplaySpeed: 5000, speed: 150});

            $(document).on('scroll', function() {
                if(app.utils.isScrolledIntoView(slider)) {
                    slider.slick('slickPlay');
                }
            });

            pagination.on('click', function (event) {
                var slideIndex = $(event.currentTarget).index();

                slider.slick('slickGoTo', slideIndex);
                app.utils.makePaginatorActive(pagination, slideIndex);
            });

            slider.on('afterChange', function (event, slick, index) {
                app.utils.makePaginatorActive(pagination, index);
            });
        }
    }
})();