import Selector from './Selector'
import { getAllServices } from '../utils'

export default function ServiceSelector({ selected, setSelected }) {
    const options = getAllServices()
    return <Selector
        label="Mogelijkheid"
        selected={selected}
        onChange={e => setSelected(e.target.value)}
        options={options}
      />
}
