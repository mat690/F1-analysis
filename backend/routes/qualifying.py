from flask import Blueprint, jsonify

from services.qualifying_service import (
    get_qualifying_analysis
)


qualifying_bp = Blueprint(
    "qualifying",
    __name__
)


@qualifying_bp.route(
    "/qualifying/<int:year>/<race>/<driver1>/<driver2>"
)
def qualifying(
    year,
    race,
    driver1,
    driver2
):
    try:
        data = get_qualifying_analysis(
            year,
            race,
            driver1,
            driver2
        )

        return jsonify(data)

    except Exception as error:
        print(
            "Erreur qualification :",
            error
        )

        return jsonify({
            "error": str(error)
        }), 500