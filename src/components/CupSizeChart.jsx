import { includes } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import GenderSelector from './GenderSelector'
import { reduceAndSortByName } from '../utils'


export default function CupSizeChart() {
	const [selectedDateType, setSelectedDateType] = useState('Prive ontvangst')
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const data = reduceAndSortByName({
		getter: item => item.cupSize,
		filter: item => item.gender === selectedGender && includes(item.dateTypes, selectedDateType)
	})
	return <Chart title="Cupmaat" data={data} showMedian={true} color="#31a551" filters={
		<>
			<DateTypeSelector selected={selectedDateType} setSelected={setSelectedDateType} />
			<GenderSelector
				selected={selectedGender}
				setSelected={setSelectedGender}
				options={['Vrouw', 'Shemale', 'Stel']}
			/>
		</>
	} />
}