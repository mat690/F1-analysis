import { useState } from "react";

import useRaces from "../hooks/useRaces";
import useDrivers from "../hooks/useDrivers";
import useRaceAnalysis from "../hooks/useRaceAnalysis";
import RacePaceChart
    from "../components/race/RacePaceChart";
    import RaceStints
    from "../components/race/RaceStints";
import RacePositionChart
    from "../components/race/RacePositionChart";
    import RaceSummary
    from "../components/race/RaceSummary";
function RaceAnalysis() {

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
        "R"
    );

    const drivers = Array.isArray(driversHook)
        ? driversHook
        : Array.isArray(driversHook?.drivers)
            ? driversHook.drivers
            : [];


    // ANALYSE COURSE

    const {
        raceAnalysis,
        loading,
        error
    } = useRaceAnalysis(
        season,
        race,
        driver1,
        driver2
    );


    const data1 =
        raceAnalysis?.pilotes?.[driver1];

    const data2 =
        raceAnalysis?.pilotes?.[driver2];


    return (

        <section className="race-analysis">

            {/* FILTRES */}

            <div className="card">

                <div className="section-header">

                    <div>

                        <span className="section-badge">
                            COURSE
                        </span>

                        <h2>
                            🏆 Analyse de course
                        </h2>

                    </div>

                </div>


                <div className="filters">

                    {/* SAISON */}

                    <div className="filter-group">

                        <label>
                            Saison
                        </label>

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


                    {/* GRAND PRIX */}

                    <div className="filter-group">

                        <label>
                            Grand Prix
                        </label>

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


                    {/* PILOTE 1 */}

                    <div className="filter-group">

                        <label>
                            Pilote 1
                        </label>

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


                    {/* PILOTE 2 */}

                    <div className="filter-group">

                        <label>
                            Pilote 2
                        </label>

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
                    Chargement de la course...
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
             raceAnalysis &&
             data1 &&
             data2 && (

                <>

                    {/* SESSION */}

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
                                R
                            </span>

                        </div>

                    </div>


                    {/* RESULTATS */}

                    <div className="stats-grid">

                        <div className="stat-card">

                            <span className="stat-title">
                                {driver1}
                            </span>

                            <strong className="stat-value">
                                P{data1.positionArrivee ?? "—"}
                            </strong>

                            <small>
                                Arrivée
                            </small>

                        </div>


                        <div className="stat-card">

                            <span className="stat-title">
                                {driver2}
                            </span>

                            <strong className="stat-value">
                                P{data2.positionArrivee ?? "—"}
                            </strong>

                            <small>
                                Arrivée
                            </small>

                        </div>


                        <div className="stat-card">

                            <span className="stat-title">
                                Grille
                            </span>

                            <strong className="stat-value">
                                P{data1.positionDepart ?? "—"}
                                {" / "}
                                P{data2.positionDepart ?? "—"}
                            </strong>

                            <small>
                                {driver1} / {driver2}
                            </small>

                        </div>


                        <div className="stat-card">

                            <span className="stat-title">
                                Points
                            </span>

                            <strong className="stat-value">
                                {data1.points ?? "—"}
                                {" / "}
                                {data2.points ?? "—"}
                            </strong>

                            <small>
                                {driver1} / {driver2}
                            </small>

                        </div>

                    </div>
<RacePaceChart
    driver1={driver1}
    driver2={driver2}
    data1={data1}
    data2={data2}
/>
 <RaceStints
    driver1={driver1}
    driver2={driver2}
    data1={data1}
    data2={data2}
/>   
<RacePositionChart
    driver1={driver1}
    driver2={driver2}
    data1={data1}
    data2={data2}
/>
<RaceSummary
    driver1={driver1}
    driver2={driver2}
    data1={data1}
    data2={data2}
/>
            </>

            )}

        </section>
    );
}


export default RaceAnalysis;