import { useState } from 'react';
import './IngredientSelect.css';

interface IngredientSelectProps {
	type: string;
	index: number;
	options: string[];
	onCountChange: (type: string, value: number, index: number) => void;
	onSelect: (type: string, value: string, index: number) => void;
	selected?: string;
	stable?: boolean;
};

function IngredientSelect({ index, onCountChange, onSelect, options, selected, stable, type }: IngredientSelectProps) {
	const ingredientOptions = [
		<option key={'null'} value=''>---- Choose ingredient ----</option>,
		...options.map((it, idx) => (
			<option key={idx}>
				{it}
			</option>
		))
	];

	const [value, setValue] = useState(selected ?? '');
	const [number, setNumber] = useState(1);

	const disabled = options.length < 1;

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const currentValue = event.target.value;
		onSelect(type, currentValue, index);
		setValue(currentValue);
		setNumber(1);
	}

	const onPlus = () => {
		if (number === 9) {
			return;
		}

		const num = number + 1;
		setNumber(num);
		onCountChange(type, index, num);
	}

	const onMinus = () => {
		if (number === 1) {
			return;
		}

		const num = number - 1;
		setNumber(num);
		onCountChange(type, index, num);
	}

	const manip = value === '' || stable ? '' : <>
		<input className="form-control" readOnly value={number} style={{ width: 50 + 'px' }} />
		<button className='btn btn-warning' onClick={onPlus} disabled={number === 9}>+</button>
		<button className='btn btn-warning' onClick={onMinus} disabled={number === 1}>-</button>
	</>;

	return (
		<div className='select-wrapper'>
			<select className="form=select ingredient-select" onChange={onChange} disabled={disabled} value={value}>
				{ingredientOptions}
			</select>
			{manip}
		</div>
	);
}

export default IngredientSelect;