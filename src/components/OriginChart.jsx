import { includes } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import GenderSelector from './GenderSelector'
import { reduceAndSortByCount } from '../utils'


export default function OriginChart() {
	const [selectedDateType, setSelectedDateType] = useState('Prive ontvangst')
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const data = reduceAndSortByCount({
		getter: item => item.origin,
		filter: item => item.gender === selectedGender && includes(item.dateTypes, selectedDateType)
	})
	return <Chart title="Afkomst" data={data} filters={
		<>
			<DateTypeSelector selected={selectedDateType} setSelected={setSelectedDateType} />
			<GenderSelector selected={selectedGender} setSelected={setSelectedGender} />
		</>
	}/>
}