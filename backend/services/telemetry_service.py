from services.session_cache import get_cached_session


def get_telemetry(
    year,
    race,
    session_type,
    driver
):

    session = get_cached_session(
        year,
        race,
        session_type
    )

    laps = session.laps

    driver_laps = laps[
        laps["Driver"] == driver
    ]

    if driver_laps.empty:
        return {
            "conducteur": driver,
            "telemetrie": []
        }

    fastest_lap = driver_laps.pick_fastest()

    telemetry = fastest_lap.get_telemetry()

    points = []

    for _, row in telemetry.iterrows():

        points.append({
            "distance": float(row["Distance"]),
            "speed": float(row["Speed"]),
            "throttle": float(row["Throttle"]),
            "brake": float(row["Brake"]),
            "drs": int(row["DRS"]),
            "gear": int(row["nGear"]),
            "x": float(row["X"]),
            "y": float(row["Y"])
        })

    return {
        "conducteur": driver,
        "telemetrie": points
    }