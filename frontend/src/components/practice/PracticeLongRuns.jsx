import Plot from "react-plotly.js";


function formatTime(seconds) {
    if (seconds == null) return "—";

    const minutes = Math.floor(seconds / 60);
    const remaining = seconds - minutes * 60;

    return `${minutes}:${remaining
        .toFixed(3)
        .padStart(6, "0")}`;
}


function LongRun({
    driver,
    run,
    index
}) {

    const laps =
        Array.isArray(run.tours)
            ? run.tours
            : [];

    const trend =
        run.degradation;

    let trendLabel = "Stable";

    if (trend != null) {
        if (trend > 0.02) {
            trendLabel =
                "Chronos en hausse";
        } else if (trend < -0.02) {
            trendLabel =
                "Chronos en baisse";
        }
    }


    return (
        <div className="long-run-card">

            <div className="long-run-top">

                <div>

                    <span className="long-run-label">
                        STINT {run.stint ?? index + 1}
                    </span>

                    <div className="long-run-compound">

                        <span
                            className={`tyre-badge ${
                                run.compound
                                    ?.toLowerCase()
                                ?? ""
                            }`}
                        >
                            {run.compound ?? "—"}
                        </span>

                    </div>

                </div>


                <div className="long-run-count">

                    <strong>
                        {run.nombreTours ?? 0}
                    </strong>

                    <span>
                        tours analysés
                    </span>

                </div>

            </div>


            <div className="long-run-stats">

                <div>
                    <span>Rythme moyen</span>
                    <strong>
                        {formatTime(
                            run.rythmeMoyen
                        )}
                    </strong>
                </div>


                <div>
                    <span>Meilleur tour</span>
                    <strong>
                        {formatTime(
                            run.meilleurTour
                        )}
                    </strong>
                </div>


                <div>
                    <span>Âge pneu</span>

                    <strong>
                        {run.agePneuDebut ?? "—"}
                        {" → "}
                        {run.agePneuFin ?? "—"}
                        {" tours"}
                    </strong>
                </div>


                <div>
                    <span>Régularité</span>

                    <strong>
                        {run.regularite != null
                            ? `${Number(
                                run.regularite
                            ).toFixed(3)} s`
                            : "—"}
                    </strong>
                </div>


                <div>
                    <span>Tendance</span>

                    <strong>
                        {trend != null
                            ? `${
                                trend > 0 ? "+" : ""
                            }${Number(
                                trend
                            ).toFixed(4)} s/tour`
                            : "—"}
                    </strong>

                    <small>
                        {trendLabel}
                    </small>
                </div>


                <div>
                    <span>Tours retenus</span>

                    <strong>
                        {run.nombreTours ?? 0}
                        {" / "}
                        {run.nombreToursBruts
                            ?? run.nombreTours
                            ?? 0}
                    </strong>
                </div>

            </div>


            {laps.length > 0 && (

                <div className="long-run-chart">

                    <Plot
                        data={[
                            {
                                x: laps.map(
                                    lap =>
                                        lap.agePneu
                                ),

                                y: laps.map(
                                    lap =>
                                        lap.temps
                                ),

                                type: "scatter",

                                mode:
                                    "lines+markers",

                                name: driver,

                                hovertemplate:
                                    "Âge pneu : %{x} tours<br>" +
                                    "Temps : %{y:.3f} s" +
                                    "<extra></extra>"
                            }
                        ]}

                        layout={{
                            autosize: true,
                            height: 300,

                            paper_bgcolor:
                                "transparent",

                            plot_bgcolor:
                                "#181818",

                            font: {
                                color: "#ffffff"
                            },

                            xaxis: {
                                title:
                                    "Âge du pneu",
                                gridcolor:
                                    "#303030"
                            },

                            yaxis: {
                                title:
                                    "Temps (s)",
                                gridcolor:
                                    "#303030"
                            },

                            margin: {
                                l: 65,
                                r: 20,
                                t: 25,
                                b: 60
                            },

                            showlegend: false
                        }}

                        style={{
                            width: "100%",
                            height: "300px"
                        }}

                        useResizeHandler={true}

                        config={{
                            responsive: true,
                            displayModeBar: false
                        }}
                    />

                </div>

            )}

        </div>
    );
}


function DriverLongRuns({
    driver,
    runs
}) {

    return (
        <div className="long-run-driver">

            <div className="long-run-driver-title">

                <span>PILOTE</span>

                <strong>
                    {driver}
                </strong>

            </div>


            {runs.length === 0 ? (

                <div className="long-run-empty">
                    Aucun relais exploitable.
                </div>

            ) : (

                runs.map(
                    (run, index) => (

                        <LongRun
                            key={
                                `${driver}-${run.stint ?? index}`
                            }
                            driver={driver}
                            run={run}
                            index={index}
                        />

                    )
                )

            )}

        </div>
    );
}


function PracticeLongRuns({
    driver1,
    driver2,
    data1,
    data2
}) {

    const longRuns1 =
        Array.isArray(data1.longsRelais)
            ? data1.longsRelais
            : [];

    const longRuns2 =
        Array.isArray(data2.longsRelais)
            ? data2.longsRelais
            : [];


    return (
        <div className="card">

            <div className="section-header">

                <div>

                    <span className="section-badge">
                        RYTHME DE COURSE
                    </span>

                    <h2>
                        🏎️ Longs relais
                    </h2>

                    <p>
                        Analyse des relais
                        représentatifs et de
                        l'évolution des chronos.
                    </p>

                </div>

            </div>


            {longRuns1.length === 0 &&
            longRuns2.length === 0 ? (

                <p>
                    Aucun long relais exploitable
                    détecté pour cette session.
                </p>

            ) : (

                <div className="long-run-grid">

                    <DriverLongRuns
                        driver={driver1}
                        runs={longRuns1}
                    />

                    <DriverLongRuns
                        driver={driver2}
                        runs={longRuns2}
                    />

                </div>

            )}

        </div>
    );
}


export default PracticeLongRuns;