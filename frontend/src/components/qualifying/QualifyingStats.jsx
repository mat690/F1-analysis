function formatTime(seconds) {
    if (seconds == null) return "—";

    const minutes = Math.floor(seconds / 60);
    const remaining = seconds - minutes * 60;

    return `${minutes}:${remaining
        .toFixed(3)
        .padStart(6, "0")}`;
}

function QualifyingStats({
    driver1,
    driver2,
    data1,
    data2,
    gap
}) {
    const fastest =
        data1.meilleurTour <= data2.meilleurTour
            ? driver1
            : driver2;

    const fastestData =
        fastest === driver1
            ? data1
            : data2;

    return (
        <div className="card qualifying-stats-section">

            <div className="section-header">
                <div>
                    <span className="section-badge">
                        PERFORMANCE
                    </span>

                    <h2>
                        📊 Statistiques
                    </h2>
                </div>
            </div>

            <div className="qualifying-stats-grid">

                <div className="stat-card">
                    <span className="stat-title">
                        Meilleur tour
                    </span>

                    <strong className="stat-value">
                        {formatTime(
                            fastestData.meilleurTour
                        )}
                    </strong>

                    <small>{fastest}</small>
                </div>

                <div className="stat-card">
                    <span className="stat-title">
                        Écart
                    </span>

                    <strong className="stat-value">
                        {gap != null
                            ? `${gap.toFixed(3)} s`
                            : "—"}
                    </strong>

                    <small>
                        Entre les pilotes
                    </small>
                </div>

                <div className="stat-card">
                    <span className="stat-title">
                        Pneu
                    </span>

                    <strong className="stat-value">
                        {fastestData.compound ?? "—"}
                    </strong>

                    <small>
                        Âge {fastestData.agePneu ?? "—"} tours
                    </small>
                </div>

                <div className="stat-card">
                    <span className="stat-title">
                        Tour
                    </span>

                    <strong className="stat-value">
                        {fastestData.numeroMeilleurTour ?? "—"}
                    </strong>

                    <small>
                        Meilleur tour
                    </small>
                </div>

            </div>

        </div>
    );
}

export default QualifyingStats;