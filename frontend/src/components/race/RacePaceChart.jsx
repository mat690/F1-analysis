import Plot from "react-plotly.js";

function RacePaceChart({
    driver1,
    driver2,
    data1,
    data2
}) {
    const allLaps1 = data1?.tours ?? [];
    const allLaps2 = data2?.tours ?? [];

    const validTimes1 = allLaps1
        .map(lap => lap.temps)
        .filter(time => time != null);

    const validTimes2 = allLaps2
        .map(lap => lap.temps)
        .filter(time => time != null);

    const best1 =
        validTimes1.length > 0
            ? Math.min(...validTimes1)
            : null;

    const best2 =
        validTimes2.length > 0
            ? Math.min(...validTimes2)
            : null;

    /*
        On retire les tours très éloignés du meilleur tour.
        Cela permet notamment de limiter l'impact des tours
        anormalement lents sur le graphique.
    */

    const limit1 =
        best1 != null
            ? best1 * 1.15
            : null;

    const limit2 =
        best2 != null
            ? best2 * 1.15
            : null;

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

    const trace1 = {
        x: laps1.map(lap => lap.tour),
        y: laps1.map(lap => lap.temps),

        type: "scatter",
        mode: "lines",

        name: driver1,

        line: {
            width: 2
        },

        hovertemplate:
            `${driver1}<br>` +
            "Tour %{x}<br>" +
            "%{y:.3f} s" +
            "<extra></extra>"
    };

    const trace2 = {
        x: laps2.map(lap => lap.tour),
        y: laps2.map(lap => lap.temps),

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
            "%{y:.3f} s" +
            "<extra></extra>"
    };

    return (
        <div className="card">

            <div className="section-header">
                <div>
                    <span className="section-badge">
                        RYTHME
                    </span>

                    <h2>
                        📈 Rythme de course
                    </h2>

                    <p>
                        Comparaison des temps au tour
                        de {driver1} et {driver2}
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

export default RacePaceChart;