function PracticeSectors({
    driver1,
    driver2,
    data1,
    data2
}) {

    const sectors1 = data1.secteurs || {};
    const sectors2 = data2.secteurs || {};

    const sectors = [
        ["Secteur 1", sectors1.s1, sectors2.s1],
        ["Secteur 2", sectors1.s2, sectors2.s2],
        ["Secteur 3", sectors1.s3, sectors2.s3]
    ];


    return (
        <div className="card">

            <div className="section-header">
                <div>
                    <span className="section-badge">
                        PERFORMANCE
                    </span>

                    <h2>
                        ⏱️ Comparaison des secteurs
                    </h2>
                </div>
            </div>


            <div className="sector-grid">

                {sectors.map(
                    ([name, value1, value2]) => {

                        const valid =
                            value1 != null &&
                            value2 != null;

                        const winner =
                            valid
                                ? value1 <= value2
                                    ? driver1
                                    : driver2
                                : null;

                        const delta =
                            valid
                                ? Math.abs(
                                    value1 - value2
                                )
                                : null;


                        return (
                            <div
                                className="sector-card"
                                key={name}
                            >

                                <span className="sector-name">
                                    {name}
                                </span>


                                <div className="sector-driver">
                                    <span>{driver1}</span>

                                    <strong
                                        className={
                                            winner === driver1
                                                ? "sector-best"
                                                : ""
                                        }
                                    >
                                        {value1 != null
                                            ? `${value1.toFixed(3)} s`
                                            : "—"}
                                    </strong>
                                </div>


                                <div className="sector-driver">
                                    <span>{driver2}</span>

                                    <strong
                                        className={
                                            winner === driver2
                                                ? "sector-best"
                                                : ""
                                        }
                                    >
                                        {value2 != null
                                            ? `${value2.toFixed(3)} s`
                                            : "—"}
                                    </strong>
                                </div>


                                <div className="sector-result">
                                    <span>Avantage</span>

                                    <strong>
                                        {winner ?? "—"}
                                    </strong>

                                    <small>
                                        Δ{" "}
                                        {delta != null
                                            ? delta.toFixed(3)
                                            : "—"}{" "}
                                        s
                                    </small>
                                </div>

                            </div>
                        );
                    }
                )}

            </div>

        </div>
    );
}


export default PracticeSectors;