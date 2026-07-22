import Plot from "react-plotly.js";


function DominanceMap({
    data,
    driver1,
    driver2
}) {


    if(!data || data.length === 0){

        return (
            <p>
                Pas de données de domination
            </p>
        );

    }



    /*
        On sépare les points
        selon le pilote dominant
    */


    const d1 = data.filter(
        p => p.winner === driver1
    );


    const d2 = data.filter(
        p => p.winner === driver2
    );



    return (

        <Plot

            data={[


                // PILOTE 1

                {
                    x: d1.map(
                        p => p.X
                    ),

                    y: d1.map(
                        p => p.Y
                    ),


                    mode:"markers+lines",


                    name:driver1,


                    line:{
                        width:6
                    },


                    marker:{
                        size:5
                    }

                },



                // PILOTE 2

                {
                    x: d2.map(
                        p => p.X
                    ),

                    y: d2.map(
                        p => p.Y
                    ),


                    mode:"markers+lines",


                    name:driver2,


                    line:{
                        width:6
                    },


                    marker:{
                        size:5
                    }

                }


            ]}



            layout={{


                title:
                `Carte domination ${driver1} vs ${driver2}`,


                width:800,

                height:700,


                xaxis:{

                    visible:false

                },


                yaxis:{

                    visible:false,

                    scaleanchor:"x"

                },


                legend:{

                    orientation:"h"

                },


                margin:{

                    l:20,
                    r:20,
                    t:50,
                    b:20

                }

            }}


            config={{

                displayModeBar:false

            }}


        />

    );

}


export default DominanceMap;