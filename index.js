'use strict';

/* globals console, require, process */

var program = require('commander');

program
  .version('0.5.0')
  .option('-h, --hostname <hostname>', 'The hostname that will be updated (e.g. mySubdomain.testDomain.com)')
  .option('-u, --username <username>', 'The username for your domain')
  .option('-p, --password <password>', 'The password for your domain')
  .option('-s, --start', 'It will start the update process')
  .option('-l, --list', 'It will list the existing hosts')
  .option('-d, --delete <delete>', 'The hostname to delete out of the configuration')
  .option('-i, --interval <interval>', 'The interval for the update procedure. If -i is not specified it is every 5 minutes')
  .parse(process.argv);

var hostname = program.hostname;
var username = program.username;
var password = program.password;

if(process.argv.length === 2)
  program.help();

if(program.start) {
  var updater = require('./lib/updater');
  if(program.interval)
    updater.start(program.interval);
  else
    updater.start();
}

var config = require('./lib/config');

if(program.list) {
  config.listHosts();
}

if(hostname && username && password) {
  console.log('You added a new host to refresh. Hostname:', program.hostname, 'Username:', program.username, 'Password:', program.password);
  config.addHost(hostname, username, password);
}

var hostnameToDelete = program.delete;
if(hostnameToDelete)
  config.deleteHost(hostnameToDelete);