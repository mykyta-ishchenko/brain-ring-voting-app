from flask import Flask

from .events import socketio
from .routes import routes


def create_app():
    new_app = Flask(__name__)
    new_app.config["SECRET_KEY"] = "secret"
    new_app.static_folder = 'static'
    new_app.register_blueprint(routes)
    socketio.init_app(new_app, cors_allowed_origins='*')
    return new_app
