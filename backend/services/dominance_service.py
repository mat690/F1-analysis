import fastf1
import numpy as np


def get_dominance(year, race, session_type, driver1, driver2):

    session = fastf1.get_session(
        year,
        race,
        session_type
    )

    session.load()

    laps = session.laps

    laps1 = laps[laps["Driver"] == driver1]
    laps2 = laps[laps["Driver"] == driver2]

    if laps1.empty or laps2.empty:
        return {
            "pilote1": driver1,
            "pilote2": driver2,
            "points": []
        }

    # Meilleur tour de chaque pilote
    lap1 = laps1.pick_fastest()
    lap2 = laps2.pick_fastest()

    telemetry1 = lap1.get_telemetry()
    telemetry2 = lap2.get_telemetry()

    # Suppression des données invalides
    telemetry1 = telemetry1.dropna(
        subset=["Distance", "Speed", "X", "Y"]
    )

    telemetry2 = telemetry2.dropna(
        subset=["Distance", "Speed"]
    )

    if telemetry1.empty or telemetry2.empty:
        return {
            "pilote1": driver1,
            "pilote2": driver2,
            "points": []
        }

    # Distances du pilote 1 utilisées comme référence
    distances = telemetry1["Distance"].to_numpy()

    speed1 = telemetry1["Speed"].to_numpy()

    # Interpolation de la vitesse du pilote 2
    # aux mêmes distances que le pilote 1
    speed2 = np.interp(
        distances,
        telemetry2["Distance"].to_numpy(),
        telemetry2["Speed"].to_numpy()
    )

    x = telemetry1["X"].to_numpy()
    y = telemetry1["Y"].to_numpy()

    points = []

    for i in range(len(distances)):

        points.append({
            "distance": float(distances[i]),
            "x": float(x[i]),
            "y": float(y[i]),
            "vitesse1": float(speed1[i]),
            "vitesse2": float(speed2[i]),
            "delta": float(
                speed1[i] - speed2[i]
            )
        })

    return {
        "pilote1": driver1,
        "pilote2": driver2,
        "points": points
    }