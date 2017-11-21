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
        counterUp: function(elements) {
            for(var i = 0; i < elements.length; i++) {
                
                if(!$(elements[i]).data('isLoaded')) {
                    $(elements[i]).counterUp({
                        time: 800,
                        offset: 200
                    });

                    $(elements[i]).data('isLoaded', true)
                }

            }
        }
    }
})();