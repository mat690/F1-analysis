import { useEffect, useState } from "react";
import api from "../services/api";


export default function useRaces(season) {

    const [races, setRaces] = useState([]);

    useEffect(() => {

        async function loadRaces() {

            try {

                const response = await api.get(
                    `/races/${season}`
                );

                if (Array.isArray(response.data)) {
                    setRaces(response.data);
                } else {
                    setRaces([]);
                }

            } catch (error) {

                console.error(
                    "Erreur chargement Grands Prix :",
                    error
                );

                setRaces([]);
            }
        }


        if (season) {
            loadRaces();
        }

    }, [season]);


    return races;
}