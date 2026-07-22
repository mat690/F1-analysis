import fastf1


def get_weather(
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


    weather = session.weather_data


    data = []


    for _, row in weather.iterrows():

        data.append({

            "temps":
                str(row["Time"]),

            "air":
                float(row["AirTemp"]),

            "piste":
                float(row["TrackTemp"]),

            "humidite":
                float(row["Humidity"]),

            "pression":
                float(row["Pressure"]),

            "vent":
                float(row["WindSpeed"])

        })


    return {

        "session": session_type,

        "meteo": data

    }