function Stats({drivers}){


    return (

        <div>


            <h2>
                Statistiques
            </h2>


            <p>
                Nombre de pilotes :
                {drivers.length}
            </p>


            <p>
                Pole position :
                {drivers[0]?.FullName}
            </p>


            <p>
                Équipe en pole :
                {drivers[0]?.TeamName}
            </p>


        </div>

    );

}


export default Stats;