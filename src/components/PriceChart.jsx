import { includes } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import DurationSelector from './DurationSelector'
import GenderSelector from './GenderSelector'
import { reduceAndSortByName } from '../utils'


export default function PriceChart() {
	const [selectedDateType, setSelectedDateType] = useState('Prive ontvangst')
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const [selectedDuration, setSelectedDuration] = useState(60)
	const data = reduceAndSortByName({
		getter: item => item.price,
		filter: item => item.gender === selectedGender && includes(item.dateTypes, selectedDateType),
		flatMap: item => item.prices,
		flatMapFilter: price => price.duration === selectedDuration && price.type === selectedDateType
	})
	return <Chart
		title="Prijzen"
		data={data}
		showMedian={true}
		showAverage={true}
		width={660}
		color="#fed615"
		filters={
			<>
				<DateTypeSelector selected={selectedDateType} setSelected={setSelectedDateType} />
				<GenderSelector selected={selectedGender} setSelected={setSelectedGender} />
				<DurationSelector selected={selectedDuration} setSelected={setSelectedDuration} />
			</>
		}
	/>
}
