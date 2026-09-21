function formatTime(seconds) {
    if (seconds == null) return "—";

    const minutes = Math.floor(seconds / 60);
    const remaining = seconds - minutes * 60;

    return `${minutes}:${remaining
        .toFixed(3)
        .padStart(6, "0")}`;
}


function TyreRow({
    driver,
    data
}) {

    const tyre =
        data.meilleurTourPneu || {};

    return (
        <tr>

            <td>
                <strong>{driver}</strong>
            </td>

            <td className="table-time">
                {formatTime(data.meilleurTour)}
            </td>

            <td>
                <span
                    className={`tyre-badge ${
                        tyre.compound?.toLowerCase()
                        ?? ""
                    }`}
                >
                    {tyre.compound ?? "—"}
                </span>
            </td>

            <td>
                {tyre.agePneu != null
                    ? `${tyre.agePneu} tours`
                    : "—"}
            </td>

            <td>
                {tyre.numeroTour ?? "—"}
            </td>

            <td>
                {tyre.pneuNeuf === true
                    ? "● Neuf"
                    : tyre.pneuNeuf === false
                        ? "● Usé"
                        : "—"}
            </td>

        </tr>
    );
}


function PracticeTyres({
    driver1,
    driver2,
    data1,
    data2
}) {

    return (
        <div className="card">

            <div className="section-header">
                <div>
                    <span className="section-badge">
                        PNEUMATIQUES
                    </span>

                    <h2>
                        🛞 Pneu au meilleur tour
                    </h2>
                </div>
            </div>


            <div className="table-container">

                <table className="practice-table">

                    <thead>
                        <tr>
                            <th>Pilote</th>
                            <th>Chrono</th>
                            <th>Composé</th>
                            <th>Âge du pneu</th>
                            <th>Tour</th>
                            <th>État</th>
                        </tr>
                    </thead>

                    <tbody>

                        <TyreRow
                            driver={driver1}
                            data={data1}
                        />

                        <TyreRow
                            driver={driver2}
                            data={data2}
                        />

                    </tbody>

                </table>

            </div>

        </div>
    );
}


export default PracticeTyres;