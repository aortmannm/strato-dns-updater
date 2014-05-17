Overview
========

What is this module about ?

Install 
-------


Just install the strato-dns-updater global.
```
npm i -g strato-dns-updater
```

Or clone it from github.
```
git clone git@github.com:aortmannm/strato-dns-updater.git
```

Usage
=====

Create new host that should point to your ip address.
```
strato-dns-updater -h hostname -u user -p password
```

If it's not globally installed just use the index.js
```
node index.js -h hostname -u user -p password
```

It will safe the configuration for this host in the 'hosts.config'.

All hosts in this list will be updated.