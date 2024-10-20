import { find, includes, some, sortBy, sumBy, without } from 'lodash'
import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import DurationSelector from './DurationSelector'
import GenderSelector from './GenderSelector'
import ServiceSelector from './ServiceSelector'
import rawData from '../data/data';
import { getAllServices, getAverage } from '../utils'

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
	const filteredData = rawData
		.filter(item => item.gender === selectedGender &&
			includes(item.dateTypes, selectedDateType) &&
			some(item.services, servicePredicate) &&
			some(item.prices, pricePredicate)
		)
		.map(item => ({
			basePrice: find(item.prices, pricePredicate).price,
			extras: sumBy(item.services.filter(servicePredicate), 'price')
		}))
	const data = filteredData
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
	const averageBasePrice = getAverage(filteredData
		.reduce((acc, current) => {
			const name = current.basePrice
			if (!find(acc, item => item.name === name)) {
				acc.push({ name, totaal: 0 })
			}
			find(acc, item => item.name === name).totaal++
			return acc
	    },
	    [])
    )
	const averageExtrasPrice = getAverage(filteredData
		.reduce((acc, current) => {
			const name = current.extras
			if (!find(acc, item => item.name === name)) {
				acc.push({ name, totaal: 0 })
			}
			find(acc, item => item.name === name).totaal++
			return acc
	    },
	    [])
    )
	const averageData = [{
		basisprijs: averageBasePrice,
		extrasprijs: averageExtrasPrice,
		totaal: `Totaal: ${averageBasePrice + averageExtrasPrice}`
	}]
	return <>
		<Chart
			title="Prijzen plus extra's"
			data={sortedData}
			showMedian={true}
			showAverage={true}
			width={920}
			color="#ff9f0e"
		>
			<DateTypeSelector selected={selectedDateType} setSelected={setSelectedDateType} />
			<GenderSelector selected={selectedGender} setSelected={setSelectedGender} />
			<DurationSelector selected={selectedDuration} setSelected={setSelectedDuration} />
		</Chart>
		<div className="extras-panel">
			<h3>Gemiddeld met extra's</h3>
			<div className="extras-content">
				<BarChart width={200} height={300} data={averageData}>
					<XAxis dataKey="totaal"/>
          <YAxis />
          <Tooltip/>
          <Bar dataKey="basisprijs" fill="#ff9f0e" stackId="a" />
          <Bar dataKey="extrasprijs" fill="#ce0c0b" stackId="a" />
				</BarChart>
				<select multiple value={selectedServices} onChange={e => toggleService(e.target.value)}>
					{allServices.map(service => <option key={service} value={service}>{service}</option>)}
				</select>
			</div>
		</div>
	</>
}
