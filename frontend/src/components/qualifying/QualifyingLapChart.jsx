import Plot from "react-plotly.js";

function QualifyingLapChart({
    driver1,
    driver2,
    data1,
    data2
}) {
    // Tous les tours
    const allLaps1 = data1?.tours ?? [];
    const allLaps2 = data2?.tours ?? [];

    // Limite à 107 % du meilleur tour
    const limit1 =
        data1?.meilleurTour != null
            ? data1.meilleurTour * 1.07
            : null;

    const limit2 =
        data2?.meilleurTour != null
            ? data2.meilleurTour * 1.07
            : null;

    // Tours représentatifs
    const laps1 = allLaps1.filter(
        lap =>
            lap.temps != null &&
            limit1 != null &&
            lap.temps <= limit1
    );

    const laps2 = allLaps2.filter(
        lap =>
            lap.temps != null &&
            limit2 != null &&
            lap.temps <= limit2
    );

    // Pilote 1
    const trace1 = {
        x: laps1.map(lap => lap.tour),
        y: laps1.map(lap => lap.temps),

        type: "scatter",
        mode: "markers",

        name: driver1,

        marker: {
            size: 9
        },

        hovertemplate:
            `${driver1}<br>` +
            "Tour %{x}<br>" +
            "%{y:.3f} s" +
            "<extra></extra>"
    };

    // Pilote 2
    const trace2 = {
        x: laps2.map(lap => lap.tour),
        y: laps2.map(lap => lap.temps),

        type: "scatter",
        mode: "markers",

        name: driver2,

        marker: {
            size: 9,
            symbol: "diamond"
        },

        hovertemplate:
            `${driver2}<br>` +
            "Tour %{x}<br>" +
            "%{y:.3f} s" +
            "<extra></extra>"
    };

    return (
        <div className="card">

            <div className="section-header">

                <div>
                    <span className="section-badge">
                        CHRONOS
                    </span>

                    <h2>
                        📈 Temps au tour
                    </h2>

                    <p>
                        Tours représentatifs à moins de
                        107 % du meilleur chrono
                    </p>
                </div>

            </div>

            <Plot
                data={[
                    trace1,
                    trace2
                ]}

                layout={{
                    autosize: true,

                    paper_bgcolor: "transparent",
                    plot_bgcolor: "transparent",

                    font: {
                        color: "#dddddd"
                    },

                    margin: {
                        l: 65,
                        r: 25,
                        t: 20,
                        b: 60
                    },

                    xaxis: {
                        title: {
                            text: "Tour"
                        },

                        gridcolor: "#2c2c2c",
                        zeroline: false
                    },

                    yaxis: {
                        title: {
                            text: "Temps (secondes)"
                        },

                        gridcolor: "#2c2c2c",
                        zeroline: false
                    },

                    legend: {
                        orientation: "h",
                        x: 0,
                        y: 1.12
                    },

                    hovermode: "closest"
                }}

                config={{
                    responsive: true,
                    displaylogo: false
                }}

                useResizeHandler

                style={{
                    width: "100%",
                    height: "430px"
                }}
            />

        </div>
    );
}

export default QualifyingLapChart;