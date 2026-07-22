from flask import Blueprint, jsonify

from services.strategy_service import get_strategy


strategy_bp = Blueprint(
    "strategy",
    __name__
)


@strategy_bp.route(
"/strategy/<int:year>/<race>/<session>/<driver>"
)
def strategy(
    year,
    race,
    session,
    driver
):

    data = get_strategy(
        year,
        race,
        session,
        driver
    )


    return jsonify(data)