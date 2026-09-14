from flask import Blueprint, jsonify
from services.dominance_service import get_dominance

dominance_bp = Blueprint("dominance", __name__)


@dominance_bp.route(
    "/dominance/<int:year>/<race>/<session_type>/<driver1>/<driver2>"
)
def dominance(year, race, session_type, driver1, driver2):
    data = get_dominance(
        year,
        race,
        session_type,
        driver1,
        driver2
    )

    return jsonify(data)