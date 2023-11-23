import { useEffect, useState } from 'react'

import Graph from './Graph.tsx'
import Controls from './Controls.tsx'
import Summary from './Summary.tsx'
import LevelTable from './LevelTable.tsx'
import LevelChart from './LevelChart.tsx'
import './App.css'

import { allFilters } from './util'

import ranksData from './levelranks.json'

function App() {

	function initX( song ) { return song.info.level; }
	function initY( song ) { return song.scores.rank; }
	function initC( song ) { return song.info.difficulty; }

	const [xFunc, setXFunc] = useState(() => initX)
	const [yFunc, setYFunc] = useState(() => initY)
	const [cFunc, setCFunc] = useState(() => initC)

	const [filters, setFilters] = useState([]);

	const allData = Object.values(ranksData.songs);
	const [data, setData] = useState(allData);

	useEffect(() => {
		const allFilterNames = Object.keys(allFilters);
		const filtersToRun = allFilterNames.filter(filterName => !filters.includes(filterName));
		const filteredData = filtersToRun.reduce((data, filterName) => {
			const filter = allFilters[filterName];
			return data.filter(song => !filter.filter(song));
		}, allData)

		setData(filteredData)
	}
		, [filters]);

  return (
    <>
		<header>
			<h1>Improved Levelranks</h1>
		</header>

		<div style={{display: 'flex', flexWrap: 'wrap'}}>
			<LevelChart data={data} xFunc={xFunc} yFunc={yFunc} cFunc={cFunc}/>
			<Controls
				filters={filters} setFilters={setFilters}
				xFunc={xFunc} setXFunc={setXFunc}
				yFunc={yFunc} setYFunc={setYFunc}
				cFunc={cFunc} setCFunc={setCFunc}
			/>
		</div>
		<Summary allData={allData} data={data} />
	  <LevelTable data={data} />
    </>
  )
}

export default App
