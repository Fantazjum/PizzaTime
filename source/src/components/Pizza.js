import React from 'react';

const Pizza = (props) => {
	const ingredients = props.ing.map((it, idx, arr) => {
		if(arr.length - 1 > idx) return <>{it}, </>
		else return <>{it}</>
	});
	
	return (
		<>
			<p className="text-success" style={{fontWeight: "bold"}}>{props.name}</p>
			<p className="text-muted">{ingredients}</p>
		</>
	)
}

export default Pizza;