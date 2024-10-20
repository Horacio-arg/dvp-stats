import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { isEmpty, sumBy } from 'lodash'
import { getMedian, getAverage } from '../utils'

function Chart({
  title,
  data,
  width = 440,
  showMedian = false,
  showAverage = false,
  color = '#8884d8',
  filters,
  children
}) {
  const [showTable, setShowTable] = useState(false)
  const switchGraph = () => setShowTable(!showTable)
  const total = sumBy(data, 'totaal')
  return (
    <div className="panel" style={{'width': width}}>
      <h3>{title} (<a onClick={switchGraph}>{showTable ? 'graph' : "table"}</a>)</h3>
      <div className="stats">
        <span>Totaal: {total}</span>
        {showMedian && <span>Mediaan: {getMedian(data)}</span>}
        {showAverage && <span>Gemiddeld: {getAverage(data)}</span>}
      </div>
      <div className="filters">{filters}</div>
      <div className="panelContent">
        {isEmpty(data) && 'Geen data'}
        {!isEmpty(data) && !showTable &&
          <BarChart width={width} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip/>
            <Bar dataKey="totaal" fill={color} />
          </BarChart>
        }
        {!isEmpty(data) && showTable &&
          <table>
            {data.map(item => <tr key={item.name + '-' + item.totaal}>
              <td>{item.name}</td>
              <td>{item.totaal}</td>
            </tr>)}
          </table>
        }
        {children}
      </div>
    </div>
  )
}

export default Chart
