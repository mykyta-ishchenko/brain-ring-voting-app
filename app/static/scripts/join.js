console.log("Join menu script is active.");

$(document).ready(function () {
    const cur_site = location.protocol + '//' + document.domain + ':' + location.port;
    const socket = io.connect(cur_site);

    socket.on('connect', function () {
        console.log("Websocket connected.");
        socket.emit('join-room-connect');
    });

    document.getElementById("join-button").addEventListener('click', function () {
        var player_name = document.getElementById("nickname-input").value;
        if (player_name ===  "") player_name = "none";
        socket.emit('player-join', player_name);
        window.location.replace(cur_site + "/room/" + player_name);
    });

    socket.on("reload-all", function() {
       location.reload();
    });
});
