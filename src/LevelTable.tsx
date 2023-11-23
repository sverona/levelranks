import { useEffect, useState } from 'react'

import { allColumns, allFlags, isUnplayed } from './util'

import TableHead from './TableHead.tsx'
import TableBody from './TableBody.tsx'


function LevelTable({ data }) {
	const [tableData, setTableData] = useState(data)

	useEffect(() => {
		setTableData(data)
	}, [data])

	function handleSorting(column, sortOrder) {
		if (column.label) {
			const sorted = [...tableData].sort((a, b) => {

				if (column.needsPlayed) {
					// Sort unplayed songs to the end.
					if (isUnplayed(a) && !isUnplayed(b)) { return 1; }
					if (!isUnplayed(a) && isUnplayed(b)) { return -1; }
					if (isUnplayed(a) && isUnplayed(b)) { return 0; }
				}

				const sortFunc = column.key || column.accessor;
				const fA = sortFunc(a)
				const fB = sortFunc(b)
				if (fA === fB) {
					return 0
				} else {
					const larger = fA < fB ? -1 : 1
					const direction = sortOrder === 'ascending' ? 1 : -1
					return larger * direction
				}
			})
			setTableData(sorted)
		}
	}

return (
	<table>
		<TableHead columns={allColumns} handleSorting={handleSorting} flags={allFlags} />
		<TableBody columns={allColumns} tableData={tableData} flags={allFlags} />
	</table>
  )
}

export default LevelTable
