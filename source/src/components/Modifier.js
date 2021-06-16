
const Modifier = (props) => {
	const modifiers = props.data.map(it => {
	if(it[2] === 0) return(
		<li>
		<p>{it[0] + " " +it[1]}</p>
		</li>
	)
	else return(
		<li>
		<p>{it[0] + " " + it[1] + " x " + it[2]}</p>
		</li>
	)
	})

	return (<>
	{modifiers}
	</>)
}

export default Modifier;