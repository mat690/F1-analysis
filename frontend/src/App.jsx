import Plot from "react-plotly.js";

import useTelemetry from "./hooks/useTelemetry";
import useDominance from "./hooks/useDominance";

import DominanceMap from "./components/DominanceMap";


function App() {

    // =========================
    // Sélections utilisateur
    // =========================

    const season = 2024;
    const race = "Monaco";

    const session = "R";

    const driver1 = "LEC";
    const driver2 = "VER";


    // =========================
    // Chargement télémétrie
    // =========================

    const {
        telemetry: telemetry1
    } = useTelemetry(
        season,
        race,
        session,
        driver1
    );


    const {
        telemetry: telemetry2
    } = useTelemetry(
        season,
        race,
        session,
        driver2
    );


    // =========================
    // Chargement domination
    // =========================

    const dominance = useDominance(
        season,
        race,
        session,
        driver1,
        driver2
    );


    // =========================
    // Données pilote 1
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


    // =========================
    // Données pilote 2
    // =========================

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
    // Sécurité affichage
    // =========================

    const telemetryAvailable =
        telemetry1.length > 0 &&
        telemetry2.length > 0;


    return (

        <div
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "20px",
                fontFamily: "Arial, sans-serif"
            }}
        >

            {/* ========================= */}
            {/* TITRE */}
            {/* ========================= */}

            <h1>
                🏎️ F1 Analysis
            </h1>

            <p>
                Comparaison de télémétrie :
                {" "}
                <strong>{driver1}</strong>
                {" "}
                vs
                {" "}
                <strong>{driver2}</strong>
            </p>

            <p>
                Grand Prix :
                {" "}
                <strong>{race}</strong>
                {" "}
                - Saison {season}
                {" "}
                - Session {session}
            </p>


            <hr />


            {/* ========================= */}
            {/* CHARGEMENT */}
            {/* ========================= */}

            {!telemetryAvailable && (

                <p>
                    Chargement des données télémétriques...
                </p>

            )}


            {/* ========================= */}
            {/* VITESSE */}
            {/* ========================= */}

            {telemetryAvailable && (

                <>

                    <h2>
                        Vitesse
                    </h2>

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

                            xaxis: {
                                title: "Distance (m)"
                            },

                            yaxis: {
                                title: "Vitesse (km/h)"
                            },

                            height: 450,

                            margin: {
                                l: 70,
                                r: 30,
                                t: 60,
                                b: 60
                            }

                        }}

                        style={{
                            width: "100%"
                        }}

                        useResizeHandler={true}

                        config={{
                            responsive: true
                        }}

                    />


                    {/* ========================= */}
                    {/* ACCÉLÉRATEUR */}
                    {/* ========================= */}

                    <h2>
                        Accélérateur
                    </h2>

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

                            title:
                                `Accélérateur ${driver1} vs ${driver2}`,

                            xaxis: {
                                title: "Distance (m)"
                            },

                            yaxis: {
                                title: "Accélérateur (%)",
                                range: [0, 105]
                            },

                            height: 350,

                            margin: {
                                l: 70,
                                r: 30,
                                t: 60,
                                b: 60
                            }

                        }}

                        style={{
                            width: "100%"
                        }}

                        useResizeHandler={true}

                        config={{
                            responsive: true
                        }}

                    />


                    {/* ========================= */}
                    {/* FREIN */}
                    {/* ========================= */}

                    <h2>
                        Frein
                    </h2>

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

                            title:
                                `Freinage ${driver1} vs ${driver2}`,

                            xaxis: {
                                title: "Distance (m)"
                            },

                            yaxis: {
                                title: "Frein",
                                range: [0, 110],

                                tickvals: [
                                    0,
                                    100
                                ],

                                ticktext: [
                                    "Non",
                                    "Oui"
                                ]
                            },

                            height: 300,

                            margin: {
                                l: 70,
                                r: 30,
                                t: 60,
                                b: 60
                            }

                        }}

                        style={{
                            width: "100%"
                        }}

                        useResizeHandler={true}

                        config={{
                            responsive: true
                        }}

                    />


                    {/* ========================= */}
                    {/* DRS */}
                    {/* ========================= */}

                    <h2>
                        DRS
                    </h2>

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

                            title:
                                `DRS ${driver1} vs ${driver2}`,

                            xaxis: {
                                title: "Distance (m)"
                            },

                            yaxis: {
                                title: "Valeur DRS"
                            },

                            height: 300,

                            margin: {
                                l: 70,
                                r: 30,
                                t: 60,
                                b: 60
                            }

                        }}

                        style={{
                            width: "100%"
                        }}

                        useResizeHandler={true}

                        config={{
                            responsive: true
                        }}

                    />

                </>

            )}


            <hr />


            {/* ========================= */}
            {/* DOMINATION */}
            {/* ========================= */}

            <DominanceMap

                data={dominance}

                driver1={driver1}

                driver2={driver2}

            />


        </div>

    );

}


export default App;