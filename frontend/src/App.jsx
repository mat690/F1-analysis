import { useState } from "react";
import Plot from "react-plotly.js";

import useTelemetry from "./hooks/useTelemetry";
import useDominance from "./hooks/useDominance";
import DominanceMap from "./components/DominanceMap";

function App() {

    // =========================
    // Sélections utilisateur
    // =========================

  const [season, setSeason] = useState(2024);
const [race, setRace] = useState("Monaco");
const [session, setSession] = useState("R");

const [driver1, setDriver1] = useState("LEC");
const [driver2, setDriver2] = useState("VER");


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
<div
    style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "25px"
    }}
>

    {/* SAISON */}

    <div>
        <label>Saison</label>

        <br />

        <select
            value={season}
            onChange={(e) =>
                setSeason(Number(e.target.value))
            }
        >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
        </select>
    </div>


    {/* GRAND PRIX */}

    <div>
        <label>Grand Prix</label>

        <br />

        <select
            value={race}
            onChange={(e) =>
                setRace(e.target.value)
            }
        >
            <option value="Monaco">
                Monaco
            </option>

            <option value="Monza">
                Italie - Monza
            </option>

            <option value="Silverstone">
                Grande-Bretagne
            </option>

            <option value="Spa">
                Belgique - Spa
            </option>

            <option value="Suzuka">
                Japon - Suzuka
            </option>
        </select>
    </div>


    {/* SESSION */}

    <div>
        <label>Session</label>

        <br />

        <select
            value={session}
            onChange={(e) =>
                setSession(e.target.value)
            }
        >
            <option value="FP1">
                Essais libres 1
            </option>

            <option value="FP2">
                Essais libres 2
            </option>

            <option value="FP3">
                Essais libres 3
            </option>

            <option value="Q">
                Qualifications
            </option>

            <option value="R">
                Course
            </option>
        </select>
    </div>


    {/* PILOTE 1 */}

    <div>
        <label>Pilote 1</label>

        <br />

        <select
            value={driver1}
            onChange={(e) =>
                setDriver1(e.target.value)
            }
        >
            <option value="LEC">Charles Leclerc</option>
            <option value="VER">Max Verstappen</option>
            <option value="NOR">Lando Norris</option>
            <option value="PIA">Oscar Piastri</option>
            <option value="HAM">Lewis Hamilton</option>
            <option value="RUS">George Russell</option>
            <option value="SAI">Carlos Sainz</option>
            <option value="ALO">Fernando Alonso</option>
        </select>
    </div>


    {/* PILOTE 2 */}

    <div>
        <label>Pilote 2</label>

        <br />

        <select
            value={driver2}
            onChange={(e) =>
                setDriver2(e.target.value)
            }
        >
            <option value="VER">Max Verstappen</option>
            <option value="LEC">Charles Leclerc</option>
            <option value="NOR">Lando Norris</option>
            <option value="PIA">Oscar Piastri</option>
            <option value="HAM">Lewis Hamilton</option>
            <option value="RUS">George Russell</option>
            <option value="SAI">Carlos Sainz</option>
            <option value="ALO">Fernando Alonso</option>
        </select>
    </div>

</div>
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