import Plot from "react-plotly.js";

function TrackMap({ track }) {

    if (!track || track.length === 0) {
        return <p>Aucune donnée de circuit.</p>;
    }

    const x = track.map(point => point.X);
    const y = track.map(point => point.Y);

    return (

        <Plot

            data={[
                {
                    x: x,
                    y: y,

                    mode: "lines",

                    type: "scatter",

                    line: {
                        width: 4
                    },

                    name: "Circuit"
                }
            ]}

            layout={{

                title: "Carte du circuit",

                width: 700,

                height: 700,

                xaxis: {
                    visible: false
                },

                yaxis: {
                    visible: false,
                    scaleanchor: "x"
                },

                showlegend: false

            }}

        />

    );

}

export default TrackMap;