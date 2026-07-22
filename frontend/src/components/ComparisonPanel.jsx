function ComparisonPanel({
    stats1,
    stats2,
    driver1,
    driver2
}) {


    if(!stats1 || !stats2){

        return (
            <p>
                Chargement comparaison...
            </p>
        );

    }



    const delta =
        stats1.best_lap -
        stats2.best_lap;



    const faster =
        delta < 0
        ? driver1
        : driver2;



    return (

        <div className="comparison-panel">


            <h2>
                Comparaison pilotes
            </h2>



            <div className="drivers">


                <div className="driver-card">

                    <h3>
                        {driver1}
                    </h3>


                    <p>
                        Meilleur tour :
                        <br/>
                        {stats1.best_lap}s
                    </p>


                    <p>
                        Moyenne :
                        <br/>
                        {stats1.average_lap}s
                    </p>


                    <p>
                        Tours :
                        <br/>
                        {stats1.total_laps}
                    </p>

                </div>





                <div className="driver-card">

                    <h3>
                        {driver2}
                    </h3>


                    <p>
                        Meilleur tour :
                        <br/>
                        {stats2.best_lap}s
                    </p>


                    <p>
                        Moyenne :
                        <br/>
                        {stats2.average_lap}s
                    </p>


                    <p>
                        Tours :
                        <br/>
                        {stats2.total_laps}
                    </p>

                </div>


            </div>



            <h3>

                Pilote le plus rapide :

                <br/>

                {faster}

            </h3>



            <p>

                Écart :

                <br/>

                {Math.abs(delta).toFixed(3)} secondes

            </p>



        </div>

    );

}


export default ComparisonPanel;