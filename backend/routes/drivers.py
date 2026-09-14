from flask import Blueprint, jsonify
from services.driver_service import get_drivers


drivers_bp = Blueprint(
    "drivers",
    __name__
)


@drivers_bp.route(
    "/drivers/<int:year>/<race>/<session_type>"
)
def drivers(year, race, session_type):

    data = get_drivers(
        year,
        race,
        session_type
    )

    return jsonify(data)