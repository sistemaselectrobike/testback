log('App started: ' + new Date());

document.addEventListener('deviceready', function() {
  log('deviceready. resumeType=' + cordova.backgroundapp.resumeType);
  initCallbacks();
  // Don't bother drawing UI when running in the background.
  if (cordova.backgroundapp.resumeType == 'launch') {
    renderUi('initial launch');
  } else { // resumeType == ''
    log('Running in the background!');
  }
});
document.addEventListener('resume', function() {
  log('resume event. resumeType=' + cordova.backgroundapp.resumeType);
  if (cordova.backgroundapp.resumeType == 'normal-launch') {
    renderUi('user launch when backgrounded');
  }
});

//setTimeout(function(){ createNotification("Hola mundo desde la app"); navigator.vibrate(500); }, 5000);

var app = {
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();