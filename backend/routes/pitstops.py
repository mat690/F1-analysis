from flask import Blueprint, jsonify

from services.pitstop_service import get_pitstops


pitstops_bp = Blueprint(
    "pitstops",
    __name__
)


@pitstops_bp.route(
"/pitstops/<int:year>/<race>/<session>/<driver>"
)
def pitstops(
    year,
    race,
    session,
    driver
):

    data = get_pitstops(
        year,
        race,
        session,
        driver
    )

    return jsonify(data)