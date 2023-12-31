from flask_socketio import emit

from .extension import socketio, session
from .logger import logger


@socketio.on("join-room-connect")
def handle_join_room_connect():
    logger.log("Join room connected.")


@socketio.on("player-room-connect")
def handle_player_room_connect(player: str):
    logger.log("Player room connected.")
    event = "enable-buttons" if session.is_round_active() and player not in \
                                session.get_voted() else "disable-buttons"
    emit(event, broadcast=True)


@socketio.on("admin-room-connect")
def handle_admin_room_connect():
    logger.log("Admin room connected.")
    emit("update-players-list", {"players": session.get_players()}, broadcast=True)
    emit("update-voted-list", {"votes": session.get_result()}, broadcast=True)


@socketio.on("show-room-connect")
def handle_admin_room_connect():
    logger.log("Admin room connected.")
    emit("update-voted-list", {"votes": session.get_result()}, broadcast=True)
    emit("update-voting-status", session.is_round_active(), broadcast=True)


@socketio.on("player-join")
def handle_player_join(player_name: str):
    logger.log(f"{player_name} player connected.")
    session.add_player(player_name)
    emit("update-players-list", {"players": session.get_players()}, broadcast=True)


@socketio.on("start-round")
def handle_round_start():
    logger.log("Round started.")
    session.start_round()
    emit("enable-buttons", broadcast=True)
    emit("update-voting-status", session.is_round_active(), broadcast=True)
    emit("update-voted-list", {"votes": session.get_result()}, broadcast=True)


@socketio.on("end-round")
def handle_round_end():
    logger.log("Round ended.")
    session.end_round()
    emit("disable-buttons", broadcast=True)
    emit("update-voting-status", session.is_round_active(), broadcast=True)


@socketio.on("vote")
def handle_vote(player: str):
    session.vote(player)
    emit("vote-sound-play", broadcast=True)
    emit("update-voted-list", {"votes": session.get_result()}, broadcast=True)


@socketio.on("renew-session")
def handle_renew_session():
    logger.log("Session is being renewed.")
    emit("reload-all")
    session.renew()
