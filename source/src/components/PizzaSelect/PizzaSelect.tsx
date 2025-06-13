import Pizza from "../Models/Pizza";
import './PizzaSelect.css';

interface PizzaSelectProps {
	onSelect: (index: number) => void;
	options: Pizza[];
};

const PizzaSelect = ({ onSelect, options }: PizzaSelectProps) => {
	const pizzaOptions = options.map((pizza, idx) => (
		<option key={idx}>
			{pizza.name}
		</option>
	));

	const selectCallback = (event: React.ChangeEvent<HTMLSelectElement>) =>
		onSelect(event.target.options.selectedIndex);

	return (
		<select className="form=select pizza-select" onChange={selectCallback}>
			{pizzaOptions}
		</select>
	)
}

export default PizzaSelect;