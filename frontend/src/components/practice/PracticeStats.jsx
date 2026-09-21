function formatTime(seconds) {
    if (seconds == null) return "—";

    const minutes = Math.floor(seconds / 60);
    const remaining = seconds - minutes * 60;

    return `${minutes}:${remaining
        .toFixed(3)
        .padStart(6, "0")}`;
}


function PracticeStats({
    driver1,
    driver2,
    data1,
    data2
}) {

    const difference =
        data1.meilleurTour != null &&
        data2.meilleurTour != null
            ? Math.abs(
                data1.meilleurTour -
                data2.meilleurTour
            )
            : null;

    return (
        <div className="stats-grid">

            <div className="stat-card">
                <span className="stat-title">
                    Meilleur tour {driver1}
                </span>

                <strong className="stat-value">
                    {formatTime(data1.meilleurTour)}
                </strong>
            </div>


            <div className="stat-card">
                <span className="stat-title">
                    Meilleur tour {driver2}
                </span>

                <strong className="stat-value">
                    {formatTime(data2.meilleurTour)}
                </strong>
            </div>


            <div className="stat-card">
                <span className="stat-title">
                    Rythme moyen {driver1}
                </span>

                <strong className="stat-value">
                    {formatTime(data1.rythmeMoyen)}
                </strong>
            </div>


            <div className="stat-card">
                <span className="stat-title">
                    Rythme moyen {driver2}
                </span>

                <strong className="stat-value">
                    {formatTime(data2.rythmeMoyen)}
                </strong>
            </div>


            <div className="stat-card">
                <span className="stat-title">
                    Régularité {driver1}
                </span>

                <strong className="stat-value">
                    {data1.regularite != null
                        ? `${data1.regularite.toFixed(3)} s`
                        : "—"}
                </strong>
            </div>


            <div className="stat-card">
                <span className="stat-title">
                    Régularité {driver2}
                </span>

                <strong className="stat-value">
                    {data2.regularite != null
                        ? `${data2.regularite.toFixed(3)} s`
                        : "—"}
                </strong>
            </div>


            <div className="stat-card">
                <span className="stat-title">
                    Tours représentatifs
                </span>

                <strong className="stat-value stat-small">
                    {driver1} : {data1.toursRepresentatifs ?? 0}
                    <br />
                    {driver2} : {data2.toursRepresentatifs ?? 0}
                </strong>
            </div>


            <div className="stat-card">
                <span className="stat-title">
                    Écart meilleur tour
                </span>

                <strong className="stat-value">
                    {difference != null
                        ? `${difference.toFixed(3)} s`
                        : "—"}
                </strong>
            </div>

        </div>
    );
}


export default PracticeStats;