define(function (require) {

    var presentation = require('presentation');

    presentation.init("MyPresentation", function() {
        presentation.goToFirstSlide();
    });

});