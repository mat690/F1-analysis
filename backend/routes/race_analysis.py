from flask import Blueprint, jsonify

from services.race_analysis_service import (
    get_race_analysis
)


race_analysis_bp = Blueprint(
    "race_analysis",
    __name__
)


@race_analysis_bp.route(
    "/race/<int:year>/<race>/<driver1>/<driver2>"
)
def race_analysis(
    year,
    race,
    driver1,
    driver2
):
    try:

        data = get_race_analysis(
            year,
            race,
            driver1,
            driver2
        )

        return jsonify(data)

    except Exception as error:

        print(
            "Erreur analyse course :",
            error
        )

        return jsonify({
            "error": str(error)
        }), 500