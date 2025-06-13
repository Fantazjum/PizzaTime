import Modifier from '../Models/Modifier';

interface PizzaItemProps {
	name: string;
	list: Modifier[];
	ingredients: string[];
};

function PizzaItem({ ingredients, list, name }: PizzaItemProps) {
	const ingredientsListed = ingredients.join(', ');

	const modifiers = list.map((modifier, index) => {
		const modifierCount = modifier.count > 0 ? ' x ' + modifier.count : '';

		return (
			<li key={index}>
				<p>{modifier.type + ' ' + modifier.ingredient + modifierCount}</p>
			</li>
		);
	});

	return (
		<li>
			<p className="text-success pizza">
				{name}
			</p>
			<p className="text-muted">
				{ingredientsListed}
			</p>
			<ul>
				{modifiers}
			</ul>
		</li>
	);
}

export default PizzaItem;