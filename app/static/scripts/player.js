console.log("Player menu script is active.");

$(document).ready(function () {
    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    const player = document.getElementById("player-name-h").innerHTML;

    socket.on('connect', function () {
        console.log("Websocket connected.");
        socket.emit('player-room-connect', player);
    });

    socket.on("disable-buttons", function () {
       document.getElementById("vote-button").setAttribute("disabled", '');
       document.getElementById("vote-button").setAttribute("value", 'Очікування');
    });

    socket.on("enable-buttons", function () {
        document.getElementById("vote-button").removeAttribute("disabled");
        document.getElementById("vote-button").setAttribute("value", 'Голосувати');
    });

    document.getElementById("vote-button").addEventListener('click', function() {
        document.getElementById("vote-button").setAttribute("disabled", '');
        document.getElementById("vote-button").setAttribute("value", 'Проголосовано');
        socket.emit("vote", player)
    });

    socket.on("reload-all", function() {
       location.reload();
    });
});
