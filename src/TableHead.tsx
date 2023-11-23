import { useState } from "react"

function TableHead({ columns, handleSorting, flags }) {
	const [sortField, setSortField] = useState("")
	const [order, setOrder] = useState("ascending")

	function handleSortingChange(column) {
		const sortOrder = (column.label === sortField) && order === "ascending" ? "descending" : "ascending"
		setSortField(column.label)
		setOrder(sortOrder)

		handleSorting(column, sortOrder)
	}
	return (
		<thead>
			<tr>
						{
							flags.map(() => {
								return (<th></th>)
							})
						}
			{columns.map((column) => {
				const arrow = order === "ascending" ? "⬆️" : "⬇️";
				return (
					<th key={column.label} onClick={() => handleSortingChange(column)}>
						{column.label}
						{(column.label === sortField) ?
						 (<span className={`arrow ${order}`}>{arrow}</span>)
						: ""}
					</th>
				)
			})}
			</tr>
		</thead>
	)
}

export default TableHead
