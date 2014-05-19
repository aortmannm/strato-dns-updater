'use strict';

/* globals require, module, console, process */

var superagent = require('superagent');

var config = require('./config');

var buildUpdateUrl = function(host) {
  return 'https://' + host.username + ':' + host.password + '@dyndns.strato.com/nic/update?hostname=' + host.hostname;
};

var updateDyanmicDnsIP = function(host) {
  var updateUrl = buildUpdateUrl(host);
  superagent
    .get(updateUrl)
    .end(function(err, res) {
      if(err) {
        return console.log(err);
      }
      if(res.text.indexOf('badauth') > -1)
        console.log('Wrong login informations: ', res.text);

      if(res.text.indexOf('abuse') > -1)
        console.log('Too much update requests or it\'s still the same IP: ', res.text);

      if(res.text.indexOf('good') > -1)
        console.log('IP is successfully updated: ', res.text);

    });
};

var goThrowAllHosts = function(config) {
  var hosts = config.hosts;
  if(hosts.length === 0) {
    console.log('Host configuration is empty, first add an host to update');
    process.exit();
  }

  for(var host in hosts) {
    updateDyanmicDnsIP(hosts[host]);
  }
};

var setUpdateIntervalAndStartUpdating = function(config, minutes) {
  goThrowAllHosts(config);
  setInterval(function() {
    goThrowAllHosts(config);
  }, minutes);
};

var startUpdating = function(interval) {
  config.getConfiguration(function(data) {
    config = JSON.parse(data);

    var specifiedInterval = interval || 5;
    var minutes = 1000 * 60 * specifiedInterval;

    setUpdateIntervalAndStartUpdating(config, minutes);
  });
};

module.exports.start = startUpdating;