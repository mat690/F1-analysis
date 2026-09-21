import Plot from "react-plotly.js";

function PracticeRepresentativeLaps({
    driver1,
    driver2,
    data1,
    data2
}) {
    const laps1 = Array.isArray(data1.tours)
        ? data1.tours.filter(
            lap =>
                lap.temps != null &&
                data1.limiteTourRepresentatif != null &&
                lap.temps <= data1.limiteTourRepresentatif
        )
        : [];

    const laps2 = Array.isArray(data2.tours)
        ? data2.tours.filter(
            lap =>
                lap.temps != null &&
                data2.limiteTourRepresentatif != null &&
                lap.temps <= data2.limiteTourRepresentatif
        )
        : [];

    return (
        <div className="card">

            <div className="section-header">
                <div>
                    <span className="section-badge">
                        RYTHME
                    </span>

                    <h2>
                        🏎️ Tours représentatifs
                    </h2>

                    <p>
                        Tours retenus pour analyser le
                        rythme des pilotes.
                    </p>
                </div>
            </div>

            {laps1.length === 0 &&
            laps2.length === 0 ? (
                <div className="long-run-empty">
                    Aucun tour représentatif disponible.
                </div>
            ) : (
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
                           mode: "markers",
                            name: driver1,
                            hovertemplate:
                                `Pilote : ${driver1}<br>` +
                                "Tour : %{x}<br>" +
                                "Temps : %{y:.3f} s" +
                                "<extra></extra>"
                        },
                        {
                            x: laps2.map(
                                lap => lap.tour
                            ),
                            y: laps2.map(
                                lap => lap.temps
                            ),
                            type: "scatter",
                           mode: "markers",
                            name: driver2,
                            hovertemplate:
                                `Pilote : ${driver2}<br>` +
                                "Tour : %{x}<br>" +
                                "Temps : %{y:.3f} s" +
                                "<extra></extra>"
                        }
                    ]}
                    layout={{
                        autosize: true,
                        height: 420,

                        paper_bgcolor: "transparent",
                        plot_bgcolor: "#1a1a1a",

                        font: {
                            color: "#ffffff"
                        },

                        margin: {
                            l: 70,
                            r: 30,
                            t: 30,
                            b: 80
                        },

                        xaxis: {
                            title: "Numéro du tour",
                            gridcolor: "#333333",
                            automargin: true
                        },

                        yaxis: {
                            title: "Temps au tour (s)",
                            gridcolor: "#333333",
                            automargin: true
                        },

                        legend: {
                            orientation: "h",
                            x: 0.5,
                            xanchor: "center",
                            y: -0.15
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
            )}

        </div>
    );
}

export default PracticeRepresentativeLaps;