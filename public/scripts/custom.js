'use strict';

(function() {
  var animationSpeed = 1000
    , beginPosition  = '-2000px'
    , endPosition    = 0
    , easing         = 'easeOutBack'
    , $leftText      = $('.masthead h1 span.top')
    , $rightText     = $('.masthead h1 span.bottom');

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

  // initialize plugin
  $('form').validation({
    // pass an array of required field objects
    required: [{
      name: 'contact[name]',
    }, {
      name: 'contact[email]',
      validate: function($el) {
        return $el.val().match('@') !== null;
      }
    }, {
      name: 'contact[message]',
    }],
    fail: function() {
      console.log('failure');
    },
    submit: function(data) {
      console.log('success');
      console.log(data);
    }
  });
})();
