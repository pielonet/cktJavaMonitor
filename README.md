# cktJavaMonitor
A practical interface to Webobjects/Wonder JavaMonitor: controle your apps the easy way!

### Screenshot
![Screenshot](/doc/cktjavamonitor.png?raw=true "Screenshot")

## Excited by the screenshot ? So, here's what you need to go on :

  * An installed Wonder/Webobjects application server with JavaMonitor (Have a look at [JavaMonitor WonderCommunity Page](https://wiki.wocommunity.org/display/documentation/Wonder+JavaMonitor+and+wotaskd))
  * Other requirements are those of the underlying used projects : Apache with [mod_rewrite](http://httpd.apache.org/docs/current/mod/mod_rewrite.html), php5+, modphp5-curl

## It relies upon
Php, Javascript, html, css, The excellent [Bootstrap css framework](http://getbootstrap.com/), The amazing [Sticky Table Headers Jquery Plugin](https://github.com/jmosbech/StickyTableHeaders), The minimalist yet powerful [Epiphany PHP Rest Api Framework](https://github.com/jmathai/epiphany), The outstanding [TableFilter framework](https://github.com/koalyptus/TableFilter), The fabulous [jQuery Framework](https://jquery.com/)

## Let's install

  * Download files to your desired directory.
  * Configure .htaccess in root directory to reflect subdirectory in mod_rewrite configuration : `RewriteBase /mydirectory`
  * Configure your VirtualHost for PHP (php-fcgid is a good choice)
  * Rename `conf/config.default.ini` to `conf/config.ini` and modify to your needs
 
Example configuration for your Apache Virtualhost :
```apache
	<IfModule mod_fcgid.c>
		  <Directory "PATH-TO-YOUR-DIRECTORY/cktjavamonitor/">
		 	#Enable .htaccess files 
			AllowOverride All
			#Add php support by fcgid
			AddHandler	fcgid-script .php
			FcgidWrapper /usr/local/bin/php-wrapper .php
			Options +ExecCGI
			# Customize the next two directives for your requirements
			Order allow,deny
			Allow from XXX.XXX.XXX.XXX
	 	</Directory>
	</IfModule>
```

Example for fcgid wrapper `/usr/local/bin/php-wrapper`
```bash
#!/bin/bash
PHP_FCGI_MAX_REQUESTS=1000
export PHP_FCGI_MAX_REQUESTS
exec /usr/bin/php5-cgi
```
## And finally you use it
Start your browser and open the application's url. You'll find everything very intuitive !

### Hints
To stop the apps you should, in that order: 
  - Turn AutoRecover Off
  - Turn RefuseNewSessions On (and wait until the app closes after every user has disconnected)
 
To start the apps you should, in that order:
  - Turn RefuseNewSessions Off
  - Turn AutoRecover On (the apps should start immediatly)

