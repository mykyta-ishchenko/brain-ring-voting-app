from flask_socketio import SocketIO

from .session import Session

socketio = SocketIO(cors_allowed_origins="*")
session = Session()
