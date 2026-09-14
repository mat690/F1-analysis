import {
    useEffect,
    useState
} from "react";

import api from "../services/api";


export default function useTelemetry(
    season,
    race,
    session,
    driver
) {

    const [telemetry, setTelemetry] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    useEffect(() => {

        let cancelled = false;


        async function loadTelemetry() {

            // On efface les anciennes données
            setTelemetry([]);

            // Début du chargement
            setLoading(true);

            // On efface l'ancienne erreur
            setError(null);


            try {

                const response = await api.get(
                    `/telemetry/${season}/${race}/${session}/${driver}`
                );


                if (cancelled) {
                    return;
                }


                const rawTelemetry =
                    Array.isArray(
                        response.data?.telemetrie
                    )
                        ? response.data.telemetrie
                        : [];


                const formattedTelemetry =
                    rawTelemetry.map(
                        point => ({
                            distance: point.distance,
                            vitesse: point.speed,
                            accelerateur: point.throttle,
                            frein: point.brake,
                            drs: point.drs,
                            rapport: point.gear,
                            x: point.x,
                            y: point.y
                        })
                    );


                setTelemetry(
                    formattedTelemetry
                );


                if (
                    formattedTelemetry.length === 0
                ) {
                    setError(
                        "Aucune télémétrie disponible."
                    );
                }

            } catch (err) {

                if (cancelled) {
                    return;
                }


                console.error(
                    "Erreur télémétrie :",
                    err
                );


                setTelemetry([]);

                setError(
                    "Impossible de charger la télémétrie."
                );

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }

            }

        }


        if (
            season &&
            race &&
            session &&
            driver
        ) {
            loadTelemetry();
        }


        return () => {
            cancelled = true;
        };


    }, [
        season,
        race,
        session,
        driver
    ]);


    return {
        telemetry,
        loading,
        error
    };
}