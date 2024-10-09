// import axiosDebug from 'axios-debug-log';
const axiosDebug = require('axios-debug-log');

axiosDebug({
  request: function (debug, config) {
    debug(`Request with ${config.method.toUpperCase()} ${config.url}`);
    debug('Request with ' + config.headers['content-type'] + config.url);
    // return config;
  },
  response: function (debug, response) {
    debug(`Response from ${response.config.url}: ${response.status} ${response.statusText}`);
    debug('Response with ' + response.headers['content-type'], 'from ' + response.config.url);
    // return response;
  },
  error: function (debug, error) {
    debug(`Error ${error.message}`);
    // return Promise.reject(error);
  },
});

module.exports = axiosDebug;
