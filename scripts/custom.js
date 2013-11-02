'use strict';

(function() {
  var animationSpeed = 1000,
      beginPosition  = '-2000px',
      endPosition    = 0,
      easing         = 'easeOutBack',
      $leftText      = $('.masthead h1 span.top'),
      $rightText     = $('.masthead h1 span.bottom'),
      $fullLogo      = $('.masthead .full-logo');

  var animation = {
    inLeft: function(cb) {
      cb = cb || function() {};

      $leftText.animate({
        left: endPosition
      }, animationSpeed, easing, cb);
    },

    outLeft: function(cb) {
      cb = cb || function() {};

      setTimeout(function() {

        $leftText.animate({
          left: beginPosition
        }, animationSpeed, easing);

        cb();
      }, 4000);
    },

    inRight: function(cb) {
      cb = cb || function() {};

      $rightText.stop(true, false).animate({
        right: endPosition
      }, animationSpeed, easing, cb);
    },

    outRight: function(cb) {
      cb = cb || function() {};

      $rightText.stop(true, false).animate({
        right: beginPosition
      }, animationSpeed, easing, cb);

      cb();
    },

    bottomUp: function(cb) {
      cb = cb || function() {};

      $fullLogo.stop(true, false).animate({
        bottom: endPosition
      }, animationSpeed, easing, cb);
    }
  };

  if ($('.masthead')) {
    animation.inLeft(
      animation.inRight(
        animation.outLeft(
          animation.outRight
        )
      )
    );
  }
})();
