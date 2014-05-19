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
    .end(function(res) {
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
    console.log('Host configuration is empty');
    process.exit();
  }

  for(var host in hosts) {
    updateDyanmicDnsIP(hosts[host]);
  }
};

var setUpdateInterval = function(config, minutes) {
  try {
    setInterval(function() {
      goThrowAllHosts(config);
    }, minutes);
  }
  catch(err) {
    console.log('Internet is disconnected, restry in specified interval. Error: ', err);
    setUpdateInterval(config, minutes);
  }
};

var startUpdating = function(interval) {
  config.getConfiguration(function(data) {
    config = JSON.parse(data);

    var specifiedInterval = 5 || interval;
    var minutes = 1000 * 60 * specifiedInterval;

    goThrowAllHosts(config);
    setUpdateInterval(config, minutes);
    
  });
};

module.exports.start = startUpdating;