import { find, includes, some, sortBy, sumBy, without } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import DurationSelector from './DurationSelector'
import GenderSelector from './GenderSelector'
import ServiceSelector from './ServiceSelector'
import rawData from '../data/data';
import { getAllServices } from '../utils'

export default function PriceWithExtrasChart() {
	const [showTable, setShowTable] = useState(false)
	const switchGraph = () => setShowTable(!showTable)
	const [selectedDateType, setSelectedDateType] = useState('Prive ontvangst')
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const [selectedDuration, setSelectedDuration] = useState(60)
	const [selectedServices, setSelectedServices] = useState(['Pijpen zonder condoom'])
	const allServices = getAllServices()
	const toggleService = service => {
		const newServices = includes(selectedServices, service) ?
			without(selectedServices, service) :
			[...selectedServices, service]
		setSelectedServices(newServices)
	}
	const getPriceDateType = () => selectedDateType === 'Escort' ? 'Escort' : 'Prive ontvangst'
	const servicePredicate = service => some(selectedServices, selectedService => selectedService === service.name)
	const pricePredicate = price => price.duration === selectedDuration && price.type === getPriceDateType()
	const data = rawData
		.filter(item => item.gender === selectedGender &&
			includes(item.dateTypes, selectedDateType) &&
			some(item.services, servicePredicate) &&
			some(item.prices, pricePredicate)
		)
		.map(item => ({
			basePrice: find(item.prices, pricePredicate).price,
			extras: sumBy(item.services.filter(servicePredicate), 'price')
		}))
		.reduce((acc, current) => {
			const name = current.basePrice + current.extras
			if (!find(acc, item => item.name === name)) {
				acc.push({ name, totaal: 0 })
			}
			find(acc, item => item.name === name).totaal++
			return acc
	    },
	    [])
	const sortedData = sortBy(data, ['name'])
	return <>
		<Chart
			title="Prijzen plus extra's"
			data={sortedData}
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
		>
			<select multiple value={selectedServices} onChange={e => toggleService(e.target.value)}>
				{allServices.map(service => <option key={service} value={service}>{service}</option>)}
			</select>
		</Chart>
	</>
}
