'use strict';

module.exports = function() {
  return function(req, res, next) {
    res.locals.footerContent = {
      photo: {},
      movie: {},
      track: {}
    };

    next();
  }
}
