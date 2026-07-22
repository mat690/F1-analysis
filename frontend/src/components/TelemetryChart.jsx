import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";


function TelemetryChart({
    data,
    driver
}) {


    if(!data || data.length===0){

        return (
            <p>
                Pas de télémétrie disponible
            </p>
        );

    }



    return (

        <div>


            <h2>
                Télémétrie {driver}
            </h2>



            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <LineChart
                    data={data}
                >


                    <CartesianGrid />



                    <XAxis

                        dataKey="Distance"

                        label={{
                            value:"Distance (m)",
                            position:"insideBottom"
                        }}

                    />



                    <YAxis />



                    <Tooltip />



                    <Legend />



                    <Line

                        type="monotone"

                        dataKey="Speed"

                        name="Vitesse km/h"

                        dot={false}

                    />



                    <Line

                        type="monotone"

                        dataKey="Throttle"

                        name="Accélérateur %"

                        dot={false}

                    />



                    <Line

                        type="monotone"

                        dataKey="Brake"

                        name="Frein"

                        dot={false}

                    />


                </LineChart>


            </ResponsiveContainer>


        </div>

    );

}


export default TelemetryChart;