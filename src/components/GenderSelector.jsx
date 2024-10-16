import Selector from './Selector'

const GenderSelector = ({ selected, setSelected, options = ['Vrouw', 'Shemale', 'Stel', 'Man'] }) => {
	return (
        <Selector
          label="Geslacht"
          selected={selected}
          onChange={e => setSelected(e.target.value)}
          options={options}
        />
	)
}

export default GenderSelector
