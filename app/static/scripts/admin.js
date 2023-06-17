console.log("Admin nemu script is active.");

$(document).ready(function () {
    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    const round_start_audio = new Audio("/static/audio/round_start_audio.mp3");
    const vote_sound = new Audio("/static/audio/vote.mp3");
    round_start_audio.loop = false;
    vote_sound.loop = false;

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
        round_start_audio.load();
        round_start_audio.play();
    });

    socket.on("vote-sound-play", function () {
        vote_sound.load();
        vote_sound.play();
    });

    round_start_audio.addEventListener('ended', function () {
        socket.emit("end-round");
        document.getElementById("end-round-button").setAttribute("style", "display: none;");
        document.getElementById("start-round-button").setAttribute("style", "");
        round_start_audio.pause();
    })

    document.getElementById("end-round-button").addEventListener("click", function () {
        socket.emit("end-round");
        document.getElementById("end-round-button").setAttribute("style", "display: none;");
        document.getElementById("start-round-button").setAttribute("style", "");
        round_start_audio.pause();
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

    document.getElementById("renew-session").addEventListener('click', function () {
        socket.emit("renew-session")
    });

    socket.on("reload-all", function () {
        location.reload();
    });
});
