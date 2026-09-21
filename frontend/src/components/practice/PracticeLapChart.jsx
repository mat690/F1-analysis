import Plot from "react-plotly.js";


function PracticeLapChart({
    driver1,
    driver2,
    data1,
    data2
}) {

    const laps1 =
        Array.isArray(data1.tours)
            ? data1.tours
            : [];

    const laps2 =
        Array.isArray(data2.tours)
            ? data2.tours
            : [];


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
                </div>
            </div>


            <Plot
                data={[
                    {
                        x: laps1.map(
                            lap => lap.tour
                        ),

                        y: laps1.map(
                            lap => lap.temps
                        ),

                        type: "scatter",
                        mode: "lines+markers",
                        name: driver1
                    },

                    {
                        x: laps2.map(
                            lap => lap.tour
                        ),

                        y: laps2.map(
                            lap => lap.temps
                        ),

                        type: "scatter",
                        mode: "lines+markers",
                        name: driver2
                    }
                ]}

                layout={{
                    autosize: true,
                    height: 420,

                    title:
                        "Évolution des temps au tour",

                    paper_bgcolor:
                        "transparent",

                    plot_bgcolor:
                        "#1a1a1a",

                    font: {
                        color: "#ffffff"
                    },

                    xaxis: {
                        title: "Tour",
                        gridcolor: "#333333",
                        automargin: true
                    },

                    yaxis: {
                        title:
                            "Temps au tour (s)",
                        gridcolor: "#333333",
                        automargin: true
                    },

                    legend: {
                        orientation: "h",
                        x: 0.5,
                        xanchor: "center",
                        y: -0.15
                    },

                    margin: {
                        l: 70,
                        r: 30,
                        t: 60,
                        b: 80
                    }
                }}

                style={{
                    width: "100%",
                    height: "420px"
                }}

                useResizeHandler={true}

                config={{
                    responsive: true,
                    displayModeBar: false
                }}
            />

        </div>
    );
}


export default PracticeLapChart;