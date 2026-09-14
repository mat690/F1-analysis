import Plot from "react-plotly.js";

function TelemetryMap({
    data,
    index
}) {

    if (!Array.isArray(data) || data.length === 0) {
        return <p>Pas de données circuit</p>;
    }

    const safeIndex = Math.min(
        Math.max(index ?? 0, 0),
        data.length - 1
    );

    const x = data.map(
        p => p.x
    );

    const y = data.map(
        p => p.y
    );

    const car = data[safeIndex];

    if (!car) {
        return <p>Pas de position disponible</p>;
    }

    return (

        <Plot

            data={[

                {
                    x: x,
                    y: y,
                    mode: "lines",
                    name: "Circuit",
                    line: {
                        width: 3
                    }
                },

                {
                    x: [
                        car.x
                    ],

                    y: [
                        car.y
                    ],

                    mode: "markers",

                    name: "Voiture",

                    marker: {
                        size: 15
                    }
                }

            ]}

            layout={{
                title: "Position voiture",

                width: 800,
                height: 600,

                xaxis: {
                    visible: false
                },

                yaxis: {
                    visible: false,
                    scaleanchor: "x"
                },

                margin: {
                    l: 20,
                    r: 20,
                    t: 40,
                    b: 20
                }
            }}

            config={{
                displayModeBar: false
            }}

        />

    );

}

export default TelemetryMap;