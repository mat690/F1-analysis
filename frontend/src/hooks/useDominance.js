import {
    useEffect,
    useState
} from "react";

import api from "../services/api";


export default function useDominance(
    season,
    race,
    session,
    driver1,
    driver2
) {

    const [dominance, setDominance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {

        let cancelled = false;


        async function loadDominance() {

            setDominance([]);
            setLoading(true);
            setError(null);


            try {

                const response = await api.get(
                    `/dominance/${season}/${race}/${session}/${driver1}/${driver2}`
                );


                if (cancelled) {
                    return;
                }


                const points =
                    Array.isArray(response.data?.points)
                        ? response.data.points
                        : [];


                setDominance(points);


                if (points.length === 0) {
                    setError(
                        "Aucune donnée de domination disponible."
                    );
                }


            } catch (err) {

                if (cancelled) {
                    return;
                }


                console.error(
                    "Erreur domination :",
                    err
                );


                setDominance([]);

                setError(
                    "Impossible de charger la carte de domination."
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
            driver1 &&
            driver2 &&
            driver1 !== driver2
        ) {
            loadDominance();
        }


        return () => {
            cancelled = true;
        };


    }, [
        season,
        race,
        session,
        driver1,
        driver2
    ]);


    return {
        dominance,
        loading,
        error
    };
}