import React, { Component } from 'react';

import Order from './Order.js';

import H from '../images/History.jpg';

class History extends Component {
	
	render() {
		const hist = this.props.hist.map( (it, idx) => {
			return <tr className="table-light"><td><Order pizzas={it} /></td><td>{this.props.time[idx]}</td></tr>
		});
		return(
		<div style={{display: 'flex', justifyContent: "center", height: 120 + '%'}}>
			<div style={{border: 3 + 'px Solid', backgroundColor: 'AntiqueWhite', width: 50 + '%'}}>
				<div>
				<img src={H} style={{left: 0}} alt='AHA'/>
				<p className="lead">
				A więc chcesz sobie przypomnieć, jakie pizze zamówiłeś do tej pory? <br />
				WSPANIALE!
				</p>
				</div>
				<table className="table table-hover">
				<thead><tr><th>Zamówienie</th><th>Czas zamówienia</th></tr></thead>
				<tbody>
				{hist}
				</tbody>
				</table>
			</div>
		</div>
		)
	}
}

export default History;