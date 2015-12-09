//Creating the application
var CKTJAVAMONITOR = CKTJAVAMONITOR || {};

CKTJAVAMONITOR = { 

  refreshId: -1,

  //Autofilters config
  filtersConfig: {
      base_path: 'public/lib/tablefilter/',
      col_0: 'none',
      col_1: 'select',
      col_2: 'none',
      col_3: 'none',
      col_4: 'select',
      col_5: 'select',
      col_6: 'select',
      col_7: 'none',
      col_8: 'none',
      col_9: 'none'

  },

  /**
   * function console
   * Writes messages to a div
   * @param message The message to be displayed
   */
  log: function (message) {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $('#console').prepend(time + ' ' + message + '<br />');
  },

  /**
   * function start
   * Starts the app
   */
  start: function() {
    var MyApp = this;
    
    //We show the host for security reasons
    $('#cktHost').html(window.location.host);
    $('title').text('cktjavamonitor ' + window.location.host);
  
    //Set timeout for ajax calls
    $.ajaxSetup({
      timeout: 10000 //Time in milliseconds
    });
  
    //Refreshing the table at regular intervals
    this.toggleAutoRefresh();
    //Adding autorefresh toggle
    $('#toggleAutoRefresh').bootstrapToggle({size: 'mini'}).bootstrapToggle('on');
    $('#toggleAutoRefresh').on('change', function (e) {
      MyApp.toggleAutoRefresh();
    });

    //Setting up modal confirm panel
    $('#confirm-action').on('show.bs.modal', function(e) {
        var action = $(e.relatedTarget).data('action');
        $(this).find('.btn-ok').data('action', action);
        var checked = $('input[name="selectedApps"]:checked').length;
        var checkedInvisible = $('input[name="selectedApps"]:checked').filter(':hidden').length;
        var body = $(this).find('.modal-body');
        body.html('<p>Action selected : ' + action + '.</p>' + '<p>You are about to apply this action to ' + checked + " " + MyApp.plural(checked,'app','apps') + '.');
        if (checkedInvisible) { body.append('<p><span class="label label-warning">Warning</span> There ' + MyApp.plural(checkedInvisible,'is','are') + ' ' + checkedInvisible + ' hidden selected '+ MyApp.plural(checkedInvisible,'app','apps') + '.</p>'); }
    });
    
    //Adding action on modal button "ok"
    $('#confirm-action .btn-ok').on('click', function(event){
      var action = $(this).data('action');
      var time = 0;
      $('input[name="selectedApps"]:checked').each(function(index) {
        var app = $(this).val();
         
        $.ajax({
          url: MyApp.getWoUrl(action, app),
          type: "GET",
          dataType: "html",
          async: false,
          app: app,
          timeout: 1000,
          error: function(x, t, m) {
           if(t==="timeout") {
             MyApp.log("timeout on " + action + "/" + this.app);                              
           } else {
             MyApp.log(t + " : " + action + "/" + this.app);
           }
          },
          success: function (data) {
            MyApp.log(action + "/" + this.app);
          }
        });

      });
      
      //We close the modal
      $('#confirm-action').modal('hide');
    });
    
  },

  /**
   * function toggleAutoRefresh
   * Toggles updateAppsDetails autorefresh
   * @Author : unknown http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
   */

  toggleAutoRefresh: function() {
    if (this.refreshId != -1) {
      clearInterval(this.refreshId);
      this.refreshId = -1;
    } else {
    //The update function is proxied so that "this" is maintained on succesive calls
    //See http://stackoverflow.com/questions/2130241/pass-correct-this-context-to-settimeout-callback
    //Update request consumes large server resources so put a large value here (60000 or more i.e. 60s or more)
      this.updateAppsDetails(); //Refreshing at first
      this.refreshId = setInterval($.proxy(this.updateAppsDetails,this), 60000);
    }
  },

  /**
   * function plural
   * @Author : Thierry Kauffmann
   * @param count the integer to test
   * @param singular The singular form of text
   * @param plural The plural form of text
   */
   plural: function (count, singular, plural) {
     var out = '';
     if (count > 1) 
       out = plural;
     else
       out = singular;
     return out;
   },


  /**
   * function sortBy
   * @Author : unknown http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
   * Sorts an array by one of its keys
   * @param field string : the sort key
   * @param reverse boolean : desc sort if true
   * @param primer function : a sorting function e.g. function(a){return a.toUpperCase()} for a case-insensitive sort
   */

    sortBy: function(field, reverse, primer){

       var key = primer ? 
           function(x) {return primer(x[field])} : 
           function(x) {return x[field]};

       reverse = !reverse ? 1 : -1;

       return function (a, b) {
           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
         } 
    },

  /**
   * function getWoUrl
   * Generates request path to the PHP Rest Api
   * @param action
   * @param name : The app name or "all"
   */

    getWoUrl: function (action, name) {
   
      return action + "/" + name;
    },

  /**
   * function updateAppsDetails
   * Generates a table with app details
   */
    
    updateAppsDetails: function()  {
    
      var MyApp = this;
      // Showing the "updating" info on panel
      $("#updating").html('updating');
      MyApp.log('Refreshing started');
      
      // Data get loaded by ajax call to the rest API
      $.ajax({
        url: MyApp.getWoUrl('info','all'),
        type: "GET",
        dataType: "html",
        //timeout: 1000,
        error: function(x, t, m) {
            if(t==="timeout") {
                MyApp.log("update timed out");
                $("#updating").html(t);
            } else {
                MyApp.log(t);
            }
        },
        success: function(data) {
          var apps = $.parseJSON(data); // JSON data parsed into javascript object
          var btn = '', isChecked;
          //console.logf(apps);
          var h = "<table id='appsTable' class='table table-striped table-condensed table-hover'>";
          var keyList = ['name', 'id', 'port', 'state', 'autoRecover', 'activeSessions', 'refusingNewSessions', 'deaths', 'transactions', 'avgTransactionTime'];
          var stats = { 'appsTotal':0, 'activeSessionsTotal':0, 'appsAliveTotal':0, 'appsDeadTotal':0};
      
          // Array sorted by name
          apps.sort(MyApp.sortBy('name', false, ''));

          $.each(apps, function(index, app) {
            //console.log(index);
            stats['appsTotal'] ++;
            if (index == 0) {
              h = h + "<thead>";
              h = h + "<tr>";
              h = h + "<th><input type='checkbox' name='selectall' value=''></th>";
              $.each(keyList, function(index, key) {
                //console.log(key);
                h = h + "<th class='" + key + "'>" + key + "</th>";                 
              });
              h = h + "</tr>";
              h = h + "</thead>";
              h = h + "<tbody>";
              //console.log(h);
            }
            h = h + "<tr>";
            // Previously checked checkboxes are maintained on update
            isChecked = $('input[name=selectedApps][value=' + app['name'] + ']').is(':checked');
            h = h + "<td><input type='checkbox' name='selectedApps' value='" + app['name'] +  "'" + ((isChecked) ? ' checked="checked"' : "") + "></td>";
            $.each(keyList, function(index, key) {
              //console.log(app[key]);
              h = h + '<td class="' + key + '">';
              btn = '';
              if (key == 'autoRecover') { btn = app[key] == 'true' ? 'btn-success' : 'btn-danger'; }
              if (key == 'state') {
                btn = app[key] == 'ALIVE' ? 'btn-success' : 'btn-danger';
                stats['appsAliveTotal'] += app[key] == 'ALIVE' ? 1 : 0;
                stats['appsDeadTotal'] += app[key] == 'DEAD' ? 1 : 0;
              }
              if (key == 'refusingNewSessions') { btn = app[key] == false ? 'btn-success' : 'btn-danger'; }
              if (key == 'activeSessions') { btn = app[key] == 0 ? 'btn-success' : 'btn-danger'; stats['activeSessionsTotal'] += parseInt(app[key]); }
              
              h = h + '<a class="btn btn-xs ' + btn + ' disabled" href="#" role="button">' + app[key] + '</a>';
              h = h + "</td>";
            });
            h = h + '</tr>';
          });
          h = h + "</tbody>";
          h = h + '</table>';
          //console.log(h);

          //First saving selected filters
          var savedSelection = {};
          $('select.flt').each(function() {
            var value = $(this).val();
            if (value) { savedSelection[$(this).attr('id')] = value; }        
          });
          
          // Showing the updated table
          $('#reportTable').html(h);
          // Showing updated statistics
          $('.stats').html('Apps Alive : ' + stats['appsAliveTotal'] + ', Dead : ' + stats['appsDeadTotal'] + ', Total : ' + stats['appsTotal'] + '<br />' + 'Active sessions : ' + stats['activeSessionsTotal']);
          
          // Adding "Sticky table headers"
          $('table').stickyTableHeaders();
          $(window).trigger('resize.stickyTableHeaders');
          
          // Hiding the "updating" information
          $("#updating").html('&nbsp;');
          
          // Adding action "select all" on selectall checkbox
          $('input[name="selectall"]').on('change', function(event){
            if (this.checked) {
              $('input[name="selectedApps"]').prop('checked', false);
              $('input[name="selectedApps"]').filter(':visible').prop('checked', true);
            } else {
              $('input[name="selectedApps"]').prop('checked', false);   
            }
            updateSelectedApps();
          });
          

          // Adding action "Counting selected apps" on checking
          function updateSelectedApps() {
            var checked = $('input[name="selectedApps"]:checked').length;
            //Updating selected count info
            $('.selectedAppsCount').html('Selected Apps : ' + checked);
            //Updating status of selectall select
            var total = $('input[name="selectedApps"]').length;     
            $('input[name="selectall"]').prop('checked', (total == checked) ? true : false);
          }
          $('input[name="selectedApps"]').on('change', updateSelectedApps);
          
          updateSelectedApps();

          //Adding autofilters
          var tf = new TableFilter('appsTable', MyApp.filtersConfig);
          tf.init();
          //Restoring saved selected values
          $.each(savedSelection, function(index, key) {
            $('#' + index).val(key);
          });
          tf.filter();
          
          MyApp.log('Refreshing done');
          
        }// end success handler
      });
      
    }

}
