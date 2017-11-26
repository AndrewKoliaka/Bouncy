//= ../../node_modules/jquery/dist/jquery.min.js
//= ../../node_modules/slick-carousel/slick/slick.min.js
//= ../../node_modules/scrollreveal/dist/scrollreveal.min.js
//= ../../node_modules/waypoints/lib/jquery.waypoints.min.js
//= ../../node_modules/jquery.counterup/jquery.counterup.min.js
//= ../../node_modules/isotope-layout/dist/isotope.pkgd.min.js

var app = {};

//= utils.js
//= sliders/details.js
//= sliders/services.js
//= sliders/team.js
//= sliders/testimonials.js
//= sliders/blog.js

$(document).ready(function () {

        // fade in effect on scrolling
        var sr = ScrollReveal({
            delay: 300,
            mobile: false
        });

        sr.reveal('.section__container');
        sr.reveal('.projects');

        app.detailsSlider.init();
        app.servicesSlider.init();
        app.teamSlider.init();
        app.testimonialsSlider.init();
        app.blogSlider.init();

        var mosaic = $('.portfolio__mosaic');

        mosaic.isotope({
            itemSelector: '.portfolio-work',
            percentPosition: true
        });

        $('.portfolio__nav-link').on('click', function(event){
            event.preventDefault();
            var selector = $(this).attr('data-filter');
            mosaic.isotope({ filter: selector });
            return false;
        });

        $('.map__overlay').on('click', function() {
            $(this).hide();
        });

        // smooth transition effect between sections after click on link
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