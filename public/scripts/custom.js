'use strict';

$(document).foundation();

$(function() {

  var animationSpeed = 1000,
      beginPosition  = '-2000px',
      endPosition    = 0,
      easing         = 'easeOutBack',
      $leftText      = $('.animated-heading h1 span.top'),
      $rightText     = $('.animated-heading h1 span.bottom');

  var animation = {
    inLeft: function(cb) {
      return function() {
        cb = cb || function() {};

        $leftText.animate({
          left: endPosition
        }, animationSpeed, easing, cb);
      }
    },
    inRight: function(cb) {
      return function() {
        cb = cb || function() {};

        $rightText.stop(true, false).animate({
          right: endPosition
        }, animationSpeed, easing, cb);
      }
    },
    typing: function(cb) {
      cb = cb || function() {};

      $("#typed-text").typed({
        strings: ['small business.', 'startup.', 'agency.'],
        typeSpeed: 50,
        startDelay: 50,
        backSpeed: 0,
        backDelay: 1000
      });
    },
    phoneJiggle: function() {
      setInterval(function() {
        return snabbt($('#main-nav li.cta i'), "attention", {
          rotation: [0, 0, Math.PI / 2],
          easing: 'spring',
          springConstant: 1.9,
          springDeacceleration: .9
        });
      }, 4000);
    }
  };

  if ($('.animated-heading').length) {
    setTimeout(animation.inLeft(animation.inRight(animation.typing)), 1000);
  }

  animation.phoneJiggle();
});
