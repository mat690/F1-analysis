function ResultsTable({drivers}){


return (

<table>


<thead>

<tr>

<th>
Position
</th>

<th>
Pilote
</th>

<th>
Equipe
</th>

</tr>

</thead>



<tbody>


{
drivers.map(driver=>(

<tr key={driver.Abbreviation}>


<td>
{driver.Position}
</td>


<td>
{driver.FullName}
</td>


<td>
{driver.TeamName}
</td>


</tr>


))
}


</tbody>


</table>


)


}


export default ResultsTable;