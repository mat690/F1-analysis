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


def get_best_lap_data(laps):
    if laps.empty:
        return None

    valid_laps = laps[
        laps["LapTime"].notna()
    ]

    if valid_laps.empty:
        return None

    best_lap = valid_laps.loc[
        valid_laps["LapTime"].idxmin()
    ]

    return {
        "numeroTour": safe_int(
            best_lap.get("LapNumber")
        ),

        "temps": format_lap_time(
            best_lap.get("LapTime")
        ),

        "compound": safe_string(
            best_lap.get("Compound")
        ),

        "agePneu": safe_int(
            best_lap.get("TyreLife")
        ),

        "secteurs": {
            "s1": format_lap_time(
                best_lap.get("Sector1Time")
            ),
            "s2": format_lap_time(
                best_lap.get("Sector2Time")
            ),
            "s3": format_lap_time(
                best_lap.get("Sector3Time")
            )
        }
    }


def get_all_laps(laps):
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

            "compound": safe_string(
                lap.get("Compound")
            ),

            "agePneu": safe_int(
                lap.get("TyreLife")
            )
        })

    return result


def get_driver_qualifying(session, driver):
    laps = session.laps.pick_drivers(driver)

    if laps.empty:
        return None

    best_lap = get_best_lap_data(laps)

    if best_lap is None:
        return None

    return {
        "meilleurTour": best_lap["temps"],

        "numeroMeilleurTour":
            best_lap["numeroTour"],

        "compound":
            best_lap["compound"],

        "agePneu":
            best_lap["agePneu"],

        "secteurs":
            best_lap["secteurs"],

        "tours":
            get_all_laps(laps)
    }

def get_qualifying_phases(session, driver1, driver2):
    phases = {
        "Q1": {},
        "Q2": {},
        "Q3": {}
    }

    results = session.results

    for driver in [driver1, driver2]:
        driver_result = results[
            results["Abbreviation"] == driver
        ]

        if driver_result.empty:
            phases["Q1"][driver] = None
            phases["Q2"][driver] = None
            phases["Q3"][driver] = None
            continue

        row = driver_result.iloc[0]

        phases["Q1"][driver] = format_lap_time(
            row.get("Q1")
        )

        phases["Q2"][driver] = format_lap_time(
            row.get("Q2")
        )

        phases["Q3"][driver] = format_lap_time(
            row.get("Q3")
        )

    return phases
def get_qualifying_analysis(
    year,
    race,
    driver1,
    driver2
):
    session = get_cached_session(
        year,
        race,
        "Q"
    )

    data1 = get_driver_qualifying(
        session,
        driver1
    )

    data2 = get_driver_qualifying(
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

    gap = None

    if (
        data1["meilleurTour"] is not None
        and data2["meilleurTour"] is not None
    ):
        gap = round(
            abs(
                data1["meilleurTour"]
                - data2["meilleurTour"]
            ),
            3
        )
    phases = get_qualifying_phases(
        session,
        driver1,
        driver2
    )

    return {
        "annee": year,
        "grandPrix": race,
        "session": "Q",

        "pilote1": driver1,
        "pilote2": driver2,

        "ecartMeilleurTour": gap,

        "phases": phases,

        "pilotes": {
            driver1: data1,
            driver2: data2
        }
    }