import Plot from "react-plotly.js";


function StrategyChart({stints}) {


    const compounds = {};



    stints.forEach(lap=>{


        if(!compounds[lap.Pneu]){

            compounds[lap.Pneu]=[];

        }


        compounds[lap.Pneu].push(
            lap.Tour
        );


    });



    return (

        <Plot

        data={

            Object.keys(compounds).map(
                tyre=>(


                {

                    x:compounds[tyre],

                    y:
                    compounds[tyre]
                    .map(
                        ()=>tyre
                    ),


                    type:"scatter",

                    mode:"markers",

                    name:tyre,


                    marker:{
                        size:15
                    }

                }


                )

            )

        }



        layout={{

            title:"Stratégie pneus",

            xaxis:{
                title:"Tour"
            },

            yaxis:{
                title:"Pneu"
            },


            height:400

        }}

        />

    );

}


export default StrategyChart;