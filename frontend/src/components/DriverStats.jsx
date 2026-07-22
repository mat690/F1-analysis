function DriverStats({stats}) {


    if(!stats){
        return null;
    }


    return (

        <div>

            <h2>
                Statistiques {stats.conducteur}
            </h2>


            <p>
                🏁 Meilleur tour :
                {stats.meilleur_tour}s
            </p>


            <p>
                📊 Moyenne :
                {stats.moyenne_tour}s
            </p>


            <p>
                🔄 Tours analysés :
                {stats.total_laps}
            </p>


        </div>

    );

}


export default DriverStats;