import numpy as np
import pandas as pd

from services.session_cache import get_cached_session


# =========================================
# OUTILS
# =========================================

def format_lap_time(value):

    if value is None or pd.isna(value):
        return None

    try:

        seconds = float(
            value.total_seconds()
        )

        if not np.isfinite(seconds):
            return None

        return seconds

    except (
        AttributeError,
        TypeError,
        ValueError
    ):
        return None


def safe_int(value):

    if value is None or pd.isna(value):
        return None

    try:
        return int(value)

    except (
        TypeError,
        ValueError
    ):
        return None


def safe_string(value):

    if value is None or pd.isna(value):
        return None

    return str(value)


def has_value(value):

    return (
        value is not None
        and not pd.isna(value)
    )


# =========================================
# ANALYSE D'UN LONG RELAIS
# =========================================

def analyse_long_run(
    stint_number,
    stint_laps
):

    usable_laps = []


    # -------------------------------------
    # RECUPERATION DES TOURS
    # -------------------------------------

    for _, lap in stint_laps.iterrows():

        lap_time = format_lap_time(
            lap["LapTime"]
        )

        lap_number = safe_int(
            lap["LapNumber"]
        )

        tyre_life = safe_int(
            lap["TyreLife"]
        )


        if (
            lap_time is None
            or lap_number is None
        ):
            continue


        # Tour de sortie des stands
        if (
            "PitOutTime" in lap.index
            and has_value(
                lap["PitOutTime"]
            )
        ):
            continue


        # Tour d'entrée aux stands
        if (
            "PitInTime" in lap.index
            and has_value(
                lap["PitInTime"]
            )
        ):
            continue


        usable_laps.append({

            "tour":
                lap_number,

            "temps":
                lap_time,

            "agePneu":
                tyre_life
        })


    # Pas assez de données
    if len(usable_laps) < 5:
        return None


    # -------------------------------------
    # FILTRE DES TOURS TRES LENTS
    # -------------------------------------

    best_stint_lap = min(
        lap["temps"]
        for lap in usable_laps
    )


    # Pour le prototype :
    # on retire les tours à plus de 7 %
    # du meilleur tour du stint.
    #
    # Cela permet notamment de limiter
    # l'influence du trafic, des tours
    # de refroidissement, etc.

    limit = (
        best_stint_lap
        * 1.07
    )


    representative_laps = [

        lap

        for lap in usable_laps

        if lap["temps"] <= limit
    ]


    if len(
        representative_laps
    ) < 5:
        return None


    # -------------------------------------
    # INFORMATIONS DU COMPOSE
    # -------------------------------------

    compound = None


    if (
        "Compound"
        in stint_laps.columns
    ):

        compounds = (
            stint_laps["Compound"]
            .dropna()
        )


        if not compounds.empty:

            compound = str(
                compounds.iloc[0]
            )


    # -------------------------------------
    # STATISTIQUES
    # -------------------------------------

    times = np.array(
        [
            lap["temps"]
            for lap
            in representative_laps
        ],
        dtype=float
    )


    average_pace = float(
        np.mean(times)
    )


    best_lap = float(
        np.min(times)
    )


    consistency = float(
        np.std(times)
    )


    # -------------------------------------
    # AGE DES PNEUS
    # -------------------------------------

    tyre_laps = [

        lap

        for lap in representative_laps

        if lap["agePneu"] is not None
    ]


    tyre_age_start = None
    tyre_age_end = None
    degradation = None


    if len(tyre_laps) > 0:

        tyre_ages = np.array(
            [
                lap["agePneu"]
                for lap
                in tyre_laps
            ],
            dtype=float
        )


        tyre_times = np.array(
            [
                lap["temps"]
                for lap
                in tyre_laps
            ],
            dtype=float
        )


        tyre_age_start = int(
            np.min(tyre_ages)
        )

        tyre_age_end = int(
            np.max(tyre_ages)
        )


        # ---------------------------------
        # REGRESSION LINEAIRE
        # ---------------------------------
        #
        # y = ax + b
        #
        # x = âge du pneu
        # y = temps au tour
        #
        # a = évolution du chrono
        #     en secondes / tour

        if (
            len(tyre_ages) >= 3
            and len(
                np.unique(
                    tyre_ages
                )
            ) >= 2
        ):

            slope, _ = np.polyfit(
                tyre_ages,
                tyre_times,
                1
            )


            if np.isfinite(slope):

                degradation = float(
                    slope
                )


    # -------------------------------------
    # FORMATAGE DES TOURS
    # -------------------------------------

    formatted_laps = []


    for lap in representative_laps:

        formatted_laps.append({

            "tour":
                lap["tour"],

            "temps":
                round(
                    lap["temps"],
                    3
                ),

            "agePneu":
                lap["agePneu"]
        })


    # -------------------------------------
    # RESULTAT
    # -------------------------------------

    return {

        "stint":
            int(stint_number),

        "compound":
            compound,

        "nombreTours":
            len(
                representative_laps
            ),

        "nombreToursBruts":
            len(
                usable_laps
            ),

        "agePneuDebut":
            tyre_age_start,

        "agePneuFin":
            tyre_age_end,

        "meilleurTour":
            round(
                best_lap,
                3
            ),

        "rythmeMoyen":
            round(
                average_pace,
                3
            ),

        "regularite":
            round(
                consistency,
                3
            ),

        "degradation":
            (
                round(
                    degradation,
                    4
                )
                if degradation
                is not None
                else None
            ),

        "tours":
            formatted_laps
    }


# =========================================
# RECUPERATION DES LONGS RELAIS
# =========================================

def get_long_runs(
    driver_laps
):

    long_runs = []


    if (
        "Stint"
        not in driver_laps.columns
    ):
        return long_runs


    stint_numbers = (
        driver_laps["Stint"]
        .dropna()
        .unique()
    )


    for stint_number in stint_numbers:

        stint_laps = driver_laps[
            driver_laps["Stint"]
            == stint_number
        ].copy()


        analysis = analyse_long_run(
            stint_number,
            stint_laps
        )


        if analysis is not None:

            long_runs.append(
                analysis
            )


    return long_runs


# =========================================
# ANALYSE ESSAIS LIBRES
# =========================================

def get_practice_analysis(
    year,
    race,
    session_type,
    driver1,
    driver2
):

    if session_type not in [
        "FP1",
        "FP2",
        "FP3"
    ]:

        return {
            "error":
                "Session d'essais libres invalide"
        }


    session = get_cached_session(
        year,
        race,
        session_type
    )


    laps = session.laps


    result = {

        "annee":
            year,

        "grandPrix":
            race,

        "session":
            session_type,

        "pilote1":
            driver1,

        "pilote2":
            driver2,

        "pilotes":
            {}
    }


    # =====================================
    # ANALYSE DES DEUX PILOTES
    # =====================================

    for driver in [
        driver1,
        driver2
    ]:


        driver_laps = laps[
            laps["Driver"] == driver
        ].copy()


        lap_times = []


        # =================================
        # TOURS
        # =================================

        for _, lap in driver_laps.iterrows():


            lap_time = format_lap_time(
                lap["LapTime"]
            )


            lap_number = safe_int(
                lap["LapNumber"]
            )


            if (
                lap_time is None
                or lap_number is None
            ):
                continue


            lap_times.append({

                "tour":
                    lap_number,

                "temps":
                    round(
                        lap_time,
                        3
                    )
            })


        times = [

            lap["temps"]

            for lap
            in lap_times
        ]


        # =================================
        # STATISTIQUES GENERALES
        # =================================

        if len(times) > 0:


            best = float(
                np.min(times)
            )


            # Règle actuelle du projet :
            # maximum 15 % du meilleur tour.

            limit = (
                best * 1.15
            )


            representative_times = [

                time

                for time in times

                if time <= limit
            ]


            if len(
                representative_times
            ) > 0:


                average = float(
                    np.mean(
                        representative_times
                    )
                )


                consistency = float(
                    np.std(
                        representative_times
                    )
                )


            else:

                average = None
                consistency = None


        else:

            best = None
            limit = None

            representative_times = []

            average = None
            consistency = None


        # =================================
        # MEILLEUR TOUR FASTF1
        # =================================

        fastest_lap = None


        if not driver_laps.empty:

            try:

                fastest_lap = (
                    driver_laps
                    .pick_fastest()
                )

            except Exception:

                fastest_lap = None


        # =================================
        # SECTEURS
        # =================================

        sector1 = None
        sector2 = None
        sector3 = None


        if fastest_lap is not None:


            sector1 = format_lap_time(
                fastest_lap[
                    "Sector1Time"
                ]
            )


            sector2 = format_lap_time(
                fastest_lap[
                    "Sector2Time"
                ]
            )


            sector3 = format_lap_time(
                fastest_lap[
                    "Sector3Time"
                ]
            )


        # =================================
        # PNEU DU MEILLEUR TOUR
        # =================================

        compound = None
        tyre_life = None

        fastest_lap_number = None
        fresh_tyre = None


        if fastest_lap is not None:


            compound = safe_string(
                fastest_lap[
                    "Compound"
                ]
            )


            tyre_life = safe_int(
                fastest_lap[
                    "TyreLife"
                ]
            )


            fastest_lap_number = (
                safe_int(
                    fastest_lap[
                        "LapNumber"
                    ]
                )
            )


            if (
                "FreshTyre"
                in fastest_lap.index
            ):


                value = fastest_lap[
                    "FreshTyre"
                ]


                if not pd.isna(value):

                    fresh_tyre = bool(
                        value
                    )


        # =================================
        # LONGS RELAIS
        # =================================

        long_runs = get_long_runs(
            driver_laps
        )


        # =================================
        # RESULTAT
        # =================================

        result[
            "pilotes"
        ][driver] = {


            "tours":
                lap_times,


            "nombreTours":
                len(
                    lap_times
                ),


            "toursRepresentatifs":
                len(
                    representative_times
                ),


            "meilleurTour":
                (
                    round(
                        best,
                        3
                    )
                    if best
                    is not None
                    else None
                ),


            "rythmeMoyen":
                (
                    round(
                        average,
                        3
                    )
                    if average
                    is not None
                    else None
                ),


            "regularite":
                (
                    round(
                        consistency,
                        3
                    )
                    if consistency
                    is not None
                    else None
                ),


            "limiteTourRepresentatif":
                (
                    round(
                        limit,
                        3
                    )
                    if limit
                    is not None
                    else None
                ),


            "secteurs": {


                "s1":
                    (
                        round(
                            sector1,
                            3
                        )
                        if sector1
                        is not None
                        else None
                    ),


                "s2":
                    (
                        round(
                            sector2,
                            3
                        )
                        if sector2
                        is not None
                        else None
                    ),


                "s3":
                    (
                        round(
                            sector3,
                            3
                        )
                        if sector3
                        is not None
                        else None
                    )
            },


            "meilleurTourPneu": {


                "compound":
                    compound,


                "agePneu":
                    tyre_life,


                "numeroTour":
                    fastest_lap_number,


                "pneuNeuf":
                    fresh_tyre
            },


            # NOUVEAU
            "longsRelais":
                long_runs
        }


    return result