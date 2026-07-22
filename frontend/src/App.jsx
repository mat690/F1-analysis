import { useEffect, useState } from "react";

import api from "./services/api";

import Header from "./components/Header";
import ComparisonChart from "./components/ComparisonChart";
import ComparisonPanel from "./components/ComparisonPanel";
import TrackMap from "./components/TrackMap";
import DominanceMap from "./components/DominanceMap";
import TelemetryChart from "./components/TelemetryChart";
import TelemetryMap from "./components/TelemetryMap";
import LongRunAnalysis from "./components/LongRunAnalysis";


import useStats from "./hooks/useStats";
import useTelemetry from "./hooks/useTelemetry";
import useLongRun from "./hooks/useLongRun";

import useTrack from "./hooks/useTrack";
import useDominance from "./hooks/useDominance";
import useFormulaInsight from "./hooks/useFormulaInsight";
import FormulaInsight from "./components/FormulaInsight";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SessionSelector from "./components/SessionSelector";
import TelemetryPage from "./pages/Telemetry";
import FormulaInsightPages from "./pages/FormulaInsightPages";
import RaceAnalysis from "./pages/RaceAnalysis";
function App(){


    // =========================
    // Sélections utilisateur
    // =========================

    const [seasons,setSeasons] = useState([]);

    const [races,setRaces] = useState([]);

const [telemetryIndex,setTelemetryIndex] = useState(0);
    const [selectedSeason,setSelectedSeason] = useState(2024);

    const [selectedRace,setSelectedRace] = useState("Monaco");
const [page,setPage] = useState("dashboard");

    const [session,setSession] = useState("Q");


    const [driver1,setDriver1] = useState("LEC");

    const [driver2,setDriver2] = useState("VER");




    // =========================
    // Données circuit
    // =========================



  const track = useTrack(

    selectedSeason,
    selectedRace,
    session,
    driver1

);



const dominance = useDominance(

    selectedSeason,
    selectedRace,
    session,
    driver1,
    driver2

);


    // =========================
    // Hooks données
    // =========================


    const {

        stats1,
        stats2,
        laps1,
        laps2

    } = useStats(
        selectedSeason,
        selectedRace,
        session,
        driver1,
        driver2
    );



    const {

        telemetry,
        index,
        setIndex

    } = useTelemetry(
        selectedSeason,
        selectedRace,
        session,
        driver1
    );



    const longRun = useLongRun(

        selectedSeason,
        selectedRace,
        session,
        driver1

    );


const formulaInsight = useFormulaInsight(

    selectedSeason,
    selectedRace,
    session,
    driver1,
    driver2

);

    // =========================
    // Listes
    // =========================


    const sessions = [

        {
            code:"FP1",
            name:"Essais Libres 1"
        },

        {
            code:"FP2",
            name:"Essais Libres 2"
        },

        {
            code:"FP3",
            name:"Essais Libres 3"
        },

        {
            code:"Q",
            name:"Qualifications"
        },

        {
            code:"R",
            name:"Course"
        }

    ];



    const drivers = [

        {
            code:"LEC",
            name:"Charles Leclerc"
        },

        {
            code:"VER",
            name:"Max Verstappen"
        },

        {
            code:"NOR",
            name:"Lando Norris"
        },

        {
            code:"PIA",
            name:"Oscar Piastri"
        },

        {
            code:"HAM",
            name:"Lewis Hamilton"
        },

        {
            code:"RUS",
            name:"George Russell"
        }

    ];





    // =========================
    // Chargement saisons
    // =========================


    useEffect(()=>{


        api
        .get("/seasons")

        .then(res=>{

            setSeasons(res.data);

        });


    },[]);






    // =========================
    // Chargement GP
    // =========================


    useEffect(()=>{


        api
        .get(`/races/${selectedSeason}`)

        .then(res=>{


            setRaces(res.data);



            if(res.data.includes("Monaco")){

                setSelectedRace("Monaco");

            }
            else{

                setSelectedRace(res.data[0]);

            }


        });


    },[
        selectedSeason
    ]);







    // =========================
    // Circuit
    // =========================





    // =========================
    // Carte domination
    // =========================








return (

<div>

<Navbar

page={page}

setPage={setPage}

/>
<SessionSelector

seasons={seasons}

races={races}

sessions={sessions}

drivers={drivers}


selectedSeason={selectedSeason}
setSelectedSeason={setSelectedSeason}


selectedRace={selectedRace}
setSelectedRace={setSelectedRace}


session={session}
setSession={setSession}


driver1={driver1}
setDriver1={setDriver1}


driver2={driver2}
setDriver2={setDriver2}

/>

{
page==="dashboard" &&

<Dashboard

stats1={stats1}
stats2={stats2}
laps1={laps1}
laps2={laps2}
driver1={driver1}
driver2={driver2}
track={track}
dominance={dominance}
telemetry={telemetry}
telemetryIndex={telemetryIndex}
longRun={longRun}
formulaInsight={formulaInsight}
session={session}

/>

}



{
page==="telemetry" &&

<Telemetry />

}



{
page==="insight" &&

<FormulaInsightPages />

}


{
page==="race" &&

<RaceAnalysis />

}
{
page==="telemetry" &&

<TelemetryPage

telemetry={telemetry}

telemetryIndex={telemetryIndex}

setTelemetryIndex={setTelemetryIndex}

driver={driver1}

/>

}
</div>

);

}

export default App;