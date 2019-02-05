var options;

options = {
   controls: true,
   techOrder: [ 'chromecast', 'html5' ], // You may have more Tech, such as Flash or HLS
   plugins: {
      chromecast: {
        preloadWebComponents: true
      }
   },
};

// Generate a "unique" ID
var id = new Date().getTime();
var player = videojs("player", options);

function pingServer() {
    $.post('/api/player', {
        "video": player.currentSource().src,
        "id": id,
        "currentTime": player.currentTime()
    }, "json");
}

pingServer();

window.setInterval(pingServer, 2000);
