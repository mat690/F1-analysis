import { useEffect, useState } from "react";
import api from "../services/api";


export default function useFormulaInsight(
    season,
    race,
    session,
    driver1,
    driver2
){

    const [insight,setInsight] = useState(null);



    useEffect(()=>{


        async function loadInsight(){


            try{


                const response = await api.get(

                `/sector-comparison/${season}/${race}/${session}/${driver1}/${driver2}`

                );


                const data = response.data;



                const result = {


                    driver1:data.driver1,

                    driver2:data.driver2,


                    sectors:[

                        {
                            name:"S1",

                            driver1:data.driver1_best.S1,

                            driver2:data.driver2_best.S1,

                            delta:
                            Number(
                            (
                            data.driver1_best.S1 -
                            data.driver2_best.S1
                            )
                            .toFixed(3)
                            )

                        },


                        {
                            name:"S2",

                            driver1:data.driver1_best.S2,

                            driver2:data.driver2_best.S2,

                            delta:
                            Number(
                            (
                            data.driver1_best.S2 -
                            data.driver2_best.S2
                            )
                            .toFixed(3)
                            )

                        },


                        {
                            name:"S3",

                            driver1:data.driver1_best.S3,

                            driver2:data.driver2_best.S3,

                            delta:
                            Number(
                            (
                            data.driver1_best.S3 -
                            data.driver2_best.S3
                            )
                            .toFixed(3)
                            )

                        }

                    ]

                };



                setInsight(result);



            }
            catch(error){

                console.log(
                    "Formula Insight error:",
                    error
                );

                setInsight(null);

            }


        }


        loadInsight();



    },[
        season,
        race,
        session,
        driver1,
        driver2
    ]);



    return insight;

}