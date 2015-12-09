<!doctype html>
<html>
  <head>
    <title>Centrale de commande Cocktail</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Bootstrap -->
    <link href="public/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="public/lib/bootstrap-toggle/css/bootstrap-toggle.min.css" rel="stylesheet" />
    <link href="public/css/cktmonitor.css" rel="stylesheet" />
  </head>
  <body>
    <div id="controlPanel" class="panel panel-default">
      <div class="panel-heading">
        <h2 class="panel-title">Control Panel <span id="updating">&nbsp;</span></h2>
      </div>
      <div class="panel-body">
        Autorefresh <input id="toggleAutoRefresh" type="checkbox" checked />
        <p class="stats"></p>
        <div class="actions">
          <h3>Apply actions</h3>
          <p class="selectedAppsCount"></p>
          <p>
            <button data-toggle="modal" data-target="#confirm-action" data-action="start" class="btn btn-success btn-xs">Start</button>
            <button data-toggle="modal" data-target="#confirm-action" data-action="stop" class="btn btn-danger btn-xs">Stop</button>
          </p>   
          <p>Turn Refusing New Sessions 
            <button data-toggle="modal" data-target="#confirm-action" data-action="turnRefuseNewSessionsOn" class="btn btn-success btn-xs">On</button>
            <button data-toggle="modal" data-target="#confirm-action" data-action="turnRefuseNewSessionsOff" class="btn btn-danger btn-xs">Off</button>
          </p>
          <p>Turn AutoRecover 
            <button data-toggle="modal" data-target="#confirm-action" data-action="turnAutoRecoverOn" class="btn btn-success btn-xs">On</button>
            <button data-toggle="modal" data-target="#confirm-action" data-action="turnAutoRecoverOff" class="btn btn-danger btn-xs">Off</button>
          </p>
        </div>
        <h3>Console</h3>
        <div id="console"></div>
      </div>
    </div>

    <div id="content" class="panel panel-default">
      <div class="panel-heading">
        <h2 class="panel-title">Applications report : <span id="cktHost" class="text-warning"></span></h2>
      </div>
      <div id="reportTable"></div>
    </div>

    <div class="modal fade" id="confirm-action" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Confirmation required</h2>
                </div>
                <div class="modal-body">
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-danger btn-ok">Apply action</a>
                </div>
            </div>
        </div>
    </div>
    
    <div id="footer"></div>

  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="public/lib/jquery/js/jquery-1.11.3.min.js"></script>
  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="public/lib/bootstrap/js/bootstrap.min.js"></script>
  <script src="public/lib/stickytableheaders/js/jquery.stickytableheaders.min.js"></script>
  <script src="public/lib/bootstrap-toggle/js/bootstrap-toggle.min.js"></script>   
  <script src="public/lib/tablefilter/tablefilter.js"></script>
  <script src="public/js/cktjavamonitor.js"></script>
  <script>
      $(function (){
  
        CKTJAVAMONITOR.start();
        
      });  
  </script>    
  </body>
</html>  

