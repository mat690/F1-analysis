import fastf1


def get_telemetry(
    year,
    race,
    session_type,
    driver
):

    session = fastf1.get_session(
        year,
        race,
        session_type
    )

    session.load()


    laps = session.laps


    driver_laps = laps[
        laps["Driver"] == driver
    ]


    fastest = driver_laps.pick_fastest()


    telemetry = fastest.get_telemetry()


    data = []


    for _, row in telemetry.iterrows():

        data.append({

            "distance": float(row["Distance"]),
            "speed": float(row["Speed"]),
            "throttle": float(row["Throttle"]),
            "brake": float(row["Brake"]),
            "gear": int(row["nGear"]),
            "drs": int(row["DRS"]),
            "x": float(row["X"]),
            "y": float(row["Y"])

        })


    return {

        "conducteur": driver,

        "tour": int(
            fastest["LapNumber"]
        ),

        "telemetrie": data

    }