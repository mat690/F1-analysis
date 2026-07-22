from flask import Blueprint, jsonify

from services.weather_service import get_weather


weather_bp = Blueprint(
    "weather",
    __name__
)


@weather_bp.route(
"/weather/<int:year>/<race>/<session>"
)
def weather(
    year,
    race,
    session
):

    data = get_weather(
        year,
        race,
        session
    )

    return jsonify(data)