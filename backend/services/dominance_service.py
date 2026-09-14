import fastf1


def get_dominance(year, race, session_type, driver1, driver2):
    session = fastf1.get_session(year, race, session_type)
    session.load()

    laps = session.laps

    driver1_laps = laps[laps["Driver"] == driver1]
    driver2_laps = laps[laps["Driver"] == driver2]

    if driver1_laps.empty or driver2_laps.empty:
        return {
            "pilote1": driver1,
            "pilote2": driver2,
            "points": []
        }

    lap1 = driver1_laps.pick_fastest()
    lap2 = driver2_laps.pick_fastest()

    telemetry1 = lap1.get_telemetry()
    telemetry2 = lap2.get_telemetry()

    length = min(len(telemetry1), len(telemetry2))

    points = []

    for i in range(length):
        speed1 = float(telemetry1.iloc[i]["Speed"])
        speed2 = float(telemetry2.iloc[i]["Speed"])

        points.append({
            "x": float(telemetry1.iloc[i]["X"]),
            "y": float(telemetry1.iloc[i]["Y"]),
            "delta": speed1 - speed2
        })

    return {
        "pilote1": driver1,
        "pilote2": driver2,
        "points": points
    }