import React, { useState } from 'react';

import ManipButton from './ManipButton.js'

const IngredientSelect = (props) => {
	const options = props.options.map(it => (
		<option key={it.id}>
		{it}
		</option>
	));
	
	const [old, setOld] = useState(0);
	const [val, setVal] = useState("");
	const [number, setNumber] = useState(1);
	const [noManip, change] = useState(true);
	
	const enabler = options.length < 2;
	
	const onChange = (event) => {
		props.sel(event, props.num, old, val);
		let num = event.target.options.selectedIndex;
		const value = event.target.value;
		if(props.num < props.lim-1) num += 1;
		setOld(num);
		setVal(value);
		change(value === "");
		setNumber(1);
	}
	
	const onPlus = (event) => {
		const num = number === 999 ? number : number + 1;
		setNumber(num);
		props.manip(event, props.num, num);
	}
	
	const onMinus = (event) => {
		const num = number === 1 ? number : number - 1;
		setNumber(num);
		props.manip(event, props.num, num);
	}
	
	let manip = noManip || props.stable ? "" : <>
		<input className="form-control" readOnly value={number} style={{width: 50 + 'px'}} />
		<ManipButton symbol='+' manip={onPlus}  />
		<ManipButton symbol='-' manip={onMinus}  />
	</>;
		
	return (<div style={{display: 'flex', justifyContent: "center"}}>
		<select className="form=select" onChange={onChange} style={{width: 92 + 'px', height: 35 + 'px'}} disabled={enabler} value={val}>
			{options}
		</select>
		{manip}</div>
	)
}

export default IngredientSelect;