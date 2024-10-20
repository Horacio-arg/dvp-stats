import { includes } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import GenderSelector from './GenderSelector'
import ServiceSelector from './ServiceSelector'
import { reduceAndSortByName } from '../utils'


export default function ServiceExtraPriceChart() {
	const [selectedDateType, setSelectedDateType] = useState('Prive ontvangst')
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const [selectedService, setSelectedService] = useState('Pijpen zonder condoom')
	const data = reduceAndSortByName({
		getter: item => item.price,
		filter: item => item.gender === selectedGender && includes(item.dateTypes, selectedDateType),
		flatMap: item => item.services,
		flatMapFilter: service => service.name === selectedService
	})
	return <Chart
		title="Mogelijkheden extra prijs"
		data={data}
		showMedian={true}
		showAverage={true}
		color="#ce0c0b"
	>
		<ServiceSelector selected={selectedService} setSelected={setSelectedService} />
		<DateTypeSelector selected={selectedDateType} setSelected={setSelectedDateType} />
		<GenderSelector selected={selectedGender} setSelected={setSelectedGender} />
	</Chart>
}