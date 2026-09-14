import numpy as np

from services.session_cache import get_cached_session


def get_dominance(
    year,
    race,
    session_type,
    driver1,
    driver2
):

    session = get_cached_session(
        year,
        race,
        session_type
    )

    laps = session.laps

    driver1_laps = laps[
        laps["Driver"] == driver1
    ]

    driver2_laps = laps[
        laps["Driver"] == driver2
    ]


    if (
        driver1_laps.empty
        or driver2_laps.empty
    ):
        return {
            "pilote1": driver1,
            "pilote2": driver2,
            "points": []
        }


    lap1 = driver1_laps.pick_fastest()
    lap2 = driver2_laps.pick_fastest()


    telemetry1 = lap1.get_telemetry()
    telemetry2 = lap2.get_telemetry()


    telemetry1 = telemetry1.dropna(
        subset=[
            "Distance",
            "Speed",
            "X",
            "Y"
        ]
    )

    telemetry2 = telemetry2.dropna(
        subset=[
            "Distance",
            "Speed"
        ]
    )


    if (
        telemetry1.empty
        or telemetry2.empty
    ):
        return {
            "pilote1": driver1,
            "pilote2": driver2,
            "points": []
        }


    distances = telemetry1[
        "Distance"
    ].to_numpy()

    speed1 = telemetry1[
        "Speed"
    ].to_numpy()


    speed2 = np.interp(
        distances,
        telemetry2[
            "Distance"
        ].to_numpy(),
        telemetry2[
            "Speed"
        ].to_numpy()
    )


    x = telemetry1[
        "X"
    ].to_numpy()

    y = telemetry1[
        "Y"
    ].to_numpy()


    points = []


    for i in range(
        len(distances)
    ):

        points.append({
            "distance": float(
                distances[i]
            ),

            "x": float(
                x[i]
            ),

            "y": float(
                y[i]
            ),

            "vitesse1": float(
                speed1[i]
            ),

            "vitesse2": float(
                speed2[i]
            ),

            "delta": float(
                speed1[i]
                - speed2[i]
            )
        })


    return {
        "pilote1": driver1,
        "pilote2": driver2,
        "points": points
    }