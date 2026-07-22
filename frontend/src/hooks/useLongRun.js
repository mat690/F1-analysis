import { useEffect,useState } from "react";
import api from "../services/api";


export default function useLongRun(
    season,
    race,
    session,
    driver
){

    const [longRun,setLongRun]=useState([]);



    useEffect(()=>{


        if(session==="Q"){

            setLongRun([]);
            return;

        }



        api.get(
        `/long-run/${season}/${race}/${session}/${driver}`
        )

        .then(res=>{

            setLongRun(res.data);

        })

        .catch(()=>{

            setLongRun([]);

        });



    },[
        season,
        race,
        session,
        driver
    ]);



    return longRun;

}