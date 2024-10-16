import Selector from './Selector'

const DurationSelector = ({ selected, setSelected }) => {
  const options = [{
    value: 15,
    label: 'Vluggertje'
  }, {
    value: 30,
    label: '30 minuten'
  }, {
    value: 45,
    label: '45 minuten'
  }, {
    value: 60,
    label: '1 uur'
  }, {
    value: 120,
    label: '2 uur'
  }, {
    value: 720,
    label: '12 uur'
  }, {
    value: 1440,
    label: '24 uur'
  }]
	return (
        <Selector
          label="Tijd"
          selected={selected}
          onChange={e => setSelected(parseInt(e.target.value))}
          options={options}
        />
	)
}

export default DurationSelector
