/**
 * Created by andrewapperley on 15-03-22.
 */

define("Presentation-Slide", ['jquery'], function($) {

    function PresentationSlide(title, animation, slideDataPath) {

        if (!(this instanceof PresentationSlide)) {
            throw new TypeError("Cannot be called as a function!");
        }

        this.title = title;
        this.animation = animation;
        this.slideDataPath = slideDataPath;
        this.slideData = "";
    }

    function slideAnimation(container, direction, out, data, callback) {
        var parent = $(window);
        var animation = {opacity: 1, filter: "alpha(opacity=100)"};

        switch(direction) {
            case "top":
                animation.top = (out) ? parent.height()+"px" : 0+"px";
                container.css({top: (!out) ? -parent.height()+"px" : 0+"px"});
                break;
            case "bottom":
                animation.top = (out) ? -parent.height()+"px" : 0+"px";
                container.css({top: (!out) ? parent.height()+"px" : 0+"px"});
                break;
            case "left":
                animation.left = (out) ? -parent.width()+"px" : 0+"px";
                container.css({left: (!out) ? -parent.width()+"px" : 0+"px"});
                break;
            case "right":
                animation.left = (out) ? parent.width()+"px" : 0+"px";
                container.css({left: (!out) ? parent.width()+"px" : 0+"px"});
                break;
        }



        if (!out) {
            container.html(data);
            container.css({display: "block"});
        }

        container.animate(animation, "slow", function() {
            callback();
        });
    }

    function fadeAnimation(container, out, data, callback) {

        function finishFade() {
            callback();
        }

        container.css({left: 0+"px", top: 0+"px", display: "block"});

        if (out) {
            container.fadeOut("slow", function () {
                finishFade();
            });
        } else {
            container.fadeOut(0, function() {
                container.html(data);
                container.fadeIn(1000, function() {
                   finishFade();
                });
            });
        }

    }

    PresentationSlide.prototype = {
        init: function() {
            var slide = this;
            $.ajax({
                url: this.slideDataPath,
                success: function(data) {
                    slide.slideData = data;
                },
                async:false
            });
        },
        render: function(marked, slideContainer, callback) {
            if (this.slideData != "") {
                var _renderData = marked(this.slideData);
                if (this.animation == undefined) {
                    slideContainer.html(_renderData);
                } else {
                    switch(this.animation.type) {
                        case "fade":
                            fadeAnimation(slideContainer, false, _renderData, function() {
                                callback();
                            });
                            break;
                        case "slide":
                            slideAnimation(slideContainer, this.animation.direction, false, _renderData, function() {
                                callback();
                            });
                            break;
                    }
                }

            }
        },
        showOut: function(slideContainer, callback) {
            switch(this.animation.type) {
                case "fade":
                    fadeAnimation(slideContainer, true, null, function() {
                        callback();
                    });
                    break;
                case "slide":
                    slideAnimation(slideContainer, this.animation.direction, true, null, function() {
                        setTimeout(function() {
                            callback();
                        }, 300);
                    });
                    break;
            }
        }
    };

    return PresentationSlide;

});