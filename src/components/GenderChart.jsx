import { reduceAndSortByCount } from '../utils'
import Chart from './Chart'

export default function GenderChart() {
    const data = reduceAndSortByCount({ getter: item => item.gender })
    return <Chart title="Geslacht" data={data} />
}
