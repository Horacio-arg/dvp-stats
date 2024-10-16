import Selector from './Selector'

export default function DateTypeSelector({ selected, setSelected }) {
  const options = [
    'Prive ontvangst',
    'Escort',
    'Erotische massage',
    'Virtual Sex',
    'BDSM',
    'Raamprostitutie'
  ]
  return <Selector
    label="Type date"
    selected={selected}
    onChange={e => setSelected(e.target.value)}
    options={options}
  />
}
