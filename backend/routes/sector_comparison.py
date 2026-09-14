from flask import Blueprint, jsonify
from services.sector_service import get_sector_comparison

sector_bp = Blueprint(
    "sector_comparison",
    __name__
)


@sector_bp.route(
    "/sector-comparison/"
    "<int:year>/<race>/<session_type>/"
    "<driver1>/<driver2>"
)
def sector_comparison(
    year,
    race,
    session_type,
    driver1,
    driver2
):
    data = get_sector_comparison(
        year,
        race,
        session_type,
        driver1,
        driver2
    )

    return jsonify(data)