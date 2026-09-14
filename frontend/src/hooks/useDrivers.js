import { useEffect, useState } from "react";
import api from "../services/api";


export default function useDrivers(
    season,
    race,
    session
) {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {

        async function loadDrivers() {

            try {

                const response = await api.get(
                    `/drivers/${season}/${race}/${session}`
                );

                if (Array.isArray(response.data)) {
                    setDrivers(response.data);
                } else {
                    setDrivers([]);
                }

            } catch (error) {

                console.error(
                    "Erreur chargement pilotes :",
                    error
                );

                setDrivers([]);
            }
        }

        if (
            season &&
            race &&
            session
        ) {
            loadDrivers();
        }

    }, [
        season,
        race,
        session
    ]);

    return drivers;
}