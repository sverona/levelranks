import { useEffect, useState } from 'react'

import { rank, isAAA, isFullCombo, isSingleDigitGood, passed } from './util'

const summaryCols = [
	{
		name: 'Files',
		key: data => data.length,
	},
	{
		name: 'Σ',
		key: data => data.reduce((sum, song) => sum + rank(song), 0),
	},
	{
		name: 'Avg',
		key: data => (data.reduce((sum, song) => sum + rank(song), 0) / data.length).toFixed(2),
	},
	{
		name: 'AAA',
		key: data => data.filter(isAAA).length,
	},
	{
		name: 'FC',
		key: data => data.filter(isFullCombo).length,
	},
	{
		name: 'SDG',
		key: data => data.filter(isSingleDigitGood).length,
	},
	{
		name: 'PASS',
		key: data => data.filter(passed).length,
	},
]

function Summary({ allData, data }) {
	return <section style={{margin: '2rem'}}>
		<table>
			<thead>
				<tr>
					<th></th>
					{ summaryCols.map( col => <th>{ col.name }</th> ) }
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>All</th>
					{ summaryCols.map( col => <td>{ col.key(allData) }</td> ) }
				</tr>
				<tr>
					<th>Selected</th>
					{ summaryCols.map( col => <td>{ col.key(data) }</td> ) }
				</tr>
			</tbody>
		</table>
	</section>
}

export default Summary
