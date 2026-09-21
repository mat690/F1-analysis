from flask import Blueprint, jsonify

from services.practice_service import (
    get_practice_analysis
)


practice_bp = Blueprint(
    "practice",
    __name__
)


@practice_bp.route(
    "/practice/<int:year>/<race>/<session_type>/<driver1>/<driver2>"
)
def practice(
    year,
    race,
    session_type,
    driver1,
    driver2
):
    data = get_practice_analysis(
        year,
        race,
        session_type,
        driver1,
        driver2
    )

    return jsonify(data)