import PizzaItem from '../PizzaItem/PizzaItem';
import Pizza from '../Models/Pizza';

interface OrderItemProps {
	pizzas: Pizza[];
};

function OrderItem({ pizzas }: OrderItemProps) {
	const pizzaItems = pizzas.map((pizza, idx) => (
		<PizzaItem
			key={idx}
			name={pizza.name}
			ingredients={pizza.ingredients}
			list={pizza.modifiers ?? []}
		/>
	));

	return (
		<ul>
			{pizzaItems}
		</ul>
	)
}

export default OrderItem;