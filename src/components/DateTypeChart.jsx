import { includes } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import GenderSelector from './GenderSelector'
import { reduceAndSortByCount } from '../utils'


export default function DateTypeChart() {
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const data = reduceAndSortByCount({
		filter: item => item.gender === selectedGender,
		flatMap: item => item.dateTypes
	})
	return <Chart
		title="Type date"
		data={data}
		filters={<GenderSelector selected={selectedGender} setSelected={setSelectedGender} />}
	/>
}