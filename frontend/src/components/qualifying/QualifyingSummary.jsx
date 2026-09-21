function formatTime(seconds) {
    if (seconds == null) return "—";

    const minutes = Math.floor(seconds / 60);
    const remaining = seconds - minutes * 60;

    return `${minutes}:${remaining
        .toFixed(3)
        .padStart(6, "0")}`;
}

function QualifyingSummary({
    qualifying,
    driver1,
    driver2
}) {
    const data1 = qualifying?.pilotes?.[driver1];
    const data2 = qualifying?.pilotes?.[driver2];

    if (!data1 || !data2) {
        return null;
    }

    const fastest =
        data1.meilleurTour <= data2.meilleurTour
            ? driver1
            : driver2;

    const fastestData =
        fastest === driver1
            ? data1
            : data2;

    const gap =
        qualifying.ecartMeilleurTour;

    const phaseWins = {
        [driver1]: 0,
        [driver2]: 0
    };

    ["Q1", "Q2", "Q3"].forEach(phase => {
        const time1 =
            qualifying.phases?.[phase]?.[driver1];

        const time2 =
            qualifying.phases?.[phase]?.[driver2];

        if (time1 == null || time2 == null) {
            return;
        }

        if (time1 <= time2) {
            phaseWins[driver1]++;
        } else {
            phaseWins[driver2]++;
        }
    });

    return (
        <div className="card analysis-summary">

            <span className="section-badge">
                RÉSUMÉ
            </span>

            <h2>
                🏁 Bilan des qualifications
            </h2>

            <p>
                <strong>{fastest}</strong> réalise le meilleur
                tour de la comparaison en{" "}
                <strong>
                    {formatTime(fastestData.meilleurTour)}
                </strong>.
            </p>

            {gap != null && (
                <p>
                    L'écart entre les meilleurs tours des
                    deux pilotes est de{" "}
                    <strong>
                        {gap.toFixed(3)} s
                    </strong>.
                </p>
            )}

            <p>
                Sur les phases où les deux pilotes disposent
                d'un chrono, <strong>{driver1}</strong> est
                devant sur{" "}
                <strong>
                    {phaseWins[driver1]}
                </strong>{" "}
                phase(s), contre{" "}
                <strong>
                    {phaseWins[driver2]}
                </strong>{" "}
                pour <strong>{driver2}</strong>.
            </p>

        </div>
    );
}

export default QualifyingSummary;