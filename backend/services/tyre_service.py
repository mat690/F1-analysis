import fastf1


def get_tyres(
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
        laps.Driver == driver
    ]


    result=[]


    for compound in driver_laps.Compound.dropna().unique():

        stint = driver_laps[
            driver_laps.Compound == compound
        ]


        times = (
            stint.LapTime
            .dt.total_seconds()
            .dropna()
        )


        times = times[
            (times > 60)
            &
            (times < 150)
        ]


        if len(times)==0:
            continue


        result.append({

            "compose":compound,

            "debut":
            int(stint.LapNumber.min()),

            "fin":
            int(stint.LapNumber.max()),

            "tours":
            len(stint),

            "meilleur":
            round(times.min(),3),

            "moyenne":
            round(times.mean(),3),

            "degradation":
            round(
                abs(
                    times.iloc[-1]
                    -
                    times.iloc[0]
                ),
                3
            )

        })


    return {

        "conducteur":driver,

        "pneus":result

    }