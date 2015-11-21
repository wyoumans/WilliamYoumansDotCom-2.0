'use strict';

$(document).foundation();

$(function() {

  var animationSpeed = 1000,
      beginPosition  = '-2000px',
      endPosition    = 0,
      easing         = 'swing',
      $leftText      = $('.animated-heading h1 span.top'),
      $rightText     = $('.animated-heading h1 span.bottom');

  var animation = {
    inLeft: function(cb) {
      cb = cb || function() {};

      $leftText.animate({
        left: endPosition
      }, animationSpeed, easing, cb);
    },
    inRight: function(cb) {
      cb = cb || function() {};

      $rightText.stop(true, false).animate({
        right: endPosition
      }, animationSpeed, easing, cb);
    }
  };

  if ($('.animated-heading').length) {
    setTimeout(function() {
      animation.inLeft(
        animation.inRight
      );
    }, 1000);
  }

  var jiggle = setInterval(function() {
    snabbt($('#main-nav li.cta i'), "attention", {
      rotation: [0, 0, Math.PI / 2],
      easing: 'spring',
      springConstant: 1.9,
      springDeacceleration: .9
    });
  }, 4000);
});
