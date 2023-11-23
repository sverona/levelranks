function TableBody({ tableData, columns, flags }) {
	return (
		<tbody>
			{tableData.map((data) => {
				if (data.scores.played === 0) {
					return (<tr key={data.info.level} className="unplayed">
						{
							flags.map(() => {
								return (<td></td>)
							})
						}
						{columns.slice(0, 3).map(({ accessor }) => {
								return (<td>{accessor(data)}</td>)
							})}
							<td className="spanner" colSpan={ columns.length - 3 }>unplayed</td>
					</tr>)
				}
			return (<tr key={data.info.level}>
						{
							flags.map(({ condition, name, background, color }) => {
								if (condition(data)) {
									return (<td style={{backgroundColor: background}}></td>)
								} else {
									return (<td></td>)
								}
							})
						}
					{columns.map(({ accessor }) => {
						return (<td>{accessor(data)}</td>)
					})}
			</tr>)
			})}
		</tbody>
	)
}


export default TableBody
