
import DeliveryImage from '../../images/Delivery.png';
import InProgress from '../../images/DeliveryIn.png';
import './Delivery.css';

function Delivery() {

	return (
		<div className='section delivery' style={{ backgroundImage: `url(${DeliveryImage})` }}>
			<div className='app-card'>
				<img src={InProgress} alt='HappyPizzeriaBanner' />
				<h1>Order received!</h1>
				<p>Imagine you are enjoying the freshly baked ordered pizza!</p>
			</div>
		</div>
	);
}

export default Delivery;