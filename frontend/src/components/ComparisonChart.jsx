import Plot from "react-plotly.js";


function ComparisonChart({
    laps1,
    laps2,
    driver1,
    driver2
}) {


    const getLapNumber = (lap) => {

        return Object.values(lap)[0];

    };


    const getLapTime = (lap) => {

        return Object.values(lap)[1];

    };



    console.log("LAPS1", laps1);


    return (

        <Plot

            data={[

                {
                    x: laps1.map(getLapNumber),

                    y: laps1.map(getLapTime),

                    type:"scatter",

                    mode:"lines+markers",

                    name:driver1
                },


                {
                    x: laps2.map(getLapNumber),

                    y: laps2.map(getLapTime),

                    type:"scatter",

                    mode:"lines+markers",

                    name:driver2
                }

            ]}


            layout={{

                title:"Comparaison des temps au tour",

                xaxis:{
                    title:"Tour"
                },

                yaxis:{
                    title:"Secondes"
                },

                width:900,

                height:500

            }}

        />

    );

}


export default ComparisonChart;