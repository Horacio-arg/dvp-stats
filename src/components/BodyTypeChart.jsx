import { includes } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import GenderSelector from './GenderSelector'
import { reduceAndSortByCount } from '../utils'


export default function BodyTypeChart() {
	const [selectedDateType, setSelectedDateType] = useState('Prive ontvangst')
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const data = reduceAndSortByCount({
		getter: item => item.bodyType,
		filter: item => item.gender === selectedGender && includes(item.dateTypes, selectedDateType)
	})
	return <Chart title="Lichaamsbow" data={data} color="#31a551">
		<DateTypeSelector selected={selectedDateType} setSelected={setSelectedDateType} />
		<GenderSelector selected={selectedGender} setSelected={setSelectedGender} />
	</Chart>
}