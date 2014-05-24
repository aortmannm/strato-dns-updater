'use strict';

/* globals module, console, __dirname, require */

var fs = require('fs');
var path = require('path');

var getConfigurationPath = function() {
  return path.join(__dirname, '../config/hosts.config');  
}

var getExistingConfiguration = function(cb) {
  try {
    var config = fs.readFileSync(getConfigurationPath(), 'utf8');
    cb(config);
  }
  catch(err) {
    var config = '{ "hosts": [] }';
    cb(config);
  }
};

var saveNewConfiguration = function(config) {
  config = JSON.stringify(config);
  fs.writeFile(getConfigurationPath(), config, function(err) {
    if(err) {
      console.log('Error while writing the configuration file: ', err);
      return;
    }
    console.log('Configuration file is written');
  });
};

var addHost = function(hostname, username, password) {
  getExistingConfiguration(function(data) {
    var newHost = {
      hostname: hostname,
      username: username,
      password: password
    };

    var config = JSON.parse(data);
    config.hosts.push(newHost);

    saveNewConfiguration(config);
  });
};

var checkConfigurationIfHostnameExistAndDeleteIt = function(config, hostname) {
  var hostNameFound = false;
  for(var host in config.hosts) {
    if(config.hosts[host].hostname.indexOf(hostname) > -1) {
      hostNameFound = true;
      config.hosts.splice(host, 1);
    } else {
      hostNameFound = false;
    }
  }
  return hostNameFound;
};

var deleteHost = function(hostname) {
  getExistingConfiguration(function(data) {
    var config = JSON.parse(data);
    
    var hostNameFound = checkConfigurationIfHostnameExistAndDeleteIt(config, hostname);

    if(hostNameFound) {
      saveNewConfiguration(config);
    } else {
      console.log(hostname, 'didn\'t exist');
    }
  });
};

var renewConfigurationWatcher = function(cb) {
  fs.unwatchFile(getConfigurationPath());
  fs.watchFile(getConfigurationPath() , function() {
    cb();
  });
}

var listHosts = function() {
  getExistingConfiguration(function(configuration) {
    configuration = JSON.parse(configuration);
    var hosts = configuration.hosts
    for(var host in hosts) {
      console.log('Host: ', hosts[host].hostname);
    }
  })
};

module.exports.renewConfigurationWatcher = renewConfigurationWatcher;
module.exports.addHost = addHost;
module.exports.getConfiguration = getExistingConfiguration;
module.exports.deleteHost = deleteHost;
module.exports.listHosts = listHosts;