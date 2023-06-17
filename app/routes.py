from flask import Blueprint, redirect, render_template, url_for

from .extension import session

routes = Blueprint("route", __name__)


@routes.route("/", methods=["GET", "POST"])
def home():
    return render_template("home.html", title="Joining room")


@routes.route("/admin")
def admin():
    return render_template(
        "admin.html",
        title="Admin panel",
        players=session.get_players(),
        is_round_active=session.is_round_active(),
    )


@routes.route("/room/<player>")
def room(player: str):
    if player not in session.get_players():
        return redirect(url_for("route.home"))
    return render_template("room.html", title="Room", player=player)


@routes.route("/show")
def show():
    return render_template(
        "show.html",
        title="Show Room",
        votes=session.get_result(),
        is_round_active=session.is_round_active(),
    )
