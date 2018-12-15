// Generate a "unique" ID
var id = new Date().getTime();
var player = videojs("player");

function pingServer() {
    $.post('/api/player', {
        "video": player.currentSource().src,
        "id": id,
        "currentTime": player.currentTime()
    }, "json");
}

pingServer();

window.setInterval(pingServer, 2000);
