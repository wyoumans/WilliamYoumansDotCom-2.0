(function() {
  var animationSpeed = 1000
    , easing = 'easeOutBack';

  if ($('.masthead')) {
    $('h1 span.top').animate({
      left: 0
    }, animationSpeed, easing, function() {
      $('h1 span.bottom').animate({
        right: 0
      }, animationSpeed, easing);
    });
  }
})();

function inLeft() {

}

function outLeft() {

}

function inRight() {

}

function outRight() {

}

