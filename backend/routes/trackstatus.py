from flask import Blueprint, jsonify

from services.trackstatus_service import get_trackstatus


trackstatus_bp = Blueprint(
    "trackstatus",
    __name__
)


@trackstatus_bp.route(
"/trackstatus/<int:year>/<race>/<session>"
)
def trackstatus(
    year,
    race,
    session
):

    data = get_trackstatus(
        year,
        race,
        session
    )

    return jsonify(data)