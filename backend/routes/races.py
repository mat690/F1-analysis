from flask import Blueprint, jsonify
from services.race_service import get_races


races_bp = Blueprint(
    "races",
    __name__
)


@races_bp.route(
    "/races/<int:year>"
)
def races(year):

    data = get_races(year)

    return jsonify(data)