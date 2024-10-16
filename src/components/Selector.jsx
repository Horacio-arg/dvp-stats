import React from 'react'
import { isObject } from 'lodash'

function Selector({ label, selected, onChange, options }) {
  const optionsResults = isObject(options[0]) ? options : options.map(value => ({ label: value, value }))
  return (
    <div className="selector">
        <label htmlFor={label}>{label}: </label>
        <select name={label} value={selected} onChange={onChange}>
          {optionsResults.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
    </div>
  )
}

export default Selector
