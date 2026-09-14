import fastf1


def get_races(year):

    schedule = fastf1.get_event_schedule(year)

    races = []

    for _, event in schedule.iterrows():

        event_name = event["EventName"]

        if (
            event_name
            and event_name != "Pre-Season Testing"
        ):
            races.append(event_name)

    return races