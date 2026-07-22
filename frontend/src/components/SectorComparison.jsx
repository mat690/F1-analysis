function SectorComparison({ comparison }) {


    if (!comparison) {
        return null;
    }


    const sectors = [
        "S1",
        "S2",
        "S3"
    ];



    return (

        <div>


            <h2>
                Comparaison secteurs
            </h2>



            <table>


                <thead>

                    <tr>

                        <th>
                            Secteur
                        </th>


                        <th>
                            {comparison.driver1}
                        </th>


                        <th>
                            {comparison.driver2}
                        </th>


                        <th>
                            Delta
                        </th>

                    </tr>

                </thead>



                <tbody>


                    {
                        sectors.map(sector => {


                            const time1 =
                                comparison.driver1_best[sector];


                            const time2 =
                                comparison.driver2_best[sector];



                            const delta =
                                time1 - time2;



                            const absDelta =
                                Math.abs(delta).toFixed(3);



                            return (

                                <tr key={sector}>


                                    <td>
                                        {sector}
                                    </td>



                                    <td>
                                        {time1.toFixed(3)} s
                                    </td>



                                    <td>
                                        {time2.toFixed(3)} s
                                    </td>



                                    <td>


                                        {
                                            delta < 0

                                            ?

                                            `${comparison.driver1} +${absDelta}s`

                                            :

                                            `${comparison.driver2} +${absDelta}s`
                                        }


                                    </td>


                                </tr>

                            );


                        })
                    }


                </tbody>


            </table>


        </div>

    );


}


export default SectorComparison;