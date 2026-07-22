from flask import Blueprint, jsonify
from services.tyre_service import get_tyres


tyres_bp = Blueprint(
    "tyres",
    __name__
)


@tyres_bp.route(
"/tyres/<int:year>/<race>/<session>/<driver>"
)
def tyres(
    year,
    race,
    session,
    driver
):

    data = get_tyres(
        year,
        race,
        session,
        driver
    )


    return jsonify(data)