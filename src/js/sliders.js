var app = app || {};

app.sliders = (function () {

    var details = {
        slider: $('.details__slider'),
        controls: $('.details__paginator')
    }

    var services = {
        slider: $('.services__slider'),
        controls: $('.services__paginator'),
        clickedIndex: null
    }

    function makePaginatorActive(paginators, index) {
        var activeModifier = 'paginator--active';

        paginators.removeClass(activeModifier);
        $(paginators.get(index)).addClass(activeModifier);
    }
     

    return {
        init: function() {
            details.slider.slick({fade: true, arrows: false, autoplay: true, autoplaySpeed: 5000, speed: 500});
            services.slider.slick({fade: true, arrows: false, autoplay: true, autoplaySpeed: 10000, speed: 500});

            details.controls.click(function (event) {
                var slideIndex = $(event.currentTarget).index();
                details.slider.slick('slickGoTo', slideIndex);
                makePaginatorActive(details.controls, slideIndex);
            });
        
            details.slider.on('beforeChange', function (event, slick, lastIndex) {
                var currentIndex = lastIndex === slick.slideCount - 1
                    ? 0
                    : lastIndex + 1;
        
                makePaginatorActive(details.controls, currentIndex);
            });
            
        
            services.controls.click(function (event) {
                var slideIndex = $(event.currentTarget).index();
                services.clickedIndex = slideIndex;
                services.slider.slick('slickGoTo', slideIndex);
                makePaginatorActive(services.controls, slideIndex);
            });
        
            services.slider.on('beforeChange', function (event, slick, lastIndex) {
        
                if(services.clickedIndex) {
                    currentIndex = services.clickedIndex;
                    services.clickedIndex = null;
                } else {
                    var currentIndex = lastIndex === slick.slideCount - 1
                    ? 0
                    : lastIndex + 1;    
                }
                
                makePaginatorActive(services.controls, currentIndex);
        
                if(app.utils.isScrolledIntoView('.services__slider')) {
                    var currentSlide = $('.services__slide').get(currentIndex);
                    $(currentSlide).find('.radial-progress__fill').css('animation-play-state', 'running');
        
                    var slideProgresses = $(currentSlide).find('.radial-progress__percent');
                    
                    app.utils.counterUp(slideProgresses);
                }
            });
        }
    }
})();