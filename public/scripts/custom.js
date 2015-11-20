'use strict';

$(document).foundation();

$(function() {

  var animationSpeed = 1000,
      endPosition    = 300,
      easing         = 'easeOutBack',
      $topText       = $('.animated-heading h1 span.top'),
      $bottomText    = $('.animated-heading h1 span.bottom');

  var animation = {
    inLeft: function(cb) {
      return function() {
        cb = cb || function() {};

        $topText.animate({
          right: endPosition
        }, animationSpeed, easing, cb);
      }
    },
    inRight: function(cb) {
      return function() {
        cb = cb || function() {};

        $bottomText.stop(true, false).animate({
          left: endPosition
        }, animationSpeed, easing, cb);
      }
    },
    typing: function(cb) {
      cb = cb || function() {};

      $("#typed-text").typed({
        strings: ['small business.', 'startup.', 'online store.', 'agency.', 'big idea!'],
        typeSpeed: 50,
        startDelay: 50,
        backSpeed: 0,
        backDelay: 1000,
        callback: animation.showArrow
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
    },
    showArrow: function() {
      $('.scroll-arrow').fadeIn(500, function() {

        console.log('START JIGGLE');
      });
    }
  };

  if ($('.animated-heading').length) {
    setTimeout(animation.inLeft(animation.inRight(animation.typing)), 1000);

    $('a.scroll-arrow').click(function(e) {
      e.preventDefault();

      console.log('SCROLL DOWN!!!');
    });
  }

  animation.phoneJiggle();
});
