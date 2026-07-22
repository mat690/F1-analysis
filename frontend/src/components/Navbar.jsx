function Navbar({page,setPage}){


return (

<nav>

<h2>
🏎️ F1 Analysis
</h2>


<button
onClick={()=>setPage("dashboard")}
>
Dashboard
</button>


<button
onClick={()=>setPage("telemetry")}
>
📡 Télémétrie
</button>


<button
onClick={()=>setPage("insight")}
>
🧠 Formula Insight
</button>


<button
onClick={()=>setPage("race")}
>
🏁 Course
</button>


</nav>

);

}


export default Navbar;