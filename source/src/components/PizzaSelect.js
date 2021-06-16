
const PizzaSelect = (props) => {
	const options = props.options.map(it => (
		<option key={it.id}>
		{it.name}
		</option>
	));
		
	return (
		<select className="form=select" onChange={props.sel}>
			{options}
		</select>
	)
}

export default PizzaSelect;