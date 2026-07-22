import fastf1


def get_strategy(
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


    strategy = []


    for stint in driver_laps["Stint"].dropna().unique():

        stint_laps = driver_laps[
            driver_laps["Stint"] == stint
        ]


        stint_laps = stint_laps[
            stint_laps["LapTime"].notna()
        ]


        times = (
            stint_laps["LapTime"]
            .dt.total_seconds()
            .dropna()
        )


        times = times[
            (times > 60) &
            (times < 150)
        ]


        if len(times) == 0:
            continue


        strategy.append({

            "relais": int(stint),

            "compose":
                stint_laps["Compound"].iloc[0],

            "debut":
                int(
                    stint_laps["LapNumber"].min()
                ),

            "fin":
                int(
                    stint_laps["LapNumber"].max()
                ),

            "tours":
                len(stint_laps)

        })


    return {

        "conducteur": driver,

        "strategie": strategy

    }