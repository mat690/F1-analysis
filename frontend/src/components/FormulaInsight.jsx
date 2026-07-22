function FormulaInsight({data}){


if(!data){

return null;

}



return (

<div>


<h2>
Formula Insight
</h2>



<h3>
{data.driver1} vs {data.driver2}
</h3>



{
data.sectors.map(sector=>(


<div

key={sector.name}

style={{

background:"#202020",

color:"white",

padding:"15px",

margin:"10px",

borderRadius:"10px"

}}

>


<h3>
{sector.name}
</h3>


<p>
{data.driver1} :
{sector.driver1.toFixed(3)}s
</p>


<p>
{data.driver2} :
{sector.driver2.toFixed(3)}s
</p>



<p

style={{

color:
sector.delta < 0
?
"#66bb6a"
:
"#ff5252"

}}

>

Delta :
{sector.delta > 0 ? "+" : ""}
{sector.delta}s

</p>


</div>


))

}



</div>

);


}


export default FormulaInsight;