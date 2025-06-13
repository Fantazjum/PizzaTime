
import OrderItem from '../OrderItem/OrderItem';
import Order from '../Models/Order';
import './History.css';

import HistoryImage from '../../images/History.jpg';

interface HistoryProps {
	history: Order[];
	time: string[];
};

function History({ history, time }: HistoryProps) {
	const hist = history.map((order, idx) => {
		return (
			<tr className="table-light" key={idx}>
				<td>
					<OrderItem pizzas={order.pizzas} />
				</td>
				<td>
					{time[idx]}
				</td>
			</tr>
		);
	});

	return (
		<div className='section history'>
			<div className='app-card'>
				<div>
					<img src={HistoryImage} alt='AHA' />
					<p className="lead">
						So you want to remember which pizzas have you ordered until now? <br />
						MAGNIFICENT!
					</p>
				</div>
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Order</th>
							<th>Order time</th>
						</tr>
					</thead>
					<tbody>
						{hist}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default History;