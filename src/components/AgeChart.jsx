import { includes } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import GenderSelector from './GenderSelector'
import { reduceAndSortByName } from '../utils'


export default function AgeChart() {
	const [selectedDateType, setSelectedDateType] = useState('Prive ontvangst')
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const data = reduceAndSortByName({
		getter: item => item.age,
		filter: item => item.gender === selectedGender && includes(item.dateTypes, selectedDateType)
	})
	return <Chart title="Leeftijd" data={data} showMedian={true} showAverage={true}>
		<DateTypeSelector selected={selectedDateType} setSelected={setSelectedDateType} />
		<GenderSelector selected={selectedGender} setSelected={setSelectedGender} />
	</Chart>
}