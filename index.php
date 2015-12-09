<?php
//Include Epiphany library
include_once './lib/epiphany/src/Epi.php';
Epi::setPath('base', './lib/epiphany/src');
Epi::init('template');
Epi::init('config');
Epi::init('api');
//Epi::setSetting('exceptions', true);

//Include Application classes and configuration
include_once './controlers/api.class.php';
include_once './controlers/site.class.php';
Epi::setPath('view', './views');
Epi::setPath('config', './conf');
getConfig()->load('config.ini');

//Include plugin classes and configuration
$dir = new DirectoryIterator(dirname(__FILE__) . '/plugins');
foreach ($dir as $fileinfo) {
    if (!$fileinfo->isDot() && $fileinfo->isDir()) {
        $file = $fileinfo->getFilename();
        include_once './plugins/' . $file . '/index.php';
    }
}

/*
 * We create 1 normal route (think of these are user viewable pages).
 * We also create 7 api routes (this of these as data methods).
 *  The beauty of the api routes are they can be accessed natively from PHP
 *    or remotely via HTTP.
 *  When accessed over HTTP the response is json.
 *  When accessed natively it's a php array/string/boolean/etc.
 */

//getApi()->get('/version.json', array('Api', 'getVersion'), EpiApi::external);
getApi()->get('/info/((\w|-)+)', array('Api', 'info'), EpiApi::external);
getApi()->get('/start/((\w|-)+)', array('Api', 'start'), EpiApi::external);
getApi()->get('/stop/((\w|-)+)', array('Api', 'stop'), EpiApi::external);
getApi()->get('/turnAutoRecoverOn/((\w|-)+)', array('Api', 'turnAutoRecoverOn'), EpiApi::external);
getApi()->get('/turnAutoRecoverOff/((\w|-)+)', array('Api', 'turnAutoRecoverOff'), EpiApi::external);
getApi()->get('/turnRefuseNewSessionsOn/((\w|-)+)', array('Api', 'turnRefuseNewSessionsOn'), EpiApi::external);
getApi()->get('/turnRefuseNewSessionsOff/((\w|-)+)', array('Api', 'turnRefuseNewSessionsOff'), EpiApi::external);


getRoute()->get('/', array('Site','main'));


getRoute()->run();


?>

