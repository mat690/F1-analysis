function positionText(position) {
    if (position == null) {
        return "—";
    }

    return `P${position}`;
}

function RaceSummary({
    driver1,
    driver2,
    data1,
    data2
}) {
    const gain1 =
        data1.positionDepart != null &&
        data1.positionArrivee != null
            ? data1.positionDepart -
              data1.positionArrivee
            : null;

    const gain2 =
        data2.positionDepart != null &&
        data2.positionArrivee != null
            ? data2.positionDepart -
              data2.positionArrivee
            : null;

    function getEvolution(gain) {
        if (gain == null) {
            return "évolution indisponible";
        }

        if (gain > 0) {
            return `gagne ${gain} place${gain > 1 ? "s" : ""}`;
        }

        if (gain < 0) {
            const lost = Math.abs(gain);

            return `perd ${lost} place${lost > 1 ? "s" : ""}`;
        }

        return "conserve sa position";
    }

    return (
        <div className="card analysis-summary">

            <span className="section-badge">
                RÉSUMÉ
            </span>

            <h2>
                🏁 Bilan de la course
            </h2>

            <p>
                <strong>{driver1}</strong> part{" "}
                <strong>
                    {positionText(data1.positionDepart)}
                </strong>{" "}
                et termine{" "}
                <strong>
                    {positionText(data1.positionArrivee)}
                </strong>.
                Il {getEvolution(gain1)}.
            </p>

            <p>
                <strong>{driver2}</strong> part{" "}
                <strong>
                    {positionText(data2.positionDepart)}
                </strong>{" "}
                et termine{" "}
                <strong>
                    {positionText(data2.positionArrivee)}
                </strong>.
                Il {getEvolution(gain2)}.
            </p>

            <p>
                Points marqués :{" "}
                <strong>
                    {driver1} : {data1.points ?? "—"}
                </strong>
                {" — "}
                <strong>
                    {driver2} : {data2.points ?? "—"}
                </strong>.
            </p>

        </div>
    );
}

export default RaceSummary;