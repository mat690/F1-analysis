import { useState } from "react";

import useRaces from "../hooks/useRaces";
import useDrivers from "../hooks/useDrivers";
import usePractice from "../hooks/usePractice";

import PracticeStats
    from "../components/practice/PracticeStats";

import PracticeSectors
    from "../components/practice/PracticeSectors";

import PracticeTyres
    from "../components/practice/PracticeTyres";

import PracticeLapChart
    from "../components/practice/PracticeLapChart";

import PracticeLongRuns
    from "../components/practice/PracticeLongRuns";

import PracticeSummary
    from "../components/practice/PracticeSummary";
import PracticeRepresentativeLaps
    from "../components/practice/PracticeRepresentativeLaps";

function PracticeAnalysis() {

    const [season, setSeason] =
        useState(2024);

    const [race, setRace] =
        useState("Monaco Grand Prix");

    const [session, setSession] =
        useState("FP2");

    const [driver1, setDriver1] =
        useState("LEC");

    const [driver2, setDriver2] =
        useState("VER");


    // ========================================
    // COURSES
    // ========================================

    const racesHook =
        useRaces(season);

    const races =
        Array.isArray(racesHook?.races)
            ? racesHook.races
            : [];


    // ========================================
    // PILOTES
    // ========================================

    const driversHook =
        useDrivers(
            season,
            race,
            session
        );

    const drivers =
        Array.isArray(driversHook?.drivers)
            ? driversHook.drivers
            : [];


    // ========================================
    // ANALYSE
    // ========================================

    const {
        practice,
        loading,
        error
    } = usePractice(
        season,
        race,
        session,
        driver1,
        driver2
    );


    const data1 =
        practice?.pilotes?.[driver1];

    const data2 =
        practice?.pilotes?.[driver2];


    return (
        <section className="practice-analysis">

            {/* FILTRES */}

            <div className="card">

                <div className="section-header">

                    <div>

                        <span className="section-badge">
                            ESSAIS LIBRES
                        </span>

                        <h2>
                            🧪 Analyse des essais libres
                        </h2>

                    </div>

                </div>


                <div className="filters">

                    <div className="filter-group">

                        <label>Saison</label>

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
                                e =>
                                    setRace(
                                        e.target.value
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

                        <label>Session</label>

                        <select
                            value={session}
                            onChange={
                                e =>
                                    setSession(
                                        e.target.value
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
                        </select>

                    </div>


                    <div className="filter-group">

                        <label>Pilote 1</label>

                        <select
                            value={driver1}
                            onChange={
                                e =>
                                    setDriver1(
                                        e.target.value
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
                                e =>
                                    setDriver2(
                                        e.target.value
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

                    ⚠️ Sélectionne deux pilotes
                    différents.

                </div>

            )}


            {/* CHARGEMENT */}

            {driver1 !== driver2 &&
             loading && (

                <div className="card status">

                    Chargement de l'analyse
                    FastF1...

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
             data1 &&
             data2 && (

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
                                {session}
                            </span>

                        </div>

                    </div>


                    <PracticeStats
                        driver1={driver1}
                        driver2={driver2}
                        data1={data1}
                        data2={data2}
                    />


                    <PracticeSectors
                        driver1={driver1}
                        driver2={driver2}
                        data1={data1}
                        data2={data2}
                    />


                    <PracticeTyres
                        driver1={driver1}
                        driver2={driver2}
                        data1={data1}
                        data2={data2}
                    />


                    <PracticeLapChart
                        driver1={driver1}
                        driver2={driver2}
                        data1={data1}
                        data2={data2}
                    />
<PracticeRepresentativeLaps
    driver1={driver1}
    driver2={driver2}
    data1={data1}
    data2={data2}
/>

                    <PracticeLongRuns
                        driver1={driver1}
                        driver2={driver2}
                        data1={data1}
                        data2={data2}
                    />


                    <PracticeSummary
                        driver1={driver1}
                        driver2={driver2}
                        data1={data1}
                        data2={data2}
                    />

                </>

            )}


            {/* AUCUNE DONNEE */}

            {driver1 !== driver2 &&
             !loading &&
             !error &&
             practice &&
             (!data1 || !data2) && (

                <div className="card status">

                    Aucune donnée disponible
                    pour cette comparaison.

                </div>

            )}

        </section>
    );
}


export default PracticeAnalysis;