import { useEffect, useState } from "react";
import api from "../services/api";


export default function useStats(
    season,
    race,
    session,
    driver1,
    driver2
){

    const [stats1,setStats1] = useState(null);
    const [stats2,setStats2] = useState(null);

    const [laps1,setLaps1] = useState([]);
    const [laps2,setLaps2] = useState([]);



    useEffect(()=>{


        async function load(){


            try{


                const s1 =
                await api.get(
                `/stats/${season}/${race}/${session}/${driver1}`
                );


                const s2 =
                await api.get(
                `/stats/${season}/${race}/${session}/${driver2}`
                );


                setStats1(s1.data);
                setStats2(s2.data);



                const l1 =
                await api.get(
                `/laps/${season}/${race}/${session}/${driver1}`
                );


                const l2 =
                await api.get(
                `/laps/${season}/${race}/${session}/${driver2}`
                );


                setLaps1(l1.data);
                setLaps2(l2.data);


            }
            catch(error){

                console.log(error);

            }


        }


        load();


    },[
        season,
        race,
        session,
        driver1,
        driver2
    ]);



    return {

        stats1,
        stats2,
        laps1,
        laps2

    };


}