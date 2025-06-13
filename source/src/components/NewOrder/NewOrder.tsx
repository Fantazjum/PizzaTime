import { useState } from 'react';

import OrderItem from '../OrderItem/OrderItem';
import IngredientSelect from '../IngredientSelect/IngredientSelect'
import PizzaSelect from '../PizzaSelect/PizzaSelect';
import Pizza from '../Models/Pizza';

import PizzaPicture from '../../images/Pizza.jpg';
import DeliveryPicture from '../../images/Delivery.png';
import Order from '../Models/Order';
import './NewOrder.css';

interface NewOrderProps {
	onAccept: (newOrder: Order) => void;
};

function NewOrder({ onAccept }: NewOrderProps) {
	const availableIngredients = pizzas.reduce((ingredientCollection, pizza) => {
		pizza.ingredients.forEach((ingredient) => ingredientCollection.add(ingredient));
		return ingredientCollection;
	}, new Set<string>());

	const [pizza, setPizza] = useState(pizzas[0]);
	const [order, setOrder] = useState<Order>({ pizzas: [] });
	const [disable, setDisable] = useState(false);

	const additionalModifiers = pizza.modifiers?.filter((modifier) => modifier.type === 'Additional') ?? [];
	const removedModifiers = pizza.modifiers?.filter((modifier) => modifier.type === 'Without') ?? [];

	const ingredientsLeft = pizza.ingredients
		.filter((ingredient) => removedModifiers.length === 0
			|| !removedModifiers.some((modifier) => modifier.ingredient === ingredient)
		);

	const ingredientsToAdd = Array.from(availableIngredients)
		.filter((ingredient) => additionalModifiers.length === 0
			|| !additionalModifiers.some((modifier) => modifier.ingredient === ingredient)
		);

	const onSelect = (selectedPizzaIndex: number) => {
		const idx = selectedPizzaIndex;
		setPizza({ ...pizzas[idx] });
	};

	const changeCount = (type: string, idx: number, number: number) => {
		const newPizzaState = { ...pizza };
		const currentModifierList = type === 'Additional' ? additionalModifiers : removedModifiers;
		const currentModifier = currentModifierList[idx];
		currentModifier.count = number;
		setPizza(newPizzaState);
	};

	const onIngredientSelect = (type: string, value: string, idx: number) => {
		if (idx === (pizza.modifiers?.length ?? 0)) {
			const modifiers = pizza.modifiers ?? [];
			const modifier = { type, ingredient: value, count: type === 'Additional' ? 1 : 0 };
			const newPizza = { ...pizza, modifiers: [...modifiers, modifier] };
			setPizza(newPizza);
		} else if (value === '') {
			const currentModifiers = type === 'Additional' ? additionalModifiers : removedModifiers;
			const currentModifier = currentModifiers[idx];
			const modifiers = pizza.modifiers!.filter((modifier) => modifier !== currentModifier);
			const newPizza = { ...pizza, modifiers };
			setPizza(newPizza);
		} else {
			const currentModifiers = type === 'Additional' ? additionalModifiers : removedModifiers;
			const currentModifier = currentModifiers[idx];
			currentModifier.ingredient = value;
			currentModifier.count = 1;
			const newPizza = { ...pizza };
			setPizza(newPizza);
		}
	}

	const onClick = () => {
		const ord: Order = { pizzas: [...order.pizzas, pizza] };
		setOrder(ord);
	}

	const finalize = () => {
		if (order.pizzas.length === 0) {
			return;
		}

		setDisable(true);
		onAccept(order);
		setTimeout(() => { setDisable(false); }, 60000);
	}

	const additionalSelectors = additionalModifiers.map((modifier, idx) => {
		const currentOptions = [modifier.ingredient, ...ingredientsToAdd];
		return <IngredientSelect key={modifier.ingredient} options={currentOptions} onSelect={onIngredientSelect}
			index={idx} type='Additional' onCountChange={changeCount} selected={modifier.ingredient} />
	});
	const removeSelectors = removedModifiers.map((modifier, idx) => {
		const currentOptions = [modifier.ingredient, ...ingredientsLeft];
		return <IngredientSelect key={modifier.ingredient} options={currentOptions} onSelect={onIngredientSelect}
			stable={true} index={idx} type='Without' onCountChange={changeCount} selected={modifier.ingredient} />
	});

	if (ingredientsToAdd.length) {
		additionalSelectors.push(
			<IngredientSelect key={pizza.modifiers?.length ?? 0} options={ingredientsToAdd}
				onSelect={onIngredientSelect} index={pizza.modifiers?.length ?? 0} type='Additional'
				onCountChange={changeCount} />
		);
	}

	if (ingredientsLeft.length) {
		removeSelectors.push(
			<IngredientSelect key={pizza.modifiers?.length ?? 0} options={ingredientsLeft}
				onSelect={onIngredientSelect} stable={true} index={pizza.modifiers?.length ?? 0}
				type='Without' onCountChange={changeCount} />
		);
	}

	return (
		<div className='section new-order' style={{ backgroundImage: `url(${DeliveryPicture})` }}>
			<div className='app-card '>
				<img src={PizzaPicture} alt='PizzaBanner' />
				<div className='order-display'>
					<h2>Current order:</h2>
					<OrderItem pizzas={order.pizzas} />
				</div>
				<h3>Choose pizza:</h3>
				<PizzaSelect options={pizzas} onSelect={onSelect} />
				<p className="text-success pizza">{pizza.name}</p>
				<p className="text-muted">{pizza.ingredients.join(', ')}</p>
				<h3>Pizza modification:</h3>
				<h4>Add ingredient:</h4>
				<div className="select-column">
					{additionalSelectors}
				</div>
				<h4>Remove ingredient:</h4>
				<div className="select-column">
					{removeSelectors}
				</div>
				<button disabled={disable} className="btn btn-success btn-order" onClick={onClick}>Add to order</button>
				<br />
				<button disabled={disable || order.pizzas.length === 0} className="btn btn-danger"
					onClick={finalize}>
					Order
				</button>
			</div>
		</div>
	);
}

const pizzas: Pizza[] = [
	{ name: "Margharita", ingredients: ["Cheese"] },
	{ name: "Vegetarian", ingredients: ["Cheese", "Celery", "Olives", "Corn", "Mushrooms", "Pepper", "Onion"] },
	{ name: "Diablo", ingredients: ["Chilli sauce", "Cheese", "Garlic", "Tomato", "Onion", "Salami"] },
	{ name: "Hawaian", ingredients: ["Cheese", "Ham", "Pineapple"] },
	{ name: "Custom", ingredients: [] }
];

export default NewOrder;