'use strict';

var fs   = require('fs')
  , pug = require('pug')
  ;

module.exports = function(template, locals) {
  var pathToTemplate    = __dirname + '/../views/emails/' + template + '.pug'
    , content = fs.readFileSync(pathToTemplate, 'utf-8')
    ;

  var templatePug = pug.compile(content, {
    filename: pathToTemplate,
    pretty: true
  });

  return templatePug(locals);
};
