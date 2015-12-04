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
        callback: animation.fadeInText
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

    fadeInText: function() {
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
        setTimeout(function() {
          scrollToDiv('#main-nav', true);
        }, 5000);
      }, 500);
    }
  };

  // header animations
  if ($('.animated-heading').length) {
    // $('.animation-wrapper').height($(window).innerHeight());

    setTimeout(animation.inLeft(animation.inRight(animation.typing)), 1000);

    $('a.scroll-down').click(function(e) {
      e.preventDefault();

      scrollToDiv('#main-nav', true);
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
    $page.scrollTop(top);
    cb();
  }
}
