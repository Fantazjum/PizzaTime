import PizzaItem from './PizzaItem.js';

const Order = (props) => {
	const pizzas = props.pizzas.map(it => (<>
				<PizzaItem
					key={it.id}
					pizza={it}
				/><br/>
		</>));
		
	return (
			<ul>
			{pizzas}
			</ul>
	)
}

export default Order;