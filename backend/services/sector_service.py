import fastf1


def get_sector_comparison(
    year,
    race,
    session_type,
    driver1,
    driver2
):
    session = fastf1.get_session(
        year,
        race,
        session_type
    )

    session.load()

    laps = session.laps

    d1 = laps[laps["Driver"] == driver1]
    d2 = laps[laps["Driver"] == driver2]

    if d1.empty or d2.empty:
        return {
            "pilote1": driver1,
            "pilote2": driver2,
            "secteurs": []
        }

    lap1 = d1.pick_fastest()
    lap2 = d2.pick_fastest()

    secteurs = [
        {
            "secteur": 1,
            "pilote1": float(
                lap1["Sector1Time"].total_seconds()
            ) if lap1["Sector1Time"] is not None else None,
            "pilote2": float(
                lap2["Sector1Time"].total_seconds()
            ) if lap2["Sector1Time"] is not None else None
        },
        {
            "secteur": 2,
            "pilote1": float(
                lap1["Sector2Time"].total_seconds()
            ) if lap1["Sector2Time"] is not None else None,
            "pilote2": float(
                lap2["Sector2Time"].total_seconds()
            ) if lap2["Sector2Time"] is not None else None
        },
        {
            "secteur": 3,
            "pilote1": float(
                lap1["Sector3Time"].total_seconds()
            ) if lap1["Sector3Time"] is not None else None,
            "pilote2": float(
                lap2["Sector3Time"].total_seconds()
            ) if lap2["Sector3Time"] is not None else None
        }
    ]

    return {
        "pilote1": driver1,
        "pilote2": driver2,
        "secteurs": secteurs
    }