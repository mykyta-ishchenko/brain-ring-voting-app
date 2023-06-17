console.log("Show nemu script is active.");

$(document).ready(function () {
    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', function () {
        console.log("Websocket connected.");
        socket.emit('show-room-connect');
    });

    socket.on('update-voted-list', function (data) {
        var votes_list = document.getElementById("voted-list");
        votes_list.innerHTML = '';

        for (var i = 0; i < data.votes.length; i++) {
            var vote_block = document.createElement("p");
            vote_block.innerHTML = data.votes[i] + " секунд";
            votes_list.appendChild(vote_block);
        }
    });

    socket.on('update-voting-status', function (is_voting) {
        if (is_voting) document.getElementById("voting-status").innerHTML = "Голосуємо";
        else document.getElementById("voting-status").innerHTML = "Чекаємо";
    });

    socket.on("reload-all", function() {
       location.reload();
    });
});
