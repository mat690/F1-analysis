import fastf1


def get_pitstops(
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
    ].reset_index(drop=True)


    stops = []


    for i in range(1, len(driver_laps)):

        current = driver_laps.iloc[i]

        previous = driver_laps.iloc[i - 1]


        if current["Compound"] != previous["Compound"]:

            stops.append({

                "tour":
                    int(current["LapNumber"]),

                "ancien_pneu":
                    previous["Compound"],

                "nouveau_pneu":
                    current["Compound"],

                "temps":
                    None

            })


    return {

        "conducteur": driver,

        "arrets": stops

    }