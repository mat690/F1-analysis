import Plot from "react-plotly.js";


function TelemetryMap({
    data,
    index
}) {


    if(!data || data.length===0)
    {
        return <p>Pas de données circuit</p>;
    }



    const x =
        data.map(
            p=>p.X
        );


    const y =
        data.map(
            p=>p.Y
        );



    const car =
        data[index];



    return (

        <Plot


        data={[


            {
                x:x,

                y:y,

                mode:"lines",

                name:"Circuit",

                line:{
                    width:3
                }

            },


            {


                x:[
                    car.X
                ],


                y:[
                    car.Y
                ],


                mode:"markers",


                name:"Voiture",


                marker:{
                    size:15
                }


            }


        ]}



        layout={{

            title:"Position voiture",

            width:800,

            height:600,


            xaxis:{
                visible:false
            },


            yaxis:{
                visible:false,

                scaleanchor:"x"
            },


            margin:{
                l:20,
                r:20,
                t:40,
                b:20
            }

        }}


        config={{
            displayModeBar:false
        }}


        />


    );

}


export default TelemetryMap;