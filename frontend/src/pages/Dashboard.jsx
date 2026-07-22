import ComparisonPanel from "../components/ComparisonPanel";
import ComparisonChart from "../components/ComparisonChart";
import TrackMap from "../components/TrackMap";
import DominanceMap from "../components/DominanceMap";
import TelemetryChart from "../components/TelemetryChart";
import TelemetryMap from "../components/TelemetryMap";
import LongRunAnalysis from "../components/LongRunAnalysis";
import FormulaInsight from "../components/FormulaInsight";



function Dashboard(props){


return (

<div>


<ComparisonPanel

stats1={props.stats1}
stats2={props.stats2}
driver1={props.driver1}
driver2={props.driver2}

/>



<ComparisonChart

laps1={props.laps1}
laps2={props.laps2}
driver1={props.driver1}
driver2={props.driver2}

/>



<FormulaInsight

data={props.formulaInsight}

/>



<TrackMap

data={props.track}

/>



<DominanceMap

data={props.dominance}

driver1={props.driver1}

driver2={props.driver2}

/>



<TelemetryChart

data={props.telemetry}

driver={props.driver1}

/>



<TelemetryMap

data={props.telemetry}

index={props.telemetryIndex}

/>



{
props.session !== "Q" &&

<LongRunAnalysis

data={props.longRun}

/>

}



</div>

);


}


export default Dashboard;