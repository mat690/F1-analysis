import {
    useEffect,
    useState
} from "react";

import Plot from "react-plotly.js";

import useTelemetry
    from "../hooks/useTelemetry";

import useDominance
    from "../hooks/useDominance";

import useRaces
    from "../hooks/useRaces";

import useDrivers
    from "../hooks/useDrivers";

import DominanceMap
    from "../components/DominanceMap";


function TelemetryAnalysis() {

    /*
    =========================
    FILTRES
    =========================
    */

    const [season, setSeason] =
        useState(2024);

    const [race, setRace] =
        useState(
            "Monaco Grand Prix"
        );

    const [session, setSession] =
        useState("R");

    const [driver1, setDriver1] =
        useState("LEC");

    const [driver2, setDriver2] =
        useState("VER");


    /*
    =========================
    GRANDS PRIX
    =========================
    */

    const races =
        useRaces(season) || [];


    useEffect(() => {

        if (
            races.length > 0 &&
            !races.includes(race)
        ) {
            setRace(races[0]);
        }

    }, [
        races,
        race
    ]);


    /*
    =========================
    PILOTES
    =========================
    */

    const drivers =
        useDrivers(
            season,
            race,
            session
        ) || [];


    useEffect(() => {

        if (
            drivers.length === 0
        ) {
            return;
        }


        const codes =
            drivers.map(
                driver =>
                    driver.code
            );


        const nextDriver1 =
            codes.includes(driver1)
                ? driver1
                : codes[0];


        if (
            driver1 !==
            nextDriver1
        ) {
            setDriver1(
                nextDriver1
            );
        }


        if (
            !codes.includes(driver2) ||
            driver2 === nextDriver1
        ) {

            const secondDriver =
                codes.find(
                    code =>
                        code !==
                        nextDriver1
                );

            if (secondDriver) {
                setDriver2(
                    secondDriver
                );
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
        telemetry:
            telemetry1 = [],

        loading:
            loading1 = false,

        error:
            error1 = null

    } = useTelemetry(
        season,
        race,
        session,
        driver1
    );


    const {
        telemetry:
            telemetry2 = [],

        loading:
            loading2 = false,

        error:
            error2 = null

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
        dominance = [],

        loading:
            dominanceLoading =
                false,

        error:
            dominanceError =
                null

    } = useDominance(
        season,
        race,
        session,
        driver1,
        driver2
    );


    /*
    =========================
    DONNEES PILOTE 1
    =========================
    */

    const distance1 =
        telemetry1.map(
            point =>
                point.distance
        );

    const speed1 =
        telemetry1.map(
            point =>
                point.vitesse
        );

    const throttle1 =
        telemetry1.map(
            point =>
                point.accelerateur
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
            point =>
                point.drs
        );


    /*
    =========================
    DONNEES PILOTE 2
    =========================
    */

    const distance2 =
        telemetry2.map(
            point =>
                point.distance
        );

    const speed2 =
        telemetry2.map(
            point =>
                point.vitesse
        );

    const throttle2 =
        telemetry2.map(
            point =>
                point.accelerateur
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
            point =>
                point.drs
        );


    /*
    =========================
    DELTA
    =========================
    */

    const deltaDistance =
        dominance.map(
            point =>
                point.distance
        );

    const deltaSpeed =
        dominance.map(
            point =>
                point.delta
        );


    /*
    =========================
    STATISTIQUES
    =========================
    */

    const maxSpeed1 =
        speed1.length > 0
            ? Math.max(
                ...speed1
            )
            : 0;


    const maxSpeed2 =
        speed2.length > 0
            ? Math.max(
                ...speed2
            )
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


    /*
    =========================
    DOMINATION
    =========================
    */

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
            : "0.0";


    const dominancePercent2 =
        totalDominancePoints > 0
            ? (
                dominanceDriver2 /
                totalDominancePoints *
                100
            ).toFixed(1)
            : "0.0";


    /*
    =========================
    RESUME
    =========================
    */

    const fastestDriver =
        maxSpeed1 >= maxSpeed2
            ? driver1
            : driver2;


    const fastestSpeed =
        Math.max(
            maxSpeed1,
            maxSpeed2
        );


    const dominantDriver =
        Number(
            dominancePercent1
        ) >=
        Number(
            dominancePercent2
        )
            ? driver1
            : driver2;


    const dominantPercent =
        Math.max(
            Number(
                dominancePercent1
            ),
            Number(
                dominancePercent2
            )
        );


    /*
    =========================
    ETATS
    =========================
    */

    const telemetryLoading =
        loading1 ||
        loading2;


    const telemetryError =
        error1 ||
        error2;


    const telemetryAvailable =
        !telemetryLoading &&
        !telemetryError &&
        telemetry1.length > 0 &&
        telemetry2.length > 0;


    /*
    =========================
    THEME PLOTLY
    =========================
    */

    const commonLayout = {

        autosize: true,

        height: 420,

        paper_bgcolor:
            "transparent",

        plot_bgcolor:
            "#1a1a1a",

        font: {
            color: "#ffffff"
        },

        xaxis: {

            title:
                "Distance (m)",

            gridcolor:
                "#333333",

            zerolinecolor:
                "#444444",

            automargin: true
        },

        legend: {

            orientation:
                "h",

            x: 0.5,

            xanchor:
                "center",

            y: -0.15
        },

        margin: {

            l: 75,

            r: 30,

            t: 65,

            b: 80
        },

        hovermode:
            "x unified"
    };


    const commonConfig = {

        responsive: true,

        displayModeBar:
            false
    };


    const plotStyle = {

        width: "100%",

        height: "420px"
    };


    /*
    =========================
    AFFICHAGE
    =========================
    */

    return (

        <section
            className="
                telemetry-analysis
            "
        >

            {/* =====================
                HEADER
            ===================== */}

            <div className="header">

                <h1>
                    📈 Analyse télémétrique
                </h1>

                <p>
                    Comparaison des
                    performances de deux
                    pilotes
                </p>

            </div>


            {/* =====================
                FILTRES
            ===================== */}

            <div className="filters">


                {/* SAISON */}

                <div
                    className="
                        filter-group
                    "
                >

                    <label>
                        Saison
                    </label>

                    <select
                        value={season}

                        onChange={
                            event =>
                                setSeason(
                                    Number(
                                        event
                                            .target
                                            .value
                                    )
                                )
                        }
                    >

                        <option
                            value={2024}
                        >
                            2024
                        </option>

                        <option
                            value={2023}
                        >
                            2023
                        </option>

                        <option
                            value={2022}
                        >
                            2022
                        </option>

                    </select>

                </div>


                {/* GRAND PRIX */}

                <div
                    className="
                        filter-group
                    "
                >

                    <label>
                        Grand Prix
                    </label>

                    <select
                        value={race}

                        onChange={
                            event =>
                                setRace(
                                    event
                                        .target
                                        .value
                                )
                        }
                    >

                        {races.map(
                            raceName => (

                                <option
                                    key={
                                        raceName
                                    }

                                    value={
                                        raceName
                                    }
                                >
                                    {
                                        raceName
                                    }
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* SESSION */}

                <div
                    className="
                        filter-group
                    "
                >

                    <label>
                        Session
                    </label>

                    <select
                        value={session}

                        onChange={
                            event =>
                                setSession(
                                    event
                                        .target
                                        .value
                                )
                        }
                    >

                        <option value="FP1">
                            FP1
                        </option>

                        <option value="FP2">
                            FP2
                        </option>

                        <option value="FP3">
                            FP3
                        </option>

                        <option value="Q">
                            Qualifications
                        </option>

                        <option value="S">
                            Sprint
                        </option>

                        <option value="R">
                            Course
                        </option>

                    </select>

                </div>


                {/* PILOTE 1 */}

                <div
                    className="
                        filter-group
                    "
                >

                    <label>
                        Pilote 1
                    </label>

                    <select
                        value={driver1}

                        onChange={
                            event =>
                                setDriver1(
                                    event
                                        .target
                                        .value
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
                                >
                                    {
                                        driver.code
                                    }

                                    {" — "}

                                    {
                                        driver.nom
                                    }

                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* PILOTE 2 */}

                <div
                    className="
                        filter-group
                    "
                >

                    <label>
                        Pilote 2
                    </label>

                    <select
                        value={driver2}

                        onChange={
                            event =>
                                setDriver2(
                                    event
                                        .target
                                        .value
                                )
                        }
                    >

                        {drivers
                            .filter(
                                driver =>
                                    driver.code !==
                                    driver1
                            )
                            .map(
                                driver => (

                                    <option
                                        key={
                                            driver.code
                                        }

                                        value={
                                            driver.code
                                        }
                                    >

                                        {
                                            driver.code
                                        }

                                        {" — "}

                                        {
                                            driver.nom
                                        }

                                    </option>

                                )
                            )}

                    </select>

                </div>

            </div>


            {/* =====================
                CHARGEMENT
            ===================== */}

            {telemetryLoading && (

                <div
                    className="
                        card
                        status
                    "
                >
                    Chargement de la
                    télémétrie...
                </div>

            )}


            {/* =====================
                ERREUR
            ===================== */}

            {telemetryError && (

                <div
                    className="
                        card
                        status
                    "
                >
                    ⚠️ {telemetryError}
                </div>

            )}


            {/* =====================
                DASHBOARD
            ===================== */}

            {telemetryAvailable && (

                <>

                    {/* =================
                        STATISTIQUES
                    ================= */}

                    <div
                        className="
                            stats-grid
                        "
                    >

                        <div
                            className="
                                stat-card
                            "
                        >

                            <span
                                className="
                                    stat-title
                                "
                            >
                                Vitesse max
                                {" "}
                                {driver1}
                            </span>

                            <strong
                                className="
                                    stat-value
                                "
                            >

                                {
                                    maxSpeed1
                                        .toFixed(
                                            1
                                        )
                                }

                                <small>
                                    {" "}km/h
                                </small>

                            </strong>

                        </div>


                        <div
                            className="
                                stat-card
                            "
                        >

                            <span
                                className="
                                    stat-title
                                "
                            >
                                Vitesse max
                                {" "}
                                {driver2}
                            </span>

                            <strong
                                className="
                                    stat-value
                                "
                            >

                                {
                                    maxSpeed2
                                        .toFixed(
                                            1
                                        )
                                }

                                <small>
                                    {" "}km/h
                                </small>

                            </strong>

                        </div>


                        <div
                            className="
                                stat-card
                            "
                        >

                            <span
                                className="
                                    stat-title
                                "
                            >
                                Delta maximal
                            </span>

                            <strong
                                className="
                                    stat-value
                                "
                            >

                                {
                                    maxDelta
                                        .toFixed(
                                            1
                                        )
                                }

                                <small>
                                    {" "}km/h
                                </small>

                            </strong>

                        </div>


                        <div
                            className="
                                stat-card
                            "
                        >

                            <span
                                className="
                                    stat-title
                                "
                            >
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
                                {
                                    dominancePercent1
                                }
                                {" %"}


                                <br />


                                {driver2}
                                {" "}
                                {
                                    dominancePercent2
                                }
                                {" %"}

                            </strong>

                        </div>

                    </div>


                    {/* =================
                        VITESSE
                    ================= */}

                    <div className="card">

                        <Plot

                            data={[
                                {
                                    x:
                                        distance1,

                                    y:
                                        speed1,

                                    type:
                                        "scatter",

                                    mode:
                                        "lines",

                                    name:
                                        driver1,

                                    hovertemplate:
                                        `${driver1}<br>` +
                                        "Distance : %{x:.0f} m<br>" +
                                        "Vitesse : %{y:.1f} km/h" +
                                        "<extra></extra>"
                                },

                                {
                                    x:
                                        distance2,

                                    y:
                                        speed2,

                                    type:
                                        "scatter",

                                    mode:
                                        "lines",

                                    name:
                                        driver2,

                                    hovertemplate:
                                        `${driver2}<br>` +
                                        "Distance : %{x:.0f} m<br>" +
                                        "Vitesse : %{y:.1f} km/h" +
                                        "<extra></extra>"
                                }
                            ]}

                            layout={{
                                ...commonLayout,

                                title:
                                    `Vitesse — ${driver1} vs ${driver2}`,

                                yaxis: {

                                    title:
                                        "Vitesse (km/h)",

                                    gridcolor:
                                        "#333333",

                                    automargin:
                                        true
                                }
                            }}

                            style={
                                plotStyle
                            }

                            useResizeHandler={
                                true
                            }

                            config={
                                commonConfig
                            }
                        />

                    </div>


                    {/* =================
                        DELTA
                    ================= */}

                    {dominance.length > 0 && (

                        <div className="card">

                            <Plot

                                data={[
                                    {
                                        x:
                                            deltaDistance,

                                        y:
                                            deltaSpeed,

                                        type:
                                            "scatter",

                                        mode:
                                            "lines",

                                        fill:
                                            "tozeroy",

                                        name:
                                            `Delta ${driver1} - ${driver2}`,

                                        hovertemplate:
                                            "Distance : %{x:.0f} m<br>" +
                                            "Delta : %{y:+.1f} km/h" +
                                            "<extra></extra>"
                                    }
                                ]}

                                layout={{
                                    ...commonLayout,

                                    title:
                                        `Delta de vitesse — ${driver1} vs ${driver2}`,

                                    yaxis: {

                                        title:
                                            `Δ vitesse ${driver1} - ${driver2} (km/h)`,

                                        gridcolor:
                                            "#333333",

                                        zeroline:
                                            true,

                                        zerolinecolor:
                                            "#ffffff",

                                        zerolinewidth:
                                            2,

                                        automargin:
                                            true
                                    },

                                    annotations: [
                                        {
                                            x: 1,
                                            y: 1,

                                            xref:
                                                "paper",

                                            yref:
                                                "paper",

                                            text:
                                                `+ = avantage ${driver1}`,

                                            showarrow:
                                                false,

                                            font: {
                                                color:
                                                    "#aaaaaa",

                                                size:
                                                    12
                                            }
                                        }
                                    ]
                                }}

                                style={
                                    plotStyle
                                }

                                useResizeHandler={
                                    true
                                }

                                config={
                                    commonConfig
                                }
                            />

                        </div>

                    )}


                    {/* =================
                        ACCELERATEUR
                    ================= */}

                    <div className="card">

                        <Plot

                            data={[
                                {
                                    x:
                                        distance1,

                                    y:
                                        throttle1,

                                    type:
                                        "scatter",

                                    mode:
                                        "lines",

                                    name:
                                        driver1,

                                    hovertemplate:
                                        `${driver1}<br>` +
                                        "Distance : %{x:.0f} m<br>" +
                                        "Accélérateur : %{y:.0f} %" +
                                        "<extra></extra>"
                                },

                                {
                                    x:
                                        distance2,

                                    y:
                                        throttle2,

                                    type:
                                        "scatter",

                                    mode:
                                        "lines",

                                    name:
                                        driver2,

                                    hovertemplate:
                                        `${driver2}<br>` +
                                        "Distance : %{x:.0f} m<br>" +
                                        "Accélérateur : %{y:.0f} %" +
                                        "<extra></extra>"
                                }
                            ]}

                            layout={{
                                ...commonLayout,

                                title:
                                    "Accélérateur",

                                yaxis: {

                                    title:
                                        "Accélérateur (%)",

                                    range:
                                        [
                                            0,
                                            100
                                        ],

                                    gridcolor:
                                        "#333333",

                                    automargin:
                                        true
                                }
                            }}

                            style={
                                plotStyle
                            }

                            useResizeHandler={
                                true
                            }

                            config={
                                commonConfig
                            }
                        />

                    </div>


                    {/* =================
                        FREIN
                    ================= */}

                    <div className="card">

                        <Plot

                            data={[
                                {
                                    x:
                                        distance1,

                                    y:
                                        brake1,

                                    type:
                                        "scatter",

                                    mode:
                                        "lines",

                                    name:
                                        driver1,

                                    hovertemplate:
                                        `${driver1}<br>` +
                                        "Distance : %{x:.0f} m<br>" +
                                        "Frein : %{y:.0f} %" +
                                        "<extra></extra>"
                                },

                                {
                                    x:
                                        distance2,

                                    y:
                                        brake2,

                                    type:
                                        "scatter",

                                    mode:
                                        "lines",

                                    name:
                                        driver2,

                                    hovertemplate:
                                        `${driver2}<br>` +
                                        "Distance : %{x:.0f} m<br>" +
                                        "Frein : %{y:.0f} %" +
                                        "<extra></extra>"
                                }
                            ]}

                            layout={{
                                ...commonLayout,

                                title:
                                    "Frein",

                                yaxis: {

                                    title:
                                        "Frein",

                                    range:
                                        [
                                            0,
                                            100
                                        ],

                                    tickvals:
                                        [
                                            0,
                                            100
                                        ],

                                    ticktext:
                                        [
                                            "OFF",
                                            "ON"
                                        ],

                                    gridcolor:
                                        "#333333",

                                    automargin:
                                        true
                                }
                            }}

                            style={
                                plotStyle
                            }

                            useResizeHandler={
                                true
                            }

                            config={
                                commonConfig
                            }
                        />

                    </div>


                    {/* =================
                        DRS
                    ================= */}

                    <div className="card">

                        <Plot

                            data={[
                                {
                                    x:
                                        distance1,

                                    y:
                                        drs1,

                                    type:
                                        "scatter",

                                    mode:
                                        "lines",

                                    name:
                                        driver1,

                                    hovertemplate:
                                        `${driver1}<br>` +
                                        "Distance : %{x:.0f} m<br>" +
                                        "DRS : %{y}" +
                                        "<extra></extra>"
                                },

                                {
                                    x:
                                        distance2,

                                    y:
                                        drs2,

                                    type:
                                        "scatter",

                                    mode:
                                        "lines",

                                    name:
                                        driver2,

                                    hovertemplate:
                                        `${driver2}<br>` +
                                        "Distance : %{x:.0f} m<br>" +
                                        "DRS : %{y}" +
                                        "<extra></extra>"
                                }
                            ]}

                            layout={{
                                ...commonLayout,

                                title:
                                    "DRS",

                                yaxis: {

                                    title:
                                        "État DRS",

                                    gridcolor:
                                        "#333333",

                                    automargin:
                                        true
                                }
                            }}

                            style={
                                plotStyle
                            }

                            useResizeHandler={
                                true
                            }

                            config={
                                commonConfig
                            }
                        />

                    </div>


                    {/* =================
                        DOMINATION
                    ================= */}

                    {!dominanceLoading &&
                     !dominanceError &&
                     dominance.length > 0 && (

                        <div className="card">

                            <DominanceMap
                                data={
                                    dominance
                                }

                                driver1={
                                    driver1
                                }

                                driver2={
                                    driver2
                                }
                            />

                        </div>

                    )}


                    {/* =================
                        ERREUR DOMINATION
                    ================= */}

                    {dominanceError && (

                        <div
                            className="
                                card
                                status
                            "
                        >
                            ⚠️ {
                                dominanceError
                            }
                        </div>

                    )}


                    {/* =================
                        RESUME
                    ================= */}

                    {dominance.length > 0 && (

                        <div
                            className="
                                card
                                analysis-summary
                            "
                        >

                            <h2>
                                📊 Résumé de
                                l'analyse
                            </h2>


                            <p>

                                <strong>
                                    {
                                        fastestDriver
                                    }
                                </strong>

                                {" "}possède la
                                vitesse maximale
                                la plus élevée avec{" "}

                                <strong>
                                    {
                                        fastestSpeed
                                            .toFixed(
                                                1
                                            )
                                    }
                                    {" "}km/h
                                </strong>.

                            </p>


                            <p>

                                <strong>
                                    {
                                        dominantDriver
                                    }
                                </strong>

                                {" "}est plus rapide
                                sur{" "}

                                <strong>
                                    {
                                        dominantPercent
                                            .toFixed(
                                                1
                                            )
                                    }
                                    {" "}%
                                </strong>

                                {" "}des points
                                télémétriques
                                analysés.

                            </p>


                            <p>

                                L'écart de vitesse
                                maximal observé est
                                de{" "}

                                <strong>
                                    {
                                        maxDelta
                                            .toFixed(
                                                1
                                            )
                                    }
                                    {" "}km/h
                                </strong>.

                            </p>

                        </div>

                    )}

                </>

            )}

        </section>
    );
}


export default TelemetryAnalysis;