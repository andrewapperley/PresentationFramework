/**
 * Created by andrewapperley on 15-03-22.
 */

define(['jquery', 'Presentation-Slide', 'marked'], function($, Slide, marked) {

    var baseURL = "./presentation/";
    var presentationMetaData = "presentation.json";

    var slidesElement = undefined;
    var slides = [];
    var currentSlideIndex = 0;
    var animating = false;

    return {
        init: function(presentationName, callback) {
            slidesElement = $("#slides");
            if (slidesElement == undefined) {
                var _slidesElement = document.createElement("section");
                _slidesElement.id = "slides";
                $('body').prepend(_slidesElement);
                slidesElement = $("#slides");
            }

            var presentation = this;
            $(document).keyup(function(event) {
                if (animating) {return;}
                switch (event.which) {
                    case 38:
                    case 37:
                        presentation.previousSlide();
                        break;
                    case 39:
                    case 40:
                        presentation.nextSlide();
                }
            });

            $.getJSON(baseURL+presentationName+"/"+presentationMetaData).done(function (data) {

                if (data) {
                    $.each(data['slides'], function(index, object) {
                        var slide = new Slide(object["title"], object["animation"], baseURL+presentationName+"/"+object["slide"]);
                        slide.init();
                        slides.push(slide);
                    });
                }

                if (callback !== undefined) {
                    callback();
                }

            });
        },
        goToFirstSlide: function() {
            animating = true;
            currentSlideIndex = 0;
            slides[currentSlideIndex].render(marked, slidesElement, function() {
                animating = false;
            });
        },
        goToLastSlide: function() {
            animating = true;
            currentSlideIndex = slides.length-1;
            slides[currentSlideIndex].render(marked, slidesElement, function() {
                animating = false;
            });
        },
        nextSlide: function() {
            animating = true;
            slides[currentSlideIndex].showOut(slidesElement, function() {
                ++currentSlideIndex;
                if (currentSlideIndex >= slides.length) {currentSlideIndex = 0;}
                slides[currentSlideIndex].render(marked, slidesElement, function() {
                    animating = false;
                });
            });

        },
        previousSlide: function() {
            animating = true;
            slides[currentSlideIndex].showOut(slidesElement, function() {
                --currentSlideIndex;
                if (currentSlideIndex < 0) {currentSlideIndex = slides.length-1;}
                slides[currentSlideIndex].render(marked, slidesElement, function() {
                    animating = false;
                });
            });
        },
        goToSlide: function(index) {

        },
        viewSlides: function() {

        }
    };
});