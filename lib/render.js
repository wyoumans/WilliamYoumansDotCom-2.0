'use strict';

var render = function(res, viewName, locals) {
  if(!locals) {
    locals = {};
  }

  locals.view = viewName;
  locals.bodyClass = viewName.toLowerCase().replace(/\W+/, '-');

  res.render(viewName, locals);
};

module.exports = render;
