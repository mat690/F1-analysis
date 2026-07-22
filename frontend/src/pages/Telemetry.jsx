import TelemetryChart from "../components/TelemetryChart";
import TelemetryMap from "../components/TelemetryMap";


function TelemetryPage({

telemetry,
telemetryIndex,
setTelemetryIndex,
driver

}){


return (

<div>


<h1>
📡 Télémétrie {driver}
</h1>



{
telemetry.length > 0 ?

<>

<TelemetryMap

data={telemetry}

index={telemetryIndex}

/>



<input

type="range"

min="0"

max={telemetry.length-1}

value={telemetryIndex}

onChange={
e=>
setTelemetryIndex(
Number(e.target.value)
)
}

/>



<TelemetryChart

data={telemetry}

driver={driver}

/>


</>

:

<p>
Pas de données télémétrie disponibles
</p>

}



</div>

);

}


export default TelemetryPage;