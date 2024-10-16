import { capitalize, includes } from 'lodash'
import React, { useState } from 'react'
import Chart from './Chart'
import DateTypeSelector from './DateTypeSelector'
import GenderSelector from './GenderSelector'
import { reduceAndSortByCount } from '../utils'


export default function LanguageChart() {
	const [selectedDateType, setSelectedDateType] = useState('Prive ontvangst')
	const [selectedGender, setSelectedGender] = useState('Vrouw')
	const mapLanguage = language => {
		switch(language) {
			case 'english': return 'Engels'
			case 'spanish': return 'Spaans'
			case 'dutch': return 'Nederlands'
			case 'german': return 'Duits'
			case 'french': return 'Frans'
			default: return capitalize(language)
		}
	}
	const data = reduceAndSortByCount({
		filter: item => item.gender === selectedGender && includes(item.dateTypes, selectedDateType),
		flatMap: item => item.languages.map(mapLanguage)
	})
	return <Chart title="Talen" data={data} filters={
		<>
			<DateTypeSelector selected={selectedDateType} setSelected={setSelectedDateType} />
			<GenderSelector selected={selectedGender} setSelected={setSelectedGender} />
		</>
	} />
}