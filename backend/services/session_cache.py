import fastf1


_session_cache = {}


def get_cached_session(
    year,
    race,
    session_type
):

    key = (
        year,
        race,
        session_type
    )

    if key in _session_cache:
        return _session_cache[key]

    session = fastf1.get_session(
        year,
        race,
        session_type
    )

    session.load()

    _session_cache[key] = session

    return session