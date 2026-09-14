import Plot from "react-plotly.js";


function DominanceMap({
    data,
    driver1,
    driver2
}) {

    // =========================
    // Vérification
    // =========================

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <p>
                Pas de données de domination
            </p>
        );
    }


    // =========================
    // Séparation des pilotes
    // =========================

    const d1 = data.filter(
        p => p.delta >= 0
    );

    const d2 = data.filter(
        p => p.delta < 0
    );


    // =========================
    // Infos affichées au survol
    // =========================

    const hoverDriver1 = d1.map(
        p => [
            p.distance,
            p.vitesse1,
            p.vitesse2,
            p.delta
        ]
    );


    const hoverDriver2 = d2.map(
        p => [
            p.distance,
            p.vitesse1,
            p.vitesse2,
            p.delta
        ]
    );


    return (

        <div>

            <h2>
                🏁 Domination {driver1} vs {driver2}
            </h2>


            <p>
                🟢 {driver1} plus rapide :
                {" "}
                <strong>
                    {d1.length}
                </strong>
                {" "}
                points
            </p>


            <p>
                🔴 {driver2} plus rapide :
                {" "}
                <strong>
                    {d2.length}
                </strong>
                {" "}
                points
            </p>


            <Plot

                data={[

                    // =========================
                    // Tracé du circuit
                    // =========================

                    {
                        x: data.map(
                            p => p.x
                        ),

                        y: data.map(
                            p => p.y
                        ),

                        mode: "lines",

                        type: "scatter",

                        name: "Circuit",

                        hoverinfo: "skip",

                        line: {
                            width: 3,
                            color: "#555"
                        }
                    },


                    // =========================
                    // Pilote 1
                    // =========================

                    {
                        x: d1.map(
                            p => p.x
                        ),

                        y: d1.map(
                            p => p.y
                        ),

                        mode: "markers",

                        type: "scatter",

                        name: driver1,

                        customdata: hoverDriver1,

                        marker: {
                            size: 8,
                            color: "#00c853"
                        },

                        hovertemplate:
                            `<b>${driver1} plus rapide</b><br>` +
                            "Distance : %{customdata[0]:.0f} m<br>" +
                            `${driver1} : %{customdata[1]:.1f} km/h<br>` +
                            `${driver2} : %{customdata[2]:.1f} km/h<br>` +
                            "Delta : +%{customdata[3]:.1f} km/h" +
                            "<extra></extra>"
                    },


                    // =========================
                    // Pilote 2
                    // =========================

                    {
                        x: d2.map(
                            p => p.x
                        ),

                        y: d2.map(
                            p => p.y
                        ),

                        mode: "markers",

                        type: "scatter",

                        name: driver2,

                        customdata: hoverDriver2,

                        marker: {
                            size: 8,
                            color: "#ff1744"
                        },

                        hovertemplate:
                            `<b>${driver2} plus rapide</b><br>` +
                            "Distance : %{customdata[0]:.0f} m<br>" +
                            `${driver1} : %{customdata[1]:.1f} km/h<br>` +
                            `${driver2} : %{customdata[2]:.1f} km/h<br>` +
                            "Delta : %{customdata[3]:.1f} km/h" +
                            "<extra></extra>"
                    }

                ]}


                layout={{

                    title:
                        `Carte de domination ${driver1} vs ${driver2}`,

                    autosize: true,

                    height: 650,


                    xaxis: {
                        visible: false
                    },


                    yaxis: {
                        visible: false,
                        scaleanchor: "x"
                    },


                    legend: {
                        orientation: "h",
                        x: 0.5,
                        xanchor: "center"
                    },


                    margin: {
                        l: 20,
                        r: 20,
                        t: 60,
                        b: 20
                    },


                    hovermode: "closest"

                }}


                style={{
                    width: "100%"
                }}


                useResizeHandler={true}


                config={{
                    displayModeBar: false,
                    responsive: true
                }}

            />

        </div>

    );

}


export default DominanceMap;