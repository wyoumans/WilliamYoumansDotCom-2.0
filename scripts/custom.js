(function() {
  var animationSpeed = 1000;

  if ($('.masthead')) {
    $('h1 span.top').animate({
      left: 0
    }, animationSpeed, function() {
      $('h1 span.bottom').animate({
        right: 0
      }, animationSpeed);
    });
  }
})();
