'use strict';

(function() {
  var animationSpeed = 1000,
      beginPosition  = '-2000px',
      endPosition    = 0,
      easing         = 'easeOutBack',
      $leftText      = $('h1 span.top'),
      $rightText     = $('h1 span.bottom');

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
    },

    bottomUp: function() {
      cb = cb || function() {};

      cb();
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
