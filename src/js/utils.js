var app = app || {};

app.utils = (function () {
    return {
        isScrolledIntoView: function (elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem)
                .offset()
                .top;
            var elemBottom = elemTop + $(elem).height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        },
        counterUp: function (elements) {
            $(elements).each(function(index, el) {
                var target = $(el);

                if(!target.data('isLoaded')) {
                    target.text(function() {
                        return $(this).data('value');
                    });
                    target.counterUp({time: 800, offset: 200});
                    target.data('isLoaded', true)
                }
            });
        },
        makePaginatorActive: function (paginators, index) {
            var activeModifier = 'paginator--active';

            paginators.removeClass(activeModifier);
            $(paginators.get(index)).addClass(activeModifier);
        },
        startAnimation: function (element) {
            $(element).css('animation-play-state', 'running');
        }
    }
})();