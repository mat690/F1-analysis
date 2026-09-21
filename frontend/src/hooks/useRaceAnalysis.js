import { useEffect, useState } from "react";
import api from "../services/api";

export default function useRaceAnalysis(
    season,
    race,
    driver1,
    driver2
) {
    const [raceAnalysis, setRaceAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadRaceAnalysis() {
            setLoading(true);
            setError(null);
            setRaceAnalysis(null);

            try {
                const response = await api.get(
                    `/race/${season}/${race}/${driver1}/${driver2}`
                );

                if (cancelled) return;

                if (response.data?.error) {
                    setError(response.data.error);
                    return;
                }

                setRaceAnalysis(response.data);

            } catch (err) {

                if (cancelled) return;

                console.error(
                    "Erreur analyse course :",
                    err
                );

                setError(
                    "Impossible de charger l'analyse de course."
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
            driver1 &&
            driver2 &&
            driver1 !== driver2
        ) {
            loadRaceAnalysis();
        }

        return () => {
            cancelled = true;
        };

    }, [season, race, driver1, driver2]);

    return {
        raceAnalysis,
        loading,
        error
    };
}