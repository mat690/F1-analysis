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

import "./App.css";


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
    // COURSES DYNAMIQUES
    // =========================

    const races = useRaces(season);


    // =========================
    // PILOTES DYNAMIQUES
    // =========================

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


        if (!codes.includes(newDriver1)) {

            newDriver1 =
                drivers[0].code;

            setDriver1(
                newDriver1
            );
        }


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

    const {
        dominance,
        loading: dominanceLoading,
        error: dominanceError
    } = useDominance(
        season,
        race,
        session,
        driver1,
        driver2
    );


    // =========================
    // DONNÉES PILOTE 1
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


    // =========================
    // DONNÉES PILOTE 2
    // =========================

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
    // ÉTATS AFFICHAGE
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

// =========================
// STATISTIQUES
// =========================

const maxSpeed1 =
    speed1.length > 0
        ? Math.max(...speed1)
        : 0;

const maxSpeed2 =
    speed2.length > 0
        ? Math.max(...speed2)
        : 0;


// Écart maximal calculé à partir
// des données de domination interpolées
const maxDelta =
    dominance.length > 0
        ? Math.max(
            ...dominance.map(
                point => Math.abs(point.delta)
            )
        )
        : 0;


// Nombre de points dominés
const dominanceDriver1 =
    dominance.filter(
        point => point.delta >= 0
    ).length;

const dominanceDriver2 =
    dominance.filter(
        point => point.delta < 0
    ).length;


const totalDominancePoints =
    dominanceDriver1 +
    dominanceDriver2;


const dominancePercent1 =
    totalDominancePoints > 0
        ? (
            dominanceDriver1 /
            totalDominancePoints *
            100
        ).toFixed(1)
        : 0;


const dominancePercent2 =
    totalDominancePoints > 0
        ? (
            dominanceDriver2 /
            totalDominancePoints *
            100
        ).toFixed(1)
        : 0;
    return (

        <div className="app">

            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <div className="header">

                <h1>
                    🏎️ F1 Analysis
                </h1>

                <p>
                    Analyse comparative des performances pilotes
                </p>

            </div>


            {/* ========================= */}
            {/* FILTRES */}
            {/* ========================= */}

            <div className="filters">


                {/* SAISON */}

                <div className="filter-group">

                    <label>
                        Saison
                    </label>

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

                <div className="filter-group">

                    <label>
                        Grand Prix
                    </label>

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

                <div className="filter-group">

                    <label>
                        Session
                    </label>

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

                <div className="filter-group">

                    <label>
                        Pilote 1
                    </label>

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

                <div className="filter-group">

                    <label>
                        Pilote 2
                    </label>

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
            {/* INFORMATIONS */}
            {/* ========================= */}

            <div className="info">

                <p>
                    <strong>
                        {driver1}
                    </strong>

                    {" "}vs{" "}

                    <strong>
                        {driver2}
                    </strong>
                </p>


                <p>
                    {race}
                    {" • "}
                    {season}
                    {" • "}
                    {session}
                </p>

            </div>
{telemetryAvailable && (

    <div className="stats-grid">

        <div className="stat-card">

            <span className="stat-title">
                Vitesse max {driver1}
            </span>

            <strong className="stat-value">
                {maxSpeed1.toFixed(1)}
                <small> km/h</small>
            </strong>

        </div>


        <div className="stat-card">

            <span className="stat-title">
                Vitesse max {driver2}
            </span>

            <strong className="stat-value">
                {maxSpeed2.toFixed(1)}
                <small> km/h</small>
            </strong>

        </div>


        <div className="stat-card">

            <span className="stat-title">
                Écart maximal
            </span>

            <strong className="stat-value">
                {maxDelta.toFixed(1)}
                <small> km/h</small>
            </strong>

        </div>


        <div className="stat-card">

            <span className="stat-title">
                Domination
            </span>

            <strong className="stat-value stat-small">

                {driver1} {dominancePercent1}%

                <br />

                {driver2} {dominancePercent2}%

            </strong>

        </div>

    </div>

)}

            {/* ========================= */}
            {/* CHARGEMENT TÉLÉMÉTRIE */}
            {/* ========================= */}

            {telemetryLoading && (

                <p className="status">
                    ⏳ Chargement de {race}...
                </p>

            )}


            {telemetryError &&
                !telemetryLoading && (

                    <p className="status">
                        ⚠️ {telemetryError}
                    </p>

                )}


            {/* ========================= */}
            {/* GRAPHIQUES */}
            {/* ========================= */}

            {telemetryAvailable && (

                <>

                    {/* VITESSE */}

                    <div className="card">

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

                                autosize: true,

                                height: 420,

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

                    </div>


                    {/* ACCÉLÉRATEUR */}

                    <div className="card">

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

                                autosize: true,

                                height: 340,

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

                    </div>


                    {/* FREIN */}

                    <div className="card">

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

                    </div>


                    {/* DRS */}

                    <div className="card">

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

                    </div>

                </>

            )}


            {/* ========================= */}
            {/* DOMINATION */}
            {/* ========================= */}

            <div className="card">

                {dominanceLoading && (

                    <p className="status">
                        ⏳ Calcul de la domination {driver1} vs {driver2}...
                    </p>

                )}


                {dominanceError &&
                    !dominanceLoading && (

                        <p className="status">
                            ⚠️ {dominanceError}
                        </p>

                    )}


                {!dominanceLoading &&
                    !dominanceError &&
                    dominance.length > 0 && (

                        <DominanceMap
                            data={dominance}
                            driver1={driver1}
                            driver2={driver2}
                        />

                    )}

            </div>

        </div>

    );

}


export default App;