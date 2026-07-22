import Plot from "react-plotly.js";


function LapChart({laps}) {


    const lapNumbers = laps.map(
        lap => lap.LapNumber
    );


    const lapTimes = laps.map(
        lap => lap.LapTime
    );



    return (

        <div>

            <h2>
                Evolution du temps au tour
            </h2>


            <Plot

                data={[
                    {
                        x: lapNumbers,
                        y: lapTimes,
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Temps"
                    }
                ]}


                layout={{

                    width:800,

                    height:400,

                    title:
                    "Rythme du pilote"

                }}

            />


        </div>

    );

}


export default LapChart;