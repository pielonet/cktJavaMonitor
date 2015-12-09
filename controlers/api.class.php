<?php

class Api {

  public static function version() {
    return '1.0';
  }

  private static function action($action, $name='all') {
 
    if ($name == 'all')  
      return self::restApiQuery('GET', $action, array('type' => 'all'));
    else
      return self::restApiQuery('GET', $action, array('type' => 'app', 'name' => $name));

  }


  public static function info($name) {
    return self::action('info', $name);
  }

  public static function start($name) {
    return self::action('start', $name);
  }
  
  public static function stop($name) {
    return self::action('stop', $name);
  }
  
  public static function turnAutoRecoverOn($name) {
    return self::action('turnAutoRecoverOn', $name);
  }
  
  public static function turnAutoRecoverOff($name) {
    return self::action('turnAutoRecoverOff', $name);
  }
  
  public static function turnRefuseNewSessionsOn($name) {
    return self::action('turnRefuseNewSessionsOn', $name);
  }
  
  public static function turnRefuseNewSessionsOff($name) {
    return self::action('turnRefuseNewSessionsOff', $name);
  }


  /*
   * function restApiQuery
   * Runs a request on a REST API. Requires php5-curl
   * @param $method la request method : GET, PUT, DELETE, POST
   * @param $uri a supplementary url as an action e.g. "info"
   * @param $query a parameter array for the request which will be sent as query string
   * @param $postfields an optional data array for POST or PUT methods
   * @param $options an optional options array data for curl
   * @return an array
   */
  public static function restApiQuery($method, $uri='', $query=array(), $postfields=array(), $options=array()){
  
    $restApiServer = getConfig()->get('javamonitor-rest')->restApiServer;
    if (empty($restApiServer)) $restApiServer = $_SERVER['HTTP_HOST'];
    $restApiPath = getConfig()->get('javamonitor-rest')->restApiPath;
    $restApiPort = getConfig()->get('javamonitor-rest')->restApiPort;
    $restApiProtocol = getConfig()->get('javamonitor-rest')->restApiProtocol;
    $restApiUrl = $restApiProtocol . "://" . $restApiServer . ":" . $restApiPort . $restApiPath;
    $restApiOptionDefaults = getConfig()->get('javamonitor-rest')->restApiOptionDefaults;
    $restApiPw = getConfig()->get('javamonitor-rest')->restApiPw;

    //print_r($restApiUrl); 
    //if ($uri != '') $uri = '/' . $uri;
     
    // Connect
    $restApiHandle = curl_init();

    //echo "DB operation: $method $uri\n";
    //print_r($query);

    // Compose query
    $queryPw = array ('pw' => $restApiPw);
    $options = array(
      CURLOPT_URL => $restApiUrl . $uri . '?' . http_build_query($query + $queryPw),
      CURLOPT_CUSTOMREQUEST => $method, // GET POST PUT PATCH DELETE HEAD OPTIONS
      CURLOPT_POSTFIELDS => http_build_query($postfields)
    );
    
    curl_setopt_array($restApiHandle,($options + $restApiOptionDefaults));

    // send request and wait for response
    $response =  json_decode(curl_exec($restApiHandle), true);
    //$response =  curl_exec($restApiHandle);
    
    //If the response is single lined, we turn it into an indexed array
    if (!is_array($response[0])) $response = array($response);

    //echo "Response from DB: \n";
    //print_r($response);
    curl_close($restApiHandle);
    
    return $response;
  }

}

?>
