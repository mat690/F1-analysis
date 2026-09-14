import { useState } from "react";
import Plot from "react-plotly.js";

import useTelemetry from "./hooks/useTelemetry";
import useDominance from "./hooks/useDominance";


function App() {

    // =========================
    // Sélections
    // =========================

    const [season, setSeason] = useState(2024);
    const [race, setRace] = useState("Monaco");
    const [session, setSession] = useState("R");

    const [driver1, setDriver1] = useState("LEC");
    const [driver2, setDriver2] = useState("VER");


    // =========================
    // Télémétrie pilote 1
    // =========================

    const {
        telemetry: telemetry1
    } = useTelemetry(
        season,
        race,
        session,
        driver1
    );


    // =========================
    // Télémétrie pilote 2
    // =========================

    const {
        telemetry: telemetry2
    } = useTelemetry(
        season,
        race,
        session,
        driver2
    );


    // =========================
    // Domination
    // =========================

    const dominance = useDominance(
        season,
        race,
        session,
        driver1,
        driver2
    );


    // =========================
    // Données télémétrie
    // =========================

    const distance1 = telemetry1.map(
        p => p.distance
    );

    const speed1 = telemetry1.map(
        p => p.vitesse
    );

    const throttle1 = telemetry1.map(
        p => p.accelerateur
    );

    const brake1 = telemetry1.map(
        p => p.frein ? 100 : 0
    );

    const drs1 = telemetry1.map(
        p => p.drs
    );


    const distance2 = telemetry2.map(
        p => p.distance
    );

    const speed2 = telemetry2.map(
        p => p.vitesse
    );

    const throttle2 = telemetry2.map(
        p => p.accelerateur
    );

    const brake2 = telemetry2.map(
        p => p.frein ? 100 : 0
    );

    const drs2 = telemetry2.map(
        p => p.drs
    );


    // =========================
    // Circuit pilote 1
    // =========================

    const circuitX = telemetry1.map(
        p => p.x
    );

    const circuitY = telemetry1.map(
        p => p.y
    );


    // =========================
    // Domination
    // =========================

    const driver1Dominance =
        Array.isArray(dominance)
            ? dominance.filter(
                p => p.delta >= 0
            )
            : [];

    const driver2Dominance =
        Array.isArray(dominance)
            ? dominance.filter(
                p => p.delta < 0
            )
            : [];


    // =========================
    // Interface
    // =========================

    return (

        <div
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "20px",
                fontFamily: "Arial, sans-serif"
            }}
        >

            <h1
                style={{
                    textAlign: "center"
                }}
            >
                🏎️ F1 Analysis
            </h1>


            {/* ========================= */}
            {/* Sélecteurs */}
            {/* ========================= */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
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

                    <option value="PIA">
                        Oscar Piastri
                    </option>

                    <option value="HAM">
                        Lewis Hamilton
                    </option>

                    <option value="RUS">
                        George Russell
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

                    <option value="PIA">
                        Oscar Piastri
                    </option>

                    <option value="HAM">
                        Lewis Hamilton
                    </option>

                    <option value="RUS">
                        George Russell
                    </option>

                </select>

            </div>


            {/* ========================= */}
            {/* VITESSE */}
            {/* ========================= */}

            <h2>
                📡 Vitesse — {driver1} vs {driver2}
            </h2>


            {
                telemetry1.length === 0 ||
                telemetry2.length === 0 ? (

                    <p>
                        Chargement de la télémétrie...
                    </p>

                ) : (

                    <Plot

                        data={[
                            {
                                x: distance1,
                                y: speed1,
                                type: "scatter",
                                mode: "lines",
                                name: driver1
                            },

                            {
                                x: distance2,
                                y: speed2,
                                type: "scatter",
                                mode: "lines",
                                name: driver2
                            }
                        ]}

                        layout={{
                            title:
                                `Vitesse ${driver1} vs ${driver2}`,

                            autosize: true,

                            height: 430,

                            xaxis: {
                                title:
                                    "Distance (m)"
                            },

                            yaxis: {
                                title:
                                    "Vitesse (km/h)"
                            },

                            hovermode:
                                "x unified"
                        }}

                        style={{
                            width: "100%"
                        }}

                        useResizeHandler={true}

                    />

                )
            }


            {/* ========================= */}
            {/* ACCELERATEUR */}
            {/* ========================= */}

            <h2>
                Accélérateur
            </h2>


            {
                telemetry1.length > 0 &&
                telemetry2.length > 0 && (

                    <Plot

                        data={[
                            {
                                x: distance1,
                                y: throttle1,
                                type: "scatter",
                                mode: "lines",
                                name: driver1
                            },

                            {
                                x: distance2,
                                y: throttle2,
                                type: "scatter",
                                mode: "lines",
                                name: driver2
                            }
                        ]}

                        layout={{
                            autosize: true,

                            height: 300,

                            xaxis: {
                                title:
                                    "Distance (m)"
                            },

                            yaxis: {
                                title:
                                    "Accélérateur (%)",
                                range: [0, 100]
                            },

                            hovermode:
                                "x unified"
                        }}

                        style={{
                            width: "100%"
                        }}

                        useResizeHandler={true}

                    />

                )
            }


            {/* ========================= */}
            {/* FREIN */}
            {/* ========================= */}

            <h2>
                Frein
            </h2>


            {
                telemetry1.length > 0 &&
                telemetry2.length > 0 && (

                    <Plot

                        data={[
                            {
                                x: distance1,
                                y: brake1,
                                type: "scatter",
                                mode: "lines",
                                name: driver1
                            },

                            {
                                x: distance2,
                                y: brake2,
                                type: "scatter",
                                mode: "lines",
                                name: driver2
                            }
                        ]}

                        layout={{
                            autosize: true,

                            height: 250,

                            xaxis: {
                                title:
                                    "Distance (m)"
                            },

                            yaxis: {
                                title:
                                    "Frein",
                                range: [0, 100]
                            },

                            hovermode:
                                "x unified"
                        }}

                        style={{
                            width: "100%"
                        }}

                        useResizeHandler={true}

                    />

                )
            }


            {/* ========================= */}
            {/* DRS */}
            {/* ========================= */}

            <h2>
                DRS
            </h2>


            {
                telemetry1.length > 0 &&
                telemetry2.length > 0 && (

                    <Plot

                        data={[
                            {
                                x: distance1,
                                y: drs1,
                                type: "scatter",
                                mode: "lines",
                                name: driver1
                            },

                            {
                                x: distance2,
                                y: drs2,
                                type: "scatter",
                                mode: "lines",
                                name: driver2
                            }
                        ]}

                        layout={{
                            autosize: true,

                            height: 250,

                            xaxis: {
                                title:
                                    "Distance (m)"
                            },

                            yaxis: {
                                title:
                                    "DRS"
                            },

                            hovermode:
                                "x unified"
                        }}

                        style={{
                            width: "100%"
                        }}

                        useResizeHandler={true}

                    />

                )
            }


            {/* ========================= */}
            {/* CIRCUIT */}
            {/* ========================= */}

            <h2>
                🗺️ Circuit
            </h2>


            {
                telemetry1.length === 0 ? (

                    <p>
                        Pas de données circuit.
                    </p>

                ) : (

                    <Plot

                        data={[
                            {
                                x: circuitX,
                                y: circuitY,

                                type: "scatter",

                                mode: "lines",

                                name: driver1
                            }
                        ]}

                        layout={{
                            title:
                                `Tour rapide ${driver1}`,

                            autosize: true,

                            height: 550,

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

                                    type:
                                        "scatter",

                                    mode:
                                        "markers",

                                    name:
                                        driver1,

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

                                    type:
                                        "scatter",

                                    mode:
                                        "markers",

                                    name:
                                        driver2,

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