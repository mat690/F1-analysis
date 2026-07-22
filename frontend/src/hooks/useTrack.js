import { useEffect, useState } from "react";
import api from "../services/api";


export default function useTrack(
    season,
    race,
    session,
    driver
){

    const [track,setTrack] = useState([]);



    useEffect(()=>{


        async function loadTrack(){


            try{


                const response =
                await api.get(
                `/track/${season}/${race}/${session}/${driver}`
                );


                setTrack(response.data);


            }
            catch(error){


                console.log(
                    "Track error:",
                    error
                );


                setTrack([]);


            }


        }


        loadTrack();


    },[
        season,
        race,
        session,
        driver
    ]);



    return track;

}