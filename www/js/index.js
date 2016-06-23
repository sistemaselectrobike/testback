
var start = Date.now();
var logsBuffer = '';

function log(msg) {
  msg = Date.now() - start + ': ' + msg;
  logsBuffer += msg + '\n';
  var logsDiv = document.getElementById('logs');
  if (logsDiv) {
    logsDiv.textContent = logsBuffer;
  }
  console.log(msg);
}

function initCallbacks() {
  chrome.alarms.onAlarm.addListener(function(alarm) {
    log("Received alarm: " + alarm.name + '. Creating notification.');
    createNotification('created from alarm');
  });
  chrome.notifications.onClosed.addListener(function(notificationId, byUser) {
    log('notifications.onClosed fired. id = ' + notificationId + ', byUser = ' + byUser);
  });
  chrome.notifications.onClicked.addListener(function(notificationId) {
    log('notifications.onClicked fired. id = ' + notificationId);
    chrome.notifications.clear(notificationId, function(wasCleared) {});

    renderUi('notification clicked');
    log('Showing window via cordova.backgroundapp.show().');
    cordova.backgroundapp.show();
  });
}

var numIds = 0;
function createNotification(message) {
  var opts = {
    message: message,
    title: 'BackgroundApp Example',
    type: 'basic',
    iconUrl: ''
  };
  chrome.notifications.create('id' + numIds++, opts, function(notificationId) {
  });
}

function createAlarm(seconds) {
  var expectedFireTime = Date.now() + seconds * 1000;
  chrome.alarms.create('id' + numIds++ , { when: expectedFireTime });
}

var isRendered = false;
function renderUi(reason) {
  if (!isRendered) {
    log('Rendering UI due to ' + reason);
    document.body.style.display = '';
    isRendered = true;
  }
}




log('App started: ' + new Date());

/*document.addEventListener('deviceready', function() {
  log('deviceready. resumeType=' + cordova.backgroundapp.resumeType);
  initCallbacks();
  // Don't bother drawing UI when running in the background.
  if (cordova.backgroundapp.resumeType == 'launch') {
    renderUi('initial launch');
  } else { // resumeType == ''
    log('Running in the background!');
  }
});*/
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
        switch(id)
        {
          case 'deviceready':
            log('deviceready. resumeType=' + cordova.backgroundapp.resumeType);
            initCallbacks();
            // Don't bother drawing UI when running in the background.
            if (cordova.backgroundapp.resumeType == 'launch') {
              renderUi('initial launch');
            } else { // resumeType == ''
              log('Running in the background!');
            }
            break;
        }
    }
};

app.initialize();