import { useState } from "react";

import useRaces from "../hooks/useRaces";
import useDrivers from "../hooks/useDrivers";
import useQualifying from "../hooks/useQualifying";
import QualifyingStats
    from "../components/qualifying/QualifyingStats";

import QualifyingSectors
    from "../components/qualifying/QualifyingSectors";
    import QualifyingLapChart
    from "../components/qualifying/QualifyingLapChart";
import QualifyingSummary
    from "../components/qualifying/QualifyingSummary";
function formatTime(seconds) {
    if (seconds == null) {
        return "—";
    }

    const minutes = Math.floor(seconds / 60);
    const remaining = seconds - minutes * 60;

    return `${minutes}:${remaining
        .toFixed(3)
        .padStart(6, "0")}`;
}


function QualifyingAnalysis() {

    const [season, setSeason] =
        useState(2024);

    const [race, setRace] =
        useState("Monaco Grand Prix");

    const [driver1, setDriver1] =
        useState("LEC");

    const [driver2, setDriver2] =
        useState("VER");


    // COURSES

    const racesHook = useRaces(season);

    const races = Array.isArray(racesHook)
        ? racesHook
        : Array.isArray(racesHook?.races)
            ? racesHook.races
            : [];


    // PILOTES

    const driversHook = useDrivers(
        season,
        race,
        "Q"
    );

    const drivers = Array.isArray(driversHook)
        ? driversHook
        : Array.isArray(driversHook?.drivers)
            ? driversHook.drivers
            : [];


    // QUALIFICATIONS

    const {
        qualifying,
        loading,
        error
    } = useQualifying(
        season,
        race,
        driver1,
        driver2
    );


    const phases =
        qualifying?.phases ?? {};


    return (
        <section className="qualifying-analysis">

            {/* FILTRES */}

            <div className="card">

                <div className="section-header">

                    <div>
                        <span className="section-badge">
                            QUALIFICATIONS
                        </span>

                        <h2>
                            ⏱️ Analyse des qualifications
                        </h2>
                    </div>

                </div>


                <div className="filters">

                    <div className="filter-group">

                        <label>Saison</label>

                        <select
                            value={season}
                            onChange={
                                event =>
                                    setSeason(
                                        Number(
                                            event.target.value
                                        )
                                    )
                            }
                        >
                            <option value={2024}>
                                2024
                            </option>

                            <option value={2025}>
                                2025
                            </option>
                        </select>

                    </div>


                    <div className="filter-group">

                        <label>Grand Prix</label>

                        <select
                            value={race}
                            onChange={
                                event =>
                                    setRace(
                                        event.target.value
                                    )
                            }
                        >

                            {races.length > 0 ? (
                                races.map(
                                    raceName => (
                                        <option
                                            key={raceName}
                                            value={raceName}
                                        >
                                            {raceName}
                                        </option>
                                    )
                                )
                            ) : (
                                <option value={race}>
                                    {race}
                                </option>
                            )}

                        </select>

                    </div>


                    <div className="filter-group">

                        <label>Pilote 1</label>

                        <select
                            value={driver1}
                            onChange={
                                event =>
                                    setDriver1(
                                        event.target.value
                                    )
                            }
                        >

                            {drivers.length > 0 ? (
                                drivers.map(
                                    driver => (
                                        <option
                                            key={driver.code}
                                            value={driver.code}
                                        >
                                            {driver.code}
                                            {" — "}
                                            {driver.nom}
                                        </option>
                                    )
                                )
                            ) : (
                                <option value={driver1}>
                                    {driver1}
                                </option>
                            )}

                        </select>

                    </div>


                    <div className="filter-group">

                        <label>Pilote 2</label>

                        <select
                            value={driver2}
                            onChange={
                                event =>
                                    setDriver2(
                                        event.target.value
                                    )
                            }
                        >

                            {drivers.length > 0 ? (
                                drivers.map(
                                    driver => (
                                        <option
                                            key={driver.code}
                                            value={driver.code}
                                        >
                                            {driver.code}
                                            {" — "}
                                            {driver.nom}
                                        </option>
                                    )
                                )
                            ) : (
                                <option value={driver2}>
                                    {driver2}
                                </option>
                            )}

                        </select>

                    </div>

                </div>

            </div>


            {/* MEME PILOTE */}

            {driver1 === driver2 && (

                <div className="card status">
                    ⚠️ Sélectionne deux pilotes différents.
                </div>

            )}


            {/* CHARGEMENT */}

            {driver1 !== driver2 &&
             loading && (

                <div className="card status">
                    Chargement des qualifications...
                </div>

            )}


            {/* ERREUR */}

            {driver1 !== driver2 &&
             !loading &&
             error && (

                <div className="card status">
                    ⚠️ {error}
                </div>

            )}


            {/* DONNEES */}

            {driver1 !== driver2 &&
             !loading &&
             !error &&
             qualifying && (

                <>

                    <div className="card">

                        <div className="section-header">

                            <div>

                                <span className="section-badge">
                                    SESSION
                                </span>

                                <h2>
                                    {race}
                                </h2>

                                <p>
                                    {driver1}
                                    {" vs "}
                                    {driver2}
                                </p>

                            </div>

                            <span className="session-badge">
                                Q
                            </span>

                        </div>

                    </div>


                  {/* Q1 Q2 Q3 */}

<div className="sector-grid">

    {["Q1", "Q2", "Q3"].map(
        phase => {

            const time1 =
                phases?.[phase]?.[driver1];

            const time2 =
                phases?.[phase]?.[driver2];

            const valid =
                time1 != null &&
                time2 != null;

            const fastest =
                valid
                    ? time1 <= time2
                        ? driver1
                        : driver2
                    : null;

            const gap =
                valid
                    ? Math.abs(time1 - time2)
                    : null;

            return (
                <div
                    className="sector-card"
                    key={phase}
                >

                    <span className="sector-name">
                        {phase}
                    </span>

                    <div className="sector-driver">

                        <span>
                            {driver1}
                        </span>

                        <strong
                            className={
                                fastest === driver1
                                    ? "sector-best"
                                    : ""
                            }
                        >
                            {formatTime(time1)}
                        </strong>

                    </div>

                    <div className="sector-driver">

                        <span>
                            {driver2}
                        </span>

                        <strong
                            className={
                                fastest === driver2
                                    ? "sector-best"
                                    : ""
                            }
                        >
                            {formatTime(time2)}
                        </strong>

                    </div>

                    <div className="sector-result">

                        <span>
                            Plus rapide
                        </span>

                        <strong>
                            {fastest ?? "—"}
                        </strong>

                        <small>
                            Δ{" "}
                            {gap != null
                                ? gap.toFixed(3)
                                : "—"}{" "}
                            s
                        </small>

                    </div>

                </div>
            );
        }
    )}

</div>


{/* STATISTIQUES */}

<QualifyingStats
    driver1={driver1}
    driver2={driver2}
    data1={qualifying.pilotes[driver1]}
    data2={qualifying.pilotes[driver2]}
    gap={qualifying.ecartMeilleurTour}
/>


{/* SECTEURS */}

<QualifyingSectors
    driver1={driver1}
    driver2={driver2}
    data1={qualifying.pilotes[driver1]}
    data2={qualifying.pilotes[driver2]}
/>
 <QualifyingLapChart
    driver1={driver1}
    driver2={driver2}
    data1={qualifying.pilotes[driver1]}
    data2={qualifying.pilotes[driver2]}
/>       
                    
<QualifyingSummary
    qualifying={qualifying}
    driver1={driver1}
    driver2={driver2}
/>
                </>

            )}

        </section>
    );
}


export default QualifyingAnalysis;