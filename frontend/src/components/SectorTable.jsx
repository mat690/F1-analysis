function SectorTable({sectors}) {


return (

<table>

<thead>

<tr>

<th>Tour</th>
<th>S1</th>
<th>S2</th>
<th>S3</th>

</tr>

</thead>


<tbody>

{
sectors.map((lap,index)=>(

<tr key={index}>

<td>
{lap["Numéro de tour"]}
</td>


<td>
{lap.S1.toFixed(3)}
</td>


<td>
{lap.S2.toFixed(3)}
</td>


<td>
{lap.S3.toFixed(3)}
</td>


</tr>

))
}

</tbody>


</table>

);


}


export default SectorTable;