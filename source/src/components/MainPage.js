import React, { Component } from 'react';

import HP from '../images/HappyPizza.jpg';

class MainPage extends Component {
	
	render() {
		
		return(
		<div style={{display: 'flex', justifyContent: "center", height: 120 + '%'}}>
			<div style={{border: 3 + 'px Solid', backgroundColor: 'AntiqueWhite', width: 50 + '%'}}>
				<img src={HP} style={{width: 100 + '%', height: 50 + '%'}} alt='Happy pizzeria banner'/>
				<h1>Szczesliwa pizzeria</h1>
				<p>W szczęśliwej pizzerii pozwalamy ludziom zamawiać pizzę, bez groźby przytycia!<br />
				Spróbuj dzisiaj i zamów pizzę swoich marzeń!</p>
			</div>
		</div>
		)
	}
}

export default MainPage;