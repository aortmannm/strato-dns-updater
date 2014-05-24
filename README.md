Overview
========

A node program to update the dynamic dns ip address of your domains and subdomains. When strato-dns-updater is running as a service it's possible to use it in the same time in the cli. You can add or list the existing hosts. And the service will realize it and load the new configuration.

Install 
-------


Just install the strato-dns-updater globally.
```
npm i -g strato-dns-updater
```

Or clone it from github.
```
git clone git@github.com:aortmannm/strato-dns-updater.git
```

Usage
=====

Help
```
node index.js --help
or if globally installed
strato-dns-updater --help
```

Create new host that should point to your ip address.
```
node index.js -h hostname -u user -p password
or if globally installed
strato-dns-updater index.js -h hostname -u user -p password
```

Start update process (default interval is every 5 minutes)
```
node index.js -s
or if globally installed
strato-dns-updater -s
```

Delete an existing host out of the configuration
```
node index.js -d host
or if globally installed
strato-dns-updater -d host
```

List existing hosts
```
node index.js -l
or if globally installed
strato-dns-updater -l
```

Configuration file can be found in.
```
 <homedir>/hosts.config
```


Changelog
=========

v0.5.2
------
- The configuration file is saved in the home directory of the user
- npm update -g strato-dns-updater won't delete your configuration file

v0.5.0
------
- adding new hosts and the configuration will update automaticly
- listing hosts