import { useEffect, useState } from "react";
import api from "../services/api";


export default function useTelemetry(
    season,
    race,
    session,
    driver
){

    const [telemetry,setTelemetry] = useState([]);
    const [index,setIndex] = useState(0);



    useEffect(()=>{


        api
        .get(
        `/telemetry/${season}/${race}/${session}/${driver}`
        )

        .then(res=>{

            setTelemetry(res.data);
            setIndex(0);

        })

        .catch(()=>{

            setTelemetry([]);

        });


    },[
        season,
        race,
        session,
        driver
    ]);



    return {

        telemetry,
        index,
        setIndex

    };

}