import os
import fastf1


# Création du cache
os.makedirs("cache", exist_ok=True)

# Activation du cache
fastf1.Cache.enable_cache("cache")


def get_qualifying_results(year, circuit):
    """
    Récupère les résultats des qualifications
    d'un Grand Prix donné
    """

    print("Chargement des données...")

    # Récupération de la session
    session = fastf1.get_session(
        year,
        circuit,
        "Q"
    )

    # Chargement des données
    session.load()

    # Sélection des informations utiles
    results = session.results[
        [
            "Abbreviation",
            "FullName",
            "TeamName",
            "Position"
        ]
    ]

    return results


# Test de la fonction

data = get_qualifying_results(
    2024,
    "Monaco"
)

print(data)