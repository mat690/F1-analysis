import { useEffect, useState } from "react";
import api from "../services/api";

export default function useDominance(
    season,
    race,
    session,
    driver1,
    driver2
) {
    const [dominance, setDominance] = useState([]);

    useEffect(() => {

        async function loadDominance() {

            try {

                const response = await api.get(
                    `/dominance/${season}/${race}/${session}/${driver1}/${driver2}`
                );

                const points = Array.isArray(response.data?.points)
                    ? response.data.points
                    : [];

                setDominance(points);

            } catch (error) {

                console.error(
                    "Dominance error:",
                    error
                );

                setDominance([]);

            }

        }

        if (
            season &&
            race &&
            session &&
            driver1 &&
            driver2
        ) {
            loadDominance();
        }

    }, [
        season,
        race,
        session,
        driver1,
        driver2
    ]);

    return dominance;
}