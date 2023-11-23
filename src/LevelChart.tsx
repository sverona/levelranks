import { useRef, useEffect, useState } from 'react'

import * as d3 from "d3";

import { allFilters } from './util'

export default function LevelChart({
	data,
	xFunc,
	yFunc,
	cFunc,
	width = 640,
	height = 400,
	margin = {top: 20, right: 20, bottom: 20, left: 70}
}) {
	const x = d3.scaleLinear(d3.extent(data, xFunc), [margin.left, width - margin.right]);
	const y = d3.scaleLinear(d3.extent(data, yFunc), [height - margin.bottom, margin.top]);
	const c = d3.scaleLinear(d3.extent(data, cFunc), ["blue", "red"]).interpolate(d3.interpolateRgb.gamma(2.2))

	const gx = useRef();
	const gy = useRef();
	useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
	useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

	return (
		<svg width={width} height={height}>
			<g ref={gx} transform={`translate(0,${height - margin.bottom})`} />
			<g ref={gy} transform={`translate(${margin.left},0)`} />
			<g fill="white" stroke="currentColor" strokeWidth="1.5">
		{ data.map((song) => {
			return <circle key={song.info.level} stroke={c(cFunc(song))} cx={x(xFunc(song))} cy={y(yFunc(song))} r="2.5" /> })}
			</g>
		</svg>
	)
}
