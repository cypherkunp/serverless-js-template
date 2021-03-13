const log = require('lambda-log');

log.options.dynamicMeta = function (message) {
  return {
    timestamp: new Date().toISOString(),
  };
};

if (process.env.DEBUG_LOGGING === 'true') {
  log.options.debug = true;
}

module.exports = log;
