'use strict';

(function() {
  var animationSpeed = 1000,
      beginPosition  = '-2000px',
      endPosition    = 0,
      easing         = 'easeOutBack',
      $leftText      = $('.masthead h1 span.top'),
      $rightText     = $('.masthead h1 span.bottom');

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

  if ($('.masthead')) {
    animation.inLeft(
      animation.inRight
    );
  }
})();
