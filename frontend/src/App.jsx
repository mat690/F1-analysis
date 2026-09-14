import {
    useEffect,
    useState
} from "react";

import Plot from "react-plotly.js";

import useTelemetry from "./hooks/useTelemetry";
import useDominance from "./hooks/useDominance";
import useRaces from "./hooks/useRaces";
import useDrivers from "./hooks/useDrivers";

import DominanceMap from "./components/DominanceMap";


function App() {

    // =========================
    // ÉTATS
    // =========================

    const [season, setSeason] = useState(2024);

    const [race, setRace] = useState(
        "Monaco Grand Prix"
    );

    const [session, setSession] = useState("R");

    const [driver1, setDriver1] = useState("LEC");
    const [driver2, setDriver2] = useState("VER");


    // =========================
    // DONNÉES DYNAMIQUES
    // =========================

    const races = useRaces(season);

    const drivers = useDrivers(
        season,
        race,
        session
    );


    // =========================
    // VÉRIFICATION GRAND PRIX
    // =========================

    useEffect(() => {

        if (races.length === 0) {
            return;
        }

        if (!races.includes(race)) {
            setRace(races[0]);
        }

    }, [
        races,
        race
    ]);


    // =========================
    // VÉRIFICATION PILOTES
    // =========================

    useEffect(() => {

        if (drivers.length === 0) {
            return;
        }

        const codes = drivers.map(
            driver => driver.code
        );


        let newDriver1 = driver1;
        let newDriver2 = driver2;


        // Pilote 1 invalide
        if (!codes.includes(newDriver1)) {
            newDriver1 = drivers[0].code;
            setDriver1(newDriver1);
        }


        // Pilote 2 invalide
        if (
            !codes.includes(newDriver2) ||
            newDriver2 === newDriver1
        ) {

            const secondDriver =
                drivers.find(
                    driver =>
                        driver.code !== newDriver1
                );

            if (secondDriver) {
                setDriver2(
                    secondDriver.code
                );
            }
        }

    }, [
        drivers,
        driver1,
        driver2
    ]);


    // =========================
    // TÉLÉMÉTRIE PILOTE 1
    // =========================

 const {
    telemetry: telemetry1,
    loading: loading1,
    error: error1
} = useTelemetry(
    season,
    race,
    session,
    driver1
);

    // =========================
    // TÉLÉMÉTRIE PILOTE 2
    // =========================

  const {
    telemetry: telemetry2,
    loading: loading2,
    error: error2
} = useTelemetry(
    season,
    race,
    session,
    driver2
);


    // =========================
    // DOMINATION
    // =========================

    const dominance = useDominance(
        season,
        race,
        session,
        driver1,
        driver2
    );


    // =========================
    // DONNÉES GRAPHIQUES
    // =========================

    const distance1 = telemetry1.map(
        point => point.distance
    );

    const speed1 = telemetry1.map(
        point => point.vitesse
    );

    const throttle1 = telemetry1.map(
        point => point.accelerateur
    );

    const brake1 = telemetry1.map(
        point => point.frein ? 100 : 0
    );

    const drs1 = telemetry1.map(
        point => point.drs
    );


    const distance2 = telemetry2.map(
        point => point.distance
    );

    const speed2 = telemetry2.map(
        point => point.vitesse
    );

    const throttle2 = telemetry2.map(
        point => point.accelerateur
    );

    const brake2 = telemetry2.map(
        point => point.frein ? 100 : 0
    );

    const drs2 = telemetry2.map(
        point => point.drs
    );


    // =========================
    // CHARGEMENT
    // =========================
const telemetryLoading =
    loading1 || loading2;

const telemetryError =
    error1 || error2;

const telemetryAvailable =
    !telemetryLoading &&
    !telemetryError &&
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

            <h1
                style={{
                    textAlign: "center"
                }}
            >
                🏎️ F1 Analysis
            </h1>


            {/* ========================= */}
            {/* FILTRES */}
            {/* ========================= */}

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginBottom: "25px"
                }}
            >

                {/* SAISON */}

                <div>

                    <label>
                        Saison
                    </label>

                    <br />

                    <select
                        value={season}
                        onChange={(e) =>
                            setSeason(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    >
                        <option value={2024}>
                            2024
                        </option>

                        <option value={2023}>
                            2023
                        </option>

                        <option value={2022}>
                            2022
                        </option>

                    </select>

                </div>


                {/* GRAND PRIX */}

                <div>

                    <label>
                        Grand Prix
                    </label>

                    <br />

                    <select
                        value={race}
                        onChange={(e) =>
                            setRace(
                                e.target.value
                            )
                        }
                    >

                        {races.map(
                            raceName => (

                                <option
                                    key={raceName}
                                    value={raceName}
                                >
                                    {raceName}
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* SESSION */}

                <div>

                    <label>
                        Session
                    </label>

                    <br />

                    <select
                        value={session}
                        onChange={(e) =>
                            setSession(
                                e.target.value
                            )
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

                    <label>
                        Pilote 1
                    </label>

                    <br />

                    <select
                        value={driver1}
                        onChange={(e) =>
                            setDriver1(
                                e.target.value
                            )
                        }
                    >

                        {drivers.map(
                            driver => (

                                <option
                                    key={driver.code}
                                    value={driver.code}
                                    disabled={
                                        driver.code ===
                                        driver2
                                    }
                                >
                                    {driver.nom}
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* PILOTE 2 */}

                <div>

                    <label>
                        Pilote 2
                    </label>

                    <br />

                    <select
                        value={driver2}
                        onChange={(e) =>
                            setDriver2(
                                e.target.value
                            )
                        }
                    >

                        {drivers.map(
                            driver => (

                                <option
                                    key={driver.code}
                                    value={driver.code}
                                    disabled={
                                        driver.code ===
                                        driver1
                                    }
                                >
                                    {driver.nom}
                                </option>

                            )
                        )}

                    </select>

                </div>

            </div>


            {/* ========================= */}
            {/* INFOS */}
            {/* ========================= */}

            <div
                style={{
                    textAlign: "center"
                }}
            >

                <p>

                    Comparaison de télémétrie :

                    {" "}

                    <strong>
                        {driver1}
                    </strong>

                    {" "}

                    vs

                    {" "}

                    <strong>
                        {driver2}
                    </strong>

                </p>


                <p>

                    Grand Prix :

                    {" "}

                    <strong>
                        {race}
                    </strong>

                    {" "}

                    - Saison {season}

                    {" "}

                    - Session {session}

                </p>

            </div>


            <hr />


            {/* ========================= */}
            {/* CHARGEMENT */}
            {/* ========================= */}

           {telemetryLoading && (

    <p
        style={{
            textAlign: "center"
        }}
    >
        ⏳ Chargement de {race}...
    </p>

)}


{telemetryError && !telemetryLoading && (

    <p
        style={{
            textAlign: "center"
        }}
    >
        ⚠️ {telemetryError}
    </p>

)}


            {/* ========================= */}
            {/* GRAPHIQUES */}
            {/* ========================= */}

            {telemetryAvailable && (

                <>

                    {/* VITESSE */}

                    <h2
                        style={{
                            textAlign: "center"
                        }}
                    >
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

                            autosize: true,

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


                    {/* ACCÉLÉRATEUR */}

                    <h2
                        style={{
                            textAlign: "center"
                        }}
                    >
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

                            autosize: true,

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


                    {/* FREIN */}

                    <h2
                        style={{
                            textAlign: "center"
                        }}
                    >
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

                            autosize: true,

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


                    {/* DRS */}

                    <h2
                        style={{
                            textAlign: "center"
                        }}
                    >
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

                            autosize: true,

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
            {/* CARTE DE DOMINATION */}
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