from flask import Blueprint, jsonify

from services.telemetry_service import get_telemetry


telemetry_bp = Blueprint(
    "telemetry",
    __name__
)


@telemetry_bp.route(
    "/telemetry/<int:year>/<race>/<session>/<driver>"
)
def telemetry(
    year,
    race,
    session,
    driver
):

    data = get_telemetry(
        year,
        race,
        session,
        driver
    )

    return jsonify(data)