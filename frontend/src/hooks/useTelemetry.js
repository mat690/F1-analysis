import { useEffect, useState } from "react";
import api from "../services/api";

export default function useTelemetry(
    season,
    race,
    session,
    driver
) {
    const [telemetry, setTelemetry] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {

        if (!season || !race || !session || !driver) {
            setTelemetry([]);
            return;
        }

        api
            .get(
                `/telemetry/${season}/${race}/${session}/${driver}`
            )
            .then((res) => {

                const points = Array.isArray(res.data?.points)
                    ? res.data.points
                    : [];

                setTelemetry(points);
                setIndex(0);

            })
            .catch((error) => {

                console.error(
                    "Erreur récupération télémétrie :",
                    error
                );

                setTelemetry([]);
                setIndex(0);

            });

    }, [
        season,
        race,
        session,
        driver
    ]);

    return {
        telemetry,
        index,
        setIndex
    };
}