console.log("Admin nemu script is active.");

$(document).ready(function () {
    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', function () {
        console.log("Websocket connected.");
        socket.emit('admin-room-connect');
    });

    socket.on('update-players-list', function (data) {
        var player_list = document.getElementById("player-list");
        player_list.innerHTML = '';

        for (var i = 0; i < data.players.length; i++) {
            var player_block = document.createElement("p");
            player_block.innerHTML = data.players[i];
            player_list.appendChild(player_block);
        }
    });

    document.getElementById("start-round-button").addEventListener("click", function () {
        socket.emit("start-round");
        document.getElementById("end-round-button").setAttribute("style", "");
        document.getElementById("start-round-button").setAttribute("style", "display: none;");
    })

    document.getElementById("end-round-button").addEventListener("click", function () {
        socket.emit("end-round");
        document.getElementById("end-round-button").setAttribute("style", "display: none;");
        document.getElementById("start-round-button").setAttribute("style", "");
    });

    socket.on('update-voted-list', function (data) {
        var votes_list = document.getElementById("voted-list");
        votes_list.innerHTML = '';

        for (var i = 0; i < data.votes.length; i++) {
            var vote_block = document.createElement("p");
            vote_block.innerHTML = data.votes[i];
            votes_list.appendChild(vote_block);
        }
    });
});
