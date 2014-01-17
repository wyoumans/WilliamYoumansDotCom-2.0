'use strict';

var fs   = require('fs')
  , jade = require('jade')
    ;

module.exports = function(template, locals) {
  var pathToTemplate    = __dirname + '/../views/emails/' + template + '.jade'
    , content = fs.readFileSync(pathToTemplate, 'utf-8')
    ;

  var templateJade = jade.compile(content, {
    filename: pathToTemplate,
    pretty: true
  });

  return templateJade(locals);
};
