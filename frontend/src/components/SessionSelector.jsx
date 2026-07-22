function SessionSelector({

    seasons,
    races,
    sessions,
    drivers,

    selectedSeason,
    setSelectedSeason,

    selectedRace,
    setSelectedRace,

    session,
    setSession,

    driver1,
    setDriver1,

    driver2,
    setDriver2

}){


return (

<div>


<select

value={selectedSeason}

onChange={
e=>setSelectedSeason(Number(e.target.value))
}

>

{
seasons.map(year=>(

<option

key={year}

value={year}

>

{year}

</option>

))

}

</select>



<select

value={selectedRace}

onChange={
e=>setSelectedRace(e.target.value)
}

>

{

races.map(r=>(

<option

key={r}

value={r}

>

{r}

</option>

))

}

</select>




<select

value={session}

onChange={
e=>setSession(e.target.value)
}

>

{

sessions.map(s=>(

<option

key={s.code}

value={s.code}

>

{s.name}

</option>

))

}

</select>




<select

value={driver1}

onChange={
e=>setDriver1(e.target.value)
}

>

{

drivers.map(d=>(

<option

key={d.code}

value={d.code}

>

{d.name}

</option>

))

}

</select>




<select

value={driver2}

onChange={
e=>setDriver2(e.target.value)
}

>

{

drivers.map(d=>(

<option

key={d.code}

value={d.code}

>

{d.name}

</option>

))

}

</select>



</div>

);

}


export default SessionSelector;