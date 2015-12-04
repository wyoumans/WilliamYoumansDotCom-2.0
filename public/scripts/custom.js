'use strict';

$(document).foundation();

$(function() {

  var animationSpeed = 1000,
    endPosition      = 0,
    easing           = 'easeOutBack',
    $topText         = $('.animated-heading .top'),
    $bottomText      = $('.animated-heading .bottom'),
    $fadeInText      = $('.animated-heading .fade-in-heading');

  // object for all animation functions
  var animation = {

    inLeft: function(cb) {
      return function() {
        cb = cb || function() {};

        $topText.fadeIn({
          queue: false,
          duration: 1500
        }).animate({
          right: endPosition
        }, animationSpeed, easing, cb);
      }
    },

    inRight: function(cb) {
      return function() {
        cb = cb || function() {};

        animation.showArrow();

        $bottomText.fadeIn({
          queue: false,
          duration: 1500
        }).animate({
          left: endPosition
        }, animationSpeed, easing, cb);
      }
    },

    typing: function(cb) {
      cb = cb || function() {};

      $("#typed-text").typed({
        strings: ['small business.', 'startup.', 'online store.', 'design agency.', 'big idea!'],
        typeSpeed: 50,
        startDelay: 50,
        backSpeed: 0,
        backDelay: 1000,
        callback: function() {
          animation.fadeInText(true);
        }
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
      $('.scroll-arrow').fadeIn({
        queue: false,
        duration: 1000
      });
    },

    fadeInText: function(autoScroll) {
      var top = $('.animated-heading .fade-in-heading').css('top');
      top = parseInt(top, 10);

      setTimeout(function() {
        $fadeInText.fadeIn({
          queue: false,
          duration: 1000
        }).animate({
          top: top + 50
        }, animationSpeed, easing);

        // automatically scroll down after pause
        if(autoScroll) {
          setTimeout(function() {
            scrollToDiv('#main-nav', true);
          }, 5000);
        }
      }, 500);
    }
  };

  var jumpToAnimationEnd = function() {
    $topText.show().css('right', endPosition);
    $bottomText.show().css('left', endPosition);
    $('#typed-text').text('big idea!');
    $('.scroll-arrow').show();
    animation.fadeInText(false);
  };

  // header animations
  if ($('.animated-heading').length) {
    $('a.scroll-down').click(function(e) {
      e.preventDefault();

      scrollToDiv('#main-nav', true);
    });

    var hasVisited = $.cookie('hide_animation');

    if(!hasVisited) {
      setTimeout(animation.inLeft(animation.inRight(animation.typing)), 1000);
    } else {
      scrollToDiv('#main-nav', false);
      jumpToAnimationEnd();
    }

    $.cookie('hide_animation', 1, {
      expires: 7
    });
  }

  if ($('body').hasClass('home')) {
    $('.projects .image').mouseenter(function() {
      $(this).find('img.screenshot').stop(true, false).fadeOut(500);
    }).mouseleave(function() {
      $(this).find('img.screenshot').stop(true, false).fadeIn(500);
    });
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
    // window.location.hash = selector;
    document.getElementById(selector.slice(1)).scrollIntoView();
    cb();
  }
};
