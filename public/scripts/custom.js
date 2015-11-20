'use strict';

$(document).foundation();

$(function() {

  var animationSpeed = 1000,
      endPosition    = 0,
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

      animation.showArrow();

      $("#typed-text").typed({
        strings: ['small business.', 'startup.', 'online store.', 'design agency.', 'big idea!'],
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
    },
    showArrow: function() {
      $('.scroll-arrow').fadeIn(500, function() {

        console.log('START JIGGLE');
      });
    }
  };

  // header animations
  if ($('.animated-heading').length) {
    $('.animation-wrapper').height($(window).innerHeight());

    setTimeout(animation.inLeft(animation.inRight(animation.typing)), 1000);

    $('a.scroll-arrow').click(function(e) {
      e.preventDefault();

      scrollToDiv('#main-nav', true);
    });

    // ensure the page is loaded at the top
    scrollToDiv('#top', true);
  }

  // phone jiggle
  animation.phoneJiggle();
});

var scrollToDiv = function(selector, withAnimation, cb) {
  cb = cb || function() {};

  var $page  = $('html, body'),
      $div   = $(selector).first(),
      top    = 0,
      offset = $div.offset();

  if (offset) {
    top = offset.top;
  }

  if (withAnimation) {
    $page.animate({
      scrollTop: top
    }, 'fast', cb);
  } else {
    $page.scrollTop(top);
    cb();
  }
}
