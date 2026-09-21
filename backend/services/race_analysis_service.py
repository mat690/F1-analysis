import pandas as pd

from services.session_cache import get_cached_session


def format_lap_time(value):
    if value is None or pd.isna(value):
        return None

    try:
        return round(float(value.total_seconds()), 3)
    except (AttributeError, TypeError, ValueError):
        return None


def safe_int(value):
    if value is None or pd.isna(value):
        return None

    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def safe_string(value):
    if value is None or pd.isna(value):
        return None

    return str(value)


def get_driver_result(session, driver):
    result = session.results[
        session.results["Abbreviation"] == driver
    ]

    if result.empty:
        return None

    row = result.iloc[0]

    return {
        "positionDepart": safe_int(
            row.get("GridPosition")
        ),
        "positionArrivee": safe_int(
            row.get("Position")
        ),
        "points": (
            float(row.get("Points"))
            if pd.notna(row.get("Points"))
            else None
        ),
        "statut": safe_string(
            row.get("Status")
        )
    }


def get_driver_laps(session, driver):
    laps = session.laps.pick_drivers(driver)

    result = []

    for _, lap in laps.iterrows():

        lap_time = format_lap_time(
            lap.get("LapTime")
        )

        if lap_time is None:
            continue

        result.append({
            "tour": safe_int(
                lap.get("LapNumber")
            ),
            "temps": lap_time,
            "position": safe_int(
                lap.get("Position")
            ),
            "compound": safe_string(
                lap.get("Compound")
            ),
            "agePneu": safe_int(
                lap.get("TyreLife")
            ),
            "stint": safe_int(
                lap.get("Stint")
            )
        })

    return result


def get_stints(laps):
    if not laps:
        return []

    stints = {}

    for lap in laps:

        stint_number = lap["stint"]

        if stint_number is None:
            continue

        if stint_number not in stints:
            stints[stint_number] = {
                "stint": stint_number,
                "compound": lap["compound"],
                "tourDebut": lap["tour"],
                "tourFin": lap["tour"],
                "nombreTours": 0
            }

        stints[stint_number]["tourFin"] = \
            lap["tour"]

        stints[stint_number]["nombreTours"] += 1

    return list(stints.values())


def get_driver_data(session, driver):
    race_result = get_driver_result(
        session,
        driver
    )

    if race_result is None:
        return None

    laps = get_driver_laps(
        session,
        driver
    )

    return {
        **race_result,
        "tours": laps,
        "stints": get_stints(laps)
    }


def get_race_analysis(
    year,
    race,
    driver1,
    driver2
):
    session = get_cached_session(
        year,
        race,
        "R"
    )

    data1 = get_driver_data(
        session,
        driver1
    )

    data2 = get_driver_data(
        session,
        driver2
    )

    if data1 is None:
        return {
            "error":
                f"Aucune donnée disponible pour {driver1}."
        }

    if data2 is None:
        return {
            "error":
                f"Aucune donnée disponible pour {driver2}."
        }

    return {
        "annee": year,
        "grandPrix": race,
        "session": "R",

        "pilote1": driver1,
        "pilote2": driver2,

        "pilotes": {
            driver1: data1,
            driver2: data2
        }
    }