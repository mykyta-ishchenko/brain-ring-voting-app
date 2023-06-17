console.log("Player menu script is active.");

$(document).ready(function () {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', function () {
        console.log("Websocket connected.");
        socket.emit('player-room-connect');
    });

    socket.on("disable-buttons", function () {
       document.getElementById("vote-button").setAttribute("disabled", '');
       document.getElementById("vote-button").setAttribute("value", '');
    });

    socket.on("enable-buttons", function () {
        document.getElementById("vote-button").removeAttribute("disabled");
        document.getElementById("vote-button").setAttribute("value", 'Голосувати');
    });

    document.getElementById("vote-button").addEventListener('click', function() {
        document.getElementById("vote-button").setAttribute("disabled", '');
        document.getElementById("vote-button").setAttribute("value", '');
        socket.emit("vote", document.getElementById("player-name-h").innerHTML)
    });
});
