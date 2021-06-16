import React, { Component } from 'react';

import Del from '../images/Delivery.png';
import Prog from '../images/DeliveryIn.png';

class Delivery extends Component {
	
	render() {
		
		return(
		<div style={{backgroundImage: `url(${Del})`, backgroundSize: 'cover', display: 'flex', justifyContent: "center", height: 120 + '%'}}>
			<div style={{border: 3 + 'px Solid', backgroundColor: 'AntiqueWhite', width: 50 + '%'}}>
				<img src={Prog} style={{width: 100 + '%', height: 75 + '%'}} alt='HappyPizzeriaBanner'/>
				<h1>Zamówienie przyjęte!</h1>
				<p>Wyobraź sobie, jakbyś się delektował właśnie zamówioną pizzą!</p>
			</div>
		</div>
		)
	}
}

export default Delivery;