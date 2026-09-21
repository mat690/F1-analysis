import Plot from "react-plotly.js";

function RacePositionChart({
    driver1,
    driver2,
    data1,
    data2
}) {
    const laps1 = (data1?.tours ?? []).filter(
        lap =>
            lap.tour != null &&
            lap.position != null
    );

    const laps2 = (data2?.tours ?? []).filter(
        lap =>
            lap.tour != null &&
            lap.position != null
    );

    const trace1 = {
        x: laps1.map(lap => lap.tour),
        y: laps1.map(lap => lap.position),

        type: "scatter",
        mode: "lines",

        name: driver1,

        line: {
            width: 2
        },

        hovertemplate:
            `${driver1}<br>` +
            "Tour %{x}<br>" +
            "Position P%{y}" +
            "<extra></extra>"
    };

    const trace2 = {
        x: laps2.map(lap => lap.tour),
        y: laps2.map(lap => lap.position),

        type: "scatter",
        mode: "lines",

        name: driver2,

        line: {
            width: 2,
            dash: "dash"
        },

        hovertemplate:
            `${driver2}<br>` +
            "Tour %{x}<br>" +
            "Position P%{y}" +
            "<extra></extra>"
    };

    return (
        <div className="card">

            <div className="section-header">
                <div>
                    <span className="section-badge">
                        POSITIONS
                    </span>

                    <h2>
                        📊 Évolution des positions
                    </h2>

                    <p>
                        Position de {driver1} et {driver2}
                        {" "}au fil de la course
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
                            text: "Position"
                        },

                        autorange: "reversed",

                        dtick: 1,

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

export default RacePositionChart;