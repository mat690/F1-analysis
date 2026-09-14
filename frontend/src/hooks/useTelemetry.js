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

        async function loadTelemetry() {

            try {

                const response = await api.get(
                    `/telemetry/${season}/${race}/${session}/${driver}`
                );

                const rawTelemetry =
                    Array.isArray(response.data?.telemetrie)
                        ? response.data.telemetrie
                        : [];

                const formattedTelemetry =
                    rawTelemetry.map(point => ({
                        distance: point.distance,
                        vitesse: point.speed,
                        accelerateur: point.throttle,
                        frein: point.brake,
                        drs: point.drs,
                        rapport: point.gear,
                        x: point.x,
                        y: point.y
                    }));

                setTelemetry(formattedTelemetry);
                setIndex(0);

            } catch (error) {

                console.error(
                    "Erreur télémétrie :",
                    error
                );

                setTelemetry([]);
                setIndex(0);
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