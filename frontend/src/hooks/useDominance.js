import { useEffect, useState } from "react";
import api from "../services/api";


export default function useDominance(
    season,
    race,
    session,
    driver1,
    driver2
){

    const [dominance,setDominance] = useState([]);



    useEffect(()=>{


        async function loadDominance(){


            try{


                const response =
                await api.get(

                `/dominance/${season}/${race}/${session}/${driver1}/${driver2}`

                );


                setDominance(response.data);



            }
            catch(error){


                console.log(
                    "Dominance error:",
                    error
                );


                setDominance([]);


            }


        }


        loadDominance();



    },[
        season,
        race,
        session,
        driver1,
        driver2
    ]);



    return dominance;


}