import Plot from "react-plotly.js";


function PerformanceChart({drivers}) {


    const names = drivers.map(
        driver => driver.Abbreviation
    );


    const positions = drivers.map(
        driver => driver.Position
    );



    return (

        <div>

            <h2>
                Classement qualifications
            </h2>


            <Plot

                data={[
                    {
                        x: names,
                        y: positions,
                        type: "bar",
                        marker: {
                            color: "red"
                        }
                    }
                ]}


                layout={{

                    width:700,

                    height:400,

                    title:
                    "Position des pilotes"

                }}

            />


        </div>

    );


}


export default PerformanceChart;