import { useState } from "react";
import Plot from "react-plotly.js";

import useTelemetry from "./hooks/useTelemetry";
import useDominance from "./hooks/useDominance";


function App() {

    const [season, setSeason] = useState(2024);
    const [race, setRace] = useState("Monaco");
    const [session, setSession] = useState("R");

    const [driver1, setDriver1] = useState("LEC");
    const [driver2, setDriver2] = useState("VER");


    // =========================
    // API
    // =========================

    const {
        telemetry
    } = useTelemetry(
        season,
        race,
        session,
        driver1
    );


    const dominance = useDominance(
        season,
        race,
        session,
        driver1,
        driver2
    );


    // =========================
    // Télémétrie
    // =========================

    const telemetryDistance = telemetry.map(
        p => p.distance
    );

    const telemetrySpeed = telemetry.map(
        p => p.vitesse
    );

    const telemetryThrottle = telemetry.map(
        p => p.accelerateur
    );


    // =========================
    // Carte circuit télémétrie
    // =========================

    const telemetryX = telemetry.map(
        p => p.x
    );

    const telemetryY = telemetry.map(
        p => p.y
    );


    // =========================
    // Domination
    // =========================

    const driver1Dominance =
        dominance.filter(
            p => p.delta >= 0
        );

    const driver2Dominance =
        dominance.filter(
            p => p.delta < 0
        );


    return (

        <div
            style={{
                maxWidth: "1200px",
                margin: "auto",
                padding: "20px",
                fontFamily: "Arial"
            }}
        >

            <h1>
                🏎️ F1 Analysis
            </h1>


            {/* ========================= */}
            {/* Sélecteurs */}
            {/* ========================= */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "30px"
                }}
            >

                <select
                    value={season}
                    onChange={
                        e => setSeason(
                            Number(e.target.value)
                        )
                    }
                >
                    <option value={2024}>
                        2024
                    </option>
                </select>


                <select
                    value={race}
                    onChange={
                        e => setRace(
                            e.target.value
                        )
                    }
                >
                    <option value="Monaco">
                        Monaco
                    </option>
                </select>


                <select
                    value={session}
                    onChange={
                        e => setSession(
                            e.target.value
                        )
                    }
                >
                    <option value="FP1">
                        Essais Libres 1
                    </option>

                    <option value="FP2">
                        Essais Libres 2
                    </option>

                    <option value="FP3">
                        Essais Libres 3
                    </option>

                    <option value="Q">
                        Qualifications
                    </option>

                    <option value="R">
                        Course
                    </option>
                </select>


                <select
                    value={driver1}
                    onChange={
                        e => setDriver1(
                            e.target.value
                        )
                    }
                >
                    <option value="LEC">
                        Charles Leclerc
                    </option>

                    <option value="VER">
                        Max Verstappen
                    </option>

                    <option value="NOR">
                        Lando Norris
                    </option>
                </select>


                <select
                    value={driver2}
                    onChange={
                        e => setDriver2(
                            e.target.value
                        )
                    }
                >
                    <option value="VER">
                        Max Verstappen
                    </option>

                    <option value="LEC">
                        Charles Leclerc
                    </option>

                    <option value="NOR">
                        Lando Norris
                    </option>
                </select>

            </div>


            {/* ========================= */}
            {/* TELEMETRIE */}
            {/* ========================= */}

            <h2>
                📡 Télémétrie {driver1}
            </h2>


            {
                telemetry.length === 0 ? (

                    <p>
                        Chargement de la télémétrie...
                    </p>

                ) : (

                    <>
                        <Plot

                            data={[
                                {
                                    x: telemetryDistance,
                                    y: telemetrySpeed,
                                    type: "scatter",
                                    mode: "lines",
                                    name: "Vitesse"
                                },

                                {
                                    x: telemetryDistance,
                                    y: telemetryThrottle,
                                    type: "scatter",
                                    mode: "lines",
                                    name: "Accélérateur"
                                }
                            ]}

                            layout={{
                                title: "Télémétrie",
                                autosize: true,
                                height: 450,

                                xaxis: {
                                    title: "Distance"
                                },

                                yaxis: {
                                    title: "Valeur"
                                }
                            }}

                            style={{
                                width: "100%"
                            }}

                            useResizeHandler={true}

                        />


                        <h2>
                            🗺️ Circuit
                        </h2>


                        <Plot

                            data={[
                                {
                                    x: telemetryX,
                                    y: telemetryY,

                                    mode: "lines",

                                    type: "scatter",

                                    name: driver1
                                }
                            ]}

                            layout={{
                                title:
                                    `Tour rapide ${driver1}`,

                                autosize: true,

                                height: 600,

                                xaxis: {
                                    visible: false
                                },

                                yaxis: {
                                    visible: false,
                                    scaleanchor: "x"
                                }
                            }}

                            style={{
                                width: "100%"
                            }}

                            useResizeHandler={true}

                        />

                    </>

                )
            }


            {/* ========================= */}
            {/* DOMINATION */}
            {/* ========================= */}

            <h2>
                🏁 Domination {driver1} vs {driver2}
            </h2>


            {
                dominance.length === 0 ? (

                    <p>
                        Chargement de la domination...
                    </p>

                ) : (

                    <>

                        <p>
                            🟢 {driver1} plus rapide :
                            {" "}
                            {driver1Dominance.length}
                            {" "}
                            points
                        </p>

                        <p>
                            🔴 {driver2} plus rapide :
                            {" "}
                            {driver2Dominance.length}
                            {" "}
                            points
                        </p>


                        <Plot

                            data={[

                                {
                                    x:
                                        driver1Dominance.map(
                                            p => p.x
                                        ),

                                    y:
                                        driver1Dominance.map(
                                            p => p.y
                                        ),

                                    mode: "markers",

                                    type: "scatter",

                                    name: driver1,

                                    marker: {
                                        size: 5
                                    }
                                },

                                {
                                    x:
                                        driver2Dominance.map(
                                            p => p.x
                                        ),

                                    y:
                                        driver2Dominance.map(
                                            p => p.y
                                        ),

                                    mode: "markers",

                                    type: "scatter",

                                    name: driver2,

                                    marker: {
                                        size: 5
                                    }
                                }

                            ]}

                            layout={{
                                title:
                                    `${driver1} vs ${driver2}`,

                                autosize: true,

                                height: 600,

                                xaxis: {
                                    visible: false
                                },

                                yaxis: {
                                    visible: false,
                                    scaleanchor: "x"
                                }
                            }}

                            style={{
                                width: "100%"
                            }}

                            useResizeHandler={true}

                        />

                    </>

                )
            }

        </div>

    );

}


export default App;