'use strict';

var winston      = require('winston')
  , fs           = require('fs')
  , config       = require('../config')
  , logDirectory = __dirname + '/../logs'
  , debugFile    = __dirname + '/../logs/debug.log'
  , infoFile     = __dirname + '/../logs/info.log'
  , warnFile     = __dirname + '/../logs/warn.log'
  , errorFile    = __dirname + '/../logs/error.log'
  , exports      = {}
  ;

if (config.logToFile) {
  // ensure directories and files exist for logging
  var logsExist = fs.existsSync(logDirectory);

  if (!logsExist) {
    fs.mkdirSync(logDirectory);

    var firstLine = "File Created at: " + new Date().toString() + "\n\n";

    fs.writeFileSync(debugFile, firstLine);
    fs.writeFileSync(infoFile, firstLine);
    fs.writeFileSync(warnFile, firstLine);
    fs.writeFileSync(errorFile, firstLine);
  }

  var debug = new winston.Logger({
    levels: {
      debug: 0
    },
    transports: [
      new(winston.transports.File)({
        filename: debugFile,
        level: 'debug',
        handleExceptions: false
      })
    ]
  });

  var info = new winston.Logger({
    levels: {
      info: 1
    },
    transports: [
      new(winston.transports.File)({
        filename: infoFile,
        level: 'info',
        handleExceptions: false
      })
    ]
  });

  var warn = new winston.Logger({
    levels: {
      warn: 2
    },
    transports: [
      new(winston.transports.File)({
        filename: warnFile,
        level: 'warn',
        handleExceptions: false
      })
    ]
  });

  var error = new winston.Logger({
    levels: {
      error: 3
    },
    transports: [
      new(winston.transports.File)({
        filename: errorFile,
        level: 'error',
        handleExceptions: true
      })
    ]
  });

  exports = {
    debug: function(msg) {
      debug.debug(msg);
    },
    info: function(msg) {
      info.info(msg);
    },
    warn: function(msg) {
      warn.warn(msg);
    },
    error: function(msg) {
      error.error(msg);
    },
    log: function(level, msg) {
      var lvl = exports[level];
      lvl(msg);
    }
  };

} else {

  exports = new(winston.Logger)({
    transports: [new(winston.transports.Console)({
      colorize: true,
      handleExceptions: true
    })],
    exitOnError: false
  });
}

module.exports = exports;
