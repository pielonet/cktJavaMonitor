# A Webobjects/Wonder JavaMonitor alternative

A user interface to Wonder/Webobjects JavaMonitor direct Actions

Have a look to [JavaMonitor WonderCommunity Page](https://wiki.wocommunity.org/display/documentation/Wonder+JavaMonitor+and+wotaskd) for details.


## What you need

  * An installed Wonder/Webobjects application server with JavaMonitor
  * Other requirements are those of the underlying used projects : Apache with mod_rewrite, php5+, modphp5-curl

## It relies upon
[The excellent Bootstrap css framework](http://getbootstrap.com/), [The amazing Sticky Table Headers Jquery Plugin](https://github.com/jmosbech/StickyTableHeaders), [The Fabulous Epiphany PHP Rest Api Framework](https://github.com/jmathai/epiphany), [The outstanding TableFilter framework](https://github.com/koalyptus/TableFilter)

## Let's install

  * Download files to your desired directory.
  * Configure .htaccess in root directory to reflect subdirectory in mod_rewrite configuration : `RewriteBase /mydirectory`
  * Configure your VirtualHost for PHP (php-fcgid is a good choice)
 
## And finally you use it
Start your browser and open the application's url. You'll find everything very intuitive !

### Hints
To stop the apps you should, in that order: 
  - Turn AutoRecover Off
  - Turn RefuseNewSessions On (and wait until the app closes after every user has disconnected)
To startuo apps you should, in that order:
  - Turn RefuseNewSessions Off
  - Turn AutoRecover On (the apps should start immediatly)
