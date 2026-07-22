import fastf1


STATUS_MAP = {
    "1": "GREEN",
    "2": "YELLOW",
    "3": "DOUBLE_YELLOW",
    "4": "SAFETY_CAR",
    "5": "RED_FLAG",
    "6": "VIRTUAL_SAFETY_CAR"
}


def get_trackstatus(
    year,
    race,
    session_type
):

    session = fastf1.get_session(
        year,
        race,
        session_type
    )

    session.load()


    status = []


    if session.track_status is not None:

        for _, row in session.track_status.iterrows():

            status.append({

                "temps":
                    str(row["Time"]),

                "statut":
                    STATUS_MAP.get(
                        str(row["Status"]),
                        "UNKNOWN"
                    )

            })


    return {

        "session": session_type,

        "statuts": status

    }