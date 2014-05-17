Overview
========

A node program to update the dynamic dns ip address of your domains and subdomains.

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

It will safe the configuration for this host in the 'hosts.config'.

All hosts in this list will be updated.

Base configuration file needs to look like this.
```
{"hosts":[]}
```
It should be in ./config/hosts.config