import { useEffect, useState } from "react";
import api from "../services/api";

export default function useQualifying(
    season,
    race,
    driver1,
    driver2
) {
    const [qualifying, setQualifying] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadQualifying() {
            setLoading(true);
            setError(null);
            setQualifying(null);

            try {
                const response = await api.get(
                    `/qualifying/${season}/${race}/${driver1}/${driver2}`
                );

                if (cancelled) return;

                if (response.data?.error) {
                    setError(response.data.error);
                    return;
                }

                setQualifying(response.data);

            } catch (err) {
                if (cancelled) return;

                console.error(
                    "Erreur qualifications :",
                    err
                );

                setError(
                    "Impossible de charger les qualifications."
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
            loadQualifying();
        }

        return () => {
            cancelled = true;
        };

    }, [
        season,
        race,
        driver1,
        driver2
    ]);

    return {
        qualifying,
        loading,
        error
    };
}