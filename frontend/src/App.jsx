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

    const [season, setSeason] = useState(2024);

    const [race, setRace] = useState(
        "Monaco Grand Prix"
    );

    const [session, setSession] = useState("R");

    const [driver1, setDriver1] = useState("LEC");
    const [driver2, setDriver2] = useState("VER");


    /*
    =========================
    GRANDS PRIX
    =========================
    */

    const races = useRaces(season);


    useEffect(() => {

        if (
            races.length > 0 &&
            !races.includes(race)
        ) {
            setRace(races[0]);
        }

    }, [races, race]);


    /*
    =========================
    PILOTES
    =========================
    */

    const drivers = useDrivers(
        season,
        race,
        session
    );


    useEffect(() => {

        if (drivers.length === 0) {
            return;
        }

        const codes = drivers.map(
            driver => driver.code
        );


        const nextDriver1 =
            codes.includes(driver1)
                ? driver1
                : codes[0];


        if (driver1 !== nextDriver1) {
            setDriver1(nextDriver1);
        }


        if (
            !codes.includes(driver2) ||
            driver2 === nextDriver1
        ) {

            const secondDriver =
                codes.find(
                    code =>
                        code !== nextDriver1
                );

            if (secondDriver) {
                setDriver2(secondDriver);
            }
        }

    }, [
        drivers,
        driver1,
        driver2
    ]);


    /*
    =========================
    TELEMETRIE
    =========================
    */

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


    /*
    =========================
    DOMINATION
    =========================
    */

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


    /*
    =========================
    DONNEES GRAPHIQUES
    =========================
    */

    const distance1 =
        telemetry1.map(
            point => point.distance
        );

    const speed1 =
        telemetry1.map(
            point => point.vitesse
        );

    const throttle1 =
        telemetry1.map(
            point => point.accelerateur
        );

    const brake1 =
        telemetry1.map(
            point =>
                point.frein
                    ? 100
                    : 0
        );

    const drs1 =
        telemetry1.map(
            point => point.drs
        );


    const distance2 =
        telemetry2.map(
            point => point.distance
        );

    const speed2 =
        telemetry2.map(
            point => point.vitesse
        );

    const throttle2 =
        telemetry2.map(
            point => point.accelerateur
        );

    const brake2 =
        telemetry2.map(
            point =>
                point.frein
                    ? 100
                    : 0
        );

    const drs2 =
        telemetry2.map(
            point => point.drs
        );


    /*
    =========================
    ETATS
    =========================
    */

    const telemetryLoading =
        loading1 || loading2;

    const telemetryError =
        error1 || error2;

    const telemetryAvailable =
        !telemetryLoading &&
        !telemetryError &&
        telemetry1.length > 0 &&
        telemetry2.length > 0;


    /*
    =========================
    STATISTIQUES
    =========================
    */

    const maxSpeed1 =
        speed1.length > 0
            ? Math.max(...speed1)
            : 0;


    const maxSpeed2 =
        speed2.length > 0
            ? Math.max(...speed2)
            : 0;


    const maxDelta =
        dominance.length > 0
            ? Math.max(
                ...dominance.map(
                    point =>
                        Math.abs(
                            point.delta
                        )
                )
            )
            : 0;


    const dominanceDriver1 =
        dominance.filter(
            point =>
                point.delta >= 0
        ).length;


    const dominanceDriver2 =
        dominance.filter(
            point =>
                point.delta < 0
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


    /*
    =========================
    THEME PLOTLY
    =========================
    */

    const commonLayout = {

        autosize: true,

        paper_bgcolor: "transparent",

        plot_bgcolor: "#1a1a1a",

        font: {
            color: "#ffffff"
        },

        xaxis: {
            title: "Distance (m)",
            gridcolor: "#333333",
            zerolinecolor: "#444444"
        },

        legend: {
            orientation: "h",
            x: 0.5,
            xanchor: "center",
            font: {
                color: "#ffffff"
            }
        },

        margin: {
            l: 65,
            r: 30,
            t: 60,
            b: 60
        },

        hovermode: "x unified"
    };


    const commonConfig = {
        responsive: true,
        displayModeBar: false
    };


    /*
    =========================
    AFFICHAGE
    =========================
    */

    return (

        <div className="app">


            {/* HEADER */}

            <header className="header">

                <h1>
                    🏎️ F1 Analysis
                </h1>

                <p>
                    Analyse comparative
                    des télémétries Formula 1
                </p>

            </header>


            {/* FILTRES */}

            <div className="filters">


                {/* SAISON */}

                <div className="filter-group">

                    <label>
                        Saison
                    </label>

                    <select
                        value={season}
                        onChange={
                            e =>
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
                        onChange={
                            e =>
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
                        onChange={
                            e =>
                                setSession(
                                    e.target.value
                                )
                        }
                    >

                        <option value="R">
                            Course
                        </option>

                        <option value="Q">
                            Qualifications
                        </option>

                        <option value="FP1">
                            Essais libres 1
                        </option>

                        <option value="FP2">
                            Essais libres 2
                        </option>

                        <option value="FP3">
                            Essais libres 3
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
                        onChange={
                            e =>
                                setDriver1(
                                    e.target.value
                                )
                        }
                    >

                        {drivers.map(
                            driver => (

                                <option
                                    key={
                                        driver.code
                                    }
                                    value={
                                        driver.code
                                    }
                                    disabled={
                                        driver.code ===
                                        driver2
                                    }
                                >
                                    {driver.nom}
                                    {" "}
                                    ({driver.code})
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
                        onChange={
                            e =>
                                setDriver2(
                                    e.target.value
                                )
                        }
                    >

                        {drivers.map(
                            driver => (

                                <option
                                    key={
                                        driver.code
                                    }
                                    value={
                                        driver.code
                                    }
                                    disabled={
                                        driver.code ===
                                        driver1
                                    }
                                >
                                    {driver.nom}
                                    {" "}
                                    ({driver.code})
                                </option>

                            )
                        )}

                    </select>

                </div>

            </div>


            {/* INFORMATIONS */}

            <div className="info">

                <strong>
                    {season}
                </strong>

                {" — "}

                {race}

                {" — "}

                {session}

                {" — "}

                {driver1}

                {" vs "}

                {driver2}

            </div>


            {/* STATISTIQUES */}

            {telemetryAvailable && (

                <div className="stats-grid">


                    <div className="stat-card">

                        <span className="stat-title">
                            Vitesse max {driver1}
                        </span>

                        <strong className="stat-value">

                            {maxSpeed1.toFixed(1)}

                            <small>
                                {" "}km/h
                            </small>

                        </strong>

                    </div>


                    <div className="stat-card">

                        <span className="stat-title">
                            Vitesse max {driver2}
                        </span>

                        <strong className="stat-value">

                            {maxSpeed2.toFixed(1)}

                            <small>
                                {" "}km/h
                            </small>

                        </strong>

                    </div>


                    <div className="stat-card">

                        <span className="stat-title">
                            Écart maximal
                        </span>

                        <strong className="stat-value">

                            {maxDelta.toFixed(1)}

                            <small>
                                {" "}km/h
                            </small>

                        </strong>

                    </div>


                    <div className="stat-card">

                        <span className="stat-title">
                            Domination
                        </span>

                        <strong
                            className="
                                stat-value
                                stat-small
                            "
                        >

                            {driver1}
                            {" "}
                            {dominancePercent1}%

                            <br />

                            {driver2}
                            {" "}
                            {dominancePercent2}%

                        </strong>

                    </div>

                </div>

            )}


            {/* CHARGEMENT */}

            {telemetryLoading && (

                <div className="card status">

                    Chargement de la télémétrie...

                </div>

            )}


            {/* ERREUR */}

            {!telemetryLoading &&
                telemetryError && (

                    <div className="card status">

                        ⚠️ {telemetryError}

                    </div>

                )}


            {/* GRAPHIQUES */}

            {telemetryAvailable && (

                <>

                    {/* VITESSE */}

                    <div className="card">

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
                                ...commonLayout,

                                title:
                                    "Vitesse",

                                height: 420,

                                yaxis: {
                                    title:
                                        "Vitesse (km/h)",

                                    gridcolor:
                                        "#333333",

                                    zerolinecolor:
                                        "#444444"
                                }
                            }}
                            style={{
                                width: "100%"
                            }}
                            useResizeHandler={true}
                            config={commonConfig}
                        />

                    </div>


                    {/* ACCELERATEUR */}

                    <div className="card">

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
                                ...commonLayout,

                                title:
                                    "Accélérateur",

                                height: 350,

                                yaxis: {
                                    title: "%",

                                    range: [
                                        0,
                                        100
                                    ],

                                    gridcolor:
                                        "#333333",

                                    zerolinecolor:
                                        "#444444"
                                }
                            }}
                            style={{
                                width: "100%"
                            }}
                            useResizeHandler={true}
                            config={commonConfig}
                        />

                    </div>


                    {/* FREIN */}

                    <div className="card">

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
                                ...commonLayout,

                                title:
                                    "Frein",

                                height: 350,

                                yaxis: {
                                    title: "%",

                                    range: [
                                        0,
                                        100
                                    ],

                                    gridcolor:
                                        "#333333",

                                    zerolinecolor:
                                        "#444444"
                                }
                            }}
                            style={{
                                width: "100%"
                            }}
                            useResizeHandler={true}
                            config={commonConfig}
                        />

                    </div>


                    {/* DRS */}

                    <div className="card">

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
                                ...commonLayout,

                                title:
                                    "DRS",

                                height: 350,

                                yaxis: {
                                    title:
                                        "État DRS",

                                    gridcolor:
                                        "#333333",

                                    zerolinecolor:
                                        "#444444"
                                }
                            }}
                            style={{
                                width: "100%"
                            }}
                            useResizeHandler={true}
                            config={commonConfig}
                        />

                    </div>

                </>

            )}


            {/* DOMINATION */}

            <div className="card">

                {dominanceLoading && (

                    <div className="status">

                        Chargement de la
                        carte de domination...

                    </div>

                )}


                {!dominanceLoading &&
                    dominanceError && (

                        <div className="status">

                            ⚠️ {dominanceError}

                        </div>

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