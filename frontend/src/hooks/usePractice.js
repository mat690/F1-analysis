import {
    useEffect,
    useState
} from "react";

import api from "../services/api";


export default function usePractice(
    season,
    race,
    session,
    driver1,
    driver2
) {

    const [practice, setPractice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {

        let cancelled = false;


        async function loadPractice() {

            setLoading(true);
            setError(null);
            setPractice(null);


            try {

                const response = await api.get(
                    `/practice/${season}/${race}/${session}/${driver1}/${driver2}`
                );


                if (cancelled) {
                    return;
                }


                if (response.data?.error) {

                    setError(
                        response.data.error
                    );

                    return;
                }


                setPractice(
                    response.data
                );


            } catch (err) {

                if (cancelled) {
                    return;
                }

                console.error(
                    "Erreur essais libres :",
                    err
                );

                setError(
                    "Impossible de charger l'analyse des essais libres."
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
            ["FP1", "FP2", "FP3"].includes(session) &&
            driver1 &&
            driver2 &&
            driver1 !== driver2
        ) {
            loadPractice();
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
        practice,
        loading,
        error
    };
}