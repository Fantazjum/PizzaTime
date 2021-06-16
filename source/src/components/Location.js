import React, { Component } from 'react';

import Lok from '../images/Tables.jpg';

class Location extends Component {
	
	locals = ["Nibylandia", "Hallownest", "Eberron", "Deponia", "Atlantyda", "Lordran"];

	render() {
		const places = this.locals.map(it => (<li key={it}>{it}</li>));
		return(
		<div style={{display: 'flex', justifyContent: "center", height: 120 + '%'}}>
			<div style={{border: 3 + 'px Solid', backgroundColor: 'AntiqueWhite', width: 50 + '%'}}>
				<img src={Lok} style={{width: 100 + '%', height: 35 + '%'}} alt='HappyPizzeriaBanner'/>
				<h1>Szczesliwa pizzeria</h1>
				<p>Mamy wiele lokacji, w większości wyimaginowanych!</p>
				<p className="text-info">Oto kilka z nich:</p>
				<ul style={{lineHeight: 150 + '%'}}>
					{places}
				</ul>
			</div>
		</div>
		)
	}
}

export default Location;