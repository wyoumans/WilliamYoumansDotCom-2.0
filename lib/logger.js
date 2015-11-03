'use strict';

var winston      = require('winston')
  , fs           = require('fs')
  , config       = require('../config')
  , logDirectory = __dirname + '/../logs'
  , infoFile     = __dirname + '/../logs/info.log'
  , warnFile     = __dirname + '/../logs/warn.log'
  , errorFile    = __dirname + '/../logs/error.log'
  , transports   = []
  ;

if (config.logToFile) {
  // ensure directories and files exist for logging
  var logsExist = fs.existsSync(logDirectory);

  if (!logsExist) {
    fs.mkdirSync(logDirectory);

    var firstLine = "File Created at: " + new Date().toString() + "\n\n";

    fs.writeFileSync(infoFile, firstLine);
    fs.writeFileSync(warnFile, firstLine);
    fs.writeFileSync(errorFile, firstLine);
  }

  transports.push(new(winston.transports.File)({
    name: 'file#info',
    timestamp: true,
    filename: infoFile,
    level: 'info',
    handleExceptions: false
  }));

  transports.push(new(winston.transports.File)({
    name: 'file#warn',
    timestamp: true,
    filename: warnFile,
    level: 'warn',
    handleExceptions: false
  }));

  transports.push(new(winston.transports.File)({
    name: 'file#error',
    timestamp: true,
    filename: errorFile,
    level: 'error',
    handleExceptions: true
  }));
} else {

  transports.push(new(winston.transports.Console)({
    colorize: true,
    handleExceptions: true
  }));
}

var logger = new(winston.Logger)({
  transports: transports,
  exitOnError: false
});

module.exports = logger;
