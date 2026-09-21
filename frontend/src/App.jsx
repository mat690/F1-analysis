import { useState } from "react";

import Sidebar from "./components/Sidebar";

import TelemetryAnalysis
    from "./pages/TelemetryAnalysis";

import PracticeAnalysis
    from "./pages/PracticeAnalysis";

import QualifyingAnalysis
    from "./pages/QualifyingAnalysis";

import SprintQualifyingAnalysis
    from "./pages/SprintQualifyingAnalysis";

import SprintAnalysis
    from "./pages/SprintAnalysis";

import RaceAnalysis
    from "./pages/RaceAnalysis";

import TestingAnalysis
    from "./pages/TestingAnalysis";

import "./App.css";


function App() {

    const [activePage, setActivePage] =
        useState("telemetry");


    function renderPage() {

        switch (activePage) {

            case "practice":
                return <PracticeAnalysis />;

            case "qualifying":
                return <QualifyingAnalysis />;

            case "sprintQualifying":
                return (
                    <SprintQualifyingAnalysis />
                );

            case "sprint":
                return <SprintAnalysis />;

            case "race":
                return <RaceAnalysis />;

            case "testing":
                return <TestingAnalysis />;

            case "telemetry":
            default:
                return <TelemetryAnalysis />;
        }
    }


    return (

        <div className="app-layout">

            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <main className="main-content">

                {renderPage()}

            </main>

        </div>

    );
}


export default App;