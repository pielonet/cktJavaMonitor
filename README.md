# The Wonder JavaMonitor alternative

An alternative to WebObjects/Wonder JavaMonitor making use of Wonder JavaMonitor direct Actions [JavaMonitor  WOnderCommunity Page](https://wiki.wocommunity.org/display/documentation/Wonder+JavaMonitor+and+wotaskd)


## What you need

  * An installed Wonder/Webobjects application server with JavaMonitor
  * Other requirements are those of the underlying used projects : Apache with mod_rewrite, php5+, modphp5-curl

## Installation

  * Download files to your desired directory.
  * Configure .htaccess to reflect subdirectory in mod_rewrite configuration : `RewriteBase /mydirectory`
  * Configure your VirtualHost for PHP (php-fcgid is a good choice)
