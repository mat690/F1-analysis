function LongRunAnalysis({ data }) {

    if (!data || data.length === 0) {
        return (
            <p>Aucun long relais disponible.</p>
        );
    }

    const getTyreColor = (compound) => {

        switch (compound.toUpperCase()) {

            case "SOFT":
            case "DOUX":
                return "#e10600";

            case "MEDIUM":
            case "MOYEN":
                return "#ffd500";

            case "HARD":
            case "DUR":
                return "#ffffff";

            case "INTERMEDIATE":
                return "#43a047";

            case "WET":
                return "#1976d2";

            default:
                return "#888";
        }
    };

    return (

        <div>

            <h2>Long Run Analysis</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
                    gap: "20px"
                }}
            >

                {data.map((stint) => (

                    <div
                        key={stint.stint}
                        style={{
                            border: `5px solid ${getTyreColor(stint.compound)}`,
                            borderRadius: "12px",
                            padding: "18px",
                            background: "#1e1e1e",
                            color: "white",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                        }}
                    >

                        <h3>
                            Relais {stint.stint}
                        </h3>

                        <p>
                            <strong>Pneu :</strong> {stint.compound}
                        </p>

                        <p>
                            <strong>Tours :</strong> {stint.laps}
                        </p>

                        <p>
                            <strong>Du tour :</strong> {stint.start} → {stint.end}
                        </p>

                        <hr />

                        <p>
                            <strong>Meilleur :</strong><br />
                            {stint.best.toFixed(3)} s
                        </p>

                        <p>
                            <strong>Moyenne :</strong><br />
                            {stint.average.toFixed(3)} s
                        </p>

                        <p
                            style={{
                                color:
                                    stint.degradation > 0
                                        ? "#ff5252"
                                        : "#66bb6a",
                                fontWeight: "bold"
                            }}
                        >
                            Dégradation :
                            <br />

                            {stint.degradation > 0 ? "+" : ""}
                            {stint.degradation.toFixed(3)} s/tour

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default LongRunAnalysis;