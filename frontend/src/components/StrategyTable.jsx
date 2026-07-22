function StrategyTable({stints}) {


return (

<table>

<thead>

<tr>

<th>Tour</th>
<th>Pneu</th>
<th>Relais</th>

</tr>

</thead>


<tbody>

{
stints.map((lap,index)=>(

<tr key={index}>

<td>
{lap.Tour}
</td>

<td>
{lap.Pneu}
</td>

<td>
{lap.Relais}
</td>

</tr>

))
}

</tbody>


</table>

);

}


export default StrategyTable;