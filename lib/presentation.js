/**
 * Created by andrewapperley on 15-03-22.
 */

define(['jquery', 'Presentation-Slide'], function($, Slide) {

    var baseURL = "./presentation/";
    var presentationFileType = ".json";

    var slides = [];
    var currentSlideIndex = 0;

    return {
        init: function(presentationName, callback) {
            $.getJSON(baseURL+presentationName+presentationFileType).done(function (data) {

                if (data) {
                    $.each(data['slides'], function(index, object) {
                        var slide = new Slide();
                        slides.push(slide);
                    });
                }

                if (callback !== undefined) {
                    callback();
                }

            });
        },
        nextSlide: function() {

        },
        previousSlide: function() {

        },
        goToSlide: function(index) {

        },
        viewSlides: function() {

        }
    };
});