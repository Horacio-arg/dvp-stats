import { includes } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import GenderSelector from './GenderSelector'
import { reduceAndSortByCount } from '../utils'


export default function ServiceChart() {
	const [selectedDateType, setSelectedDateType] = useState('Prive ontvangst')
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const data = reduceAndSortByCount({
		getter: item => item.name,
		flatMap: item => item.services,
		filter: item => item.gender === selectedGender && includes(item.dateTypes, selectedDateType)
	})
	return <Chart title="Mogelijkheden" data={data} width={880} color="#ce0c0b">
		<DateTypeSelector selected={selectedDateType} setSelected={setSelectedDateType} />
		<GenderSelector selected={selectedGender} setSelected={setSelectedGender} />
	</Chart>
}