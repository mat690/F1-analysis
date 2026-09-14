from services.session_cache import get_cached_session


def get_drivers(
    year,
    race,
    session_type
):

    session = get_cached_session(
        year,
        race,
        session_type
    )

    drivers = []

    for driver_number in session.drivers:

        info = session.get_driver(
            driver_number
        )

        code = info["Abbreviation"]
        full_name = info["FullName"]

        if code:
            drivers.append({
                "code": str(code),
                "nom": str(full_name)
            })

    return drivers