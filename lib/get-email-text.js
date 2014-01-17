'use strict';

var fs   = require('fs')
  , _    = require('lodash')
  ;

module.exports = function(template, locals) {
  var pathToTemplate = __dirname + '/../views/emails/' + template + '.lodash'
    , content  = fs.readFileSync(pathToTemplate, 'utf-8')
    , templateLodash = _.template(content)
    ;

  return templateLodash(locals);
}
