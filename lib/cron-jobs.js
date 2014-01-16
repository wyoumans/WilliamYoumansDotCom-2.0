'use strict';

var child_process = require('child_process')
  , logger = require('./logger')
  , Cron = require('cron').CronJob
  , config = require('../config')
  ;

var cronJobTasks = [{
  "title": "Fetch Photos",
  "path": "scripts/fetch-images.js",
  "interval": "0 1 * * *"
}, {
  "title": "Fetch Tracks",
  "path": "scripts/fetch-tracks.js",
  "interval": "0 2 * * *"
}];

module.exports.start = function() {

  cronJobTasks.forEach(function(cronJobTask) {
    new Cron(cronJobTask.interval, function() {
      var child = child_process.fork(__dirname + '/../' + cronJobTask.path, {
        silent: true
      });
      child.on('exit', function(code, details) {
        if (code != 0) {
          logger.error('Cron error: ' + cronJobTask.title, details);
        }
      });
    }, null, true, 'America/Boise');
  });
}
