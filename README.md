# A Webobjects/Wonder JavaMonitor alternative

A user interface to Wonder/Webobjects JavaMonitor direct Actions
Lookup [JavaMonitor WonderCommunity Page](https://wiki.wocommunity.org/display/documentation/Wonder+JavaMonitor+and+wotaskd)


## What you need

  * An installed Wonder/Webobjects application server with JavaMonitor
  * Other requirements are those of the underlying used projects : Apache with mod_rewrite, php5+, modphp5-curl

## It relies upon
[The excellent Bootstrap css framework](http://getbootstrap.com/), [The amazing Sticky Table Headers Jquery Plugin](https://github.com/jmosbech/StickyTableHeaders), [The Fabulous Epiphany PHP Rest Api Framework](https://github.com/jmathai/epiphany), [The outstanding TableFilter framework](https://github.com/koalyptus/TableFilter)

## Installation

  * Download files to your desired directory.
  * Configure .htaccess to reflect subdirectory in mod_rewrite configuration : `RewriteBase /mydirectory`
  * Configure your VirtualHost for PHP (php-fcgid is a good choice)
