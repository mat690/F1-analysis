function PracticeSummary({
    driver1,
    driver2,
    data1,
    data2
}) {

    const bestLapDriver =
        data1.meilleurTour != null &&
        data2.meilleurTour != null
            ? data1.meilleurTour <=
              data2.meilleurTour
                ? driver1
                : driver2
            : null;


    const bestAverageDriver =
        data1.rythmeMoyen != null &&
        data2.rythmeMoyen != null
            ? data1.rythmeMoyen <=
              data2.rythmeMoyen
                ? driver1
                : driver2
            : null;


    const mostConsistentDriver =
        data1.regularite != null &&
        data2.regularite != null
            ? data1.regularite <=
              data2.regularite
                ? driver1
                : driver2
            : null;


    return (
        <div className="card analysis-summary">

            <h2>
                📊 Résumé des essais libres
            </h2>

            <p>
                Meilleur tour :{" "}
                <strong>
                    {bestLapDriver ?? "—"}
                </strong>
            </p>

            <p>
                Meilleur rythme moyen :{" "}
                <strong>
                    {bestAverageDriver ?? "—"}
                </strong>
            </p>

            <p>
                Pilote le plus régulier :{" "}
                <strong>
                    {mostConsistentDriver ?? "—"}
                </strong>
            </p>

            <p>
                La tendance des longs relais
                représente l'évolution observée
                des chronos. Elle ne correspond
                pas uniquement à l'usure du pneu.
            </p>

        </div>
    );
}


export default PracticeSummary;