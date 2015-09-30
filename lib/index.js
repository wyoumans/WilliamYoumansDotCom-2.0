'use strict';

module.exports = {
  logger: require('./logger'),
  cronJobs: require('./cron-jobs'),
  render: require('./render'),
  getEmailHTML: require('./get-email-html'),
  getEmailText: require('./get-email-text'),
  assetsVersion: require('./assets-version')
};
