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

setTimeout(function(){ createNotification("Hola mundo desde la app"); }, 5000);