import Modifier from './Modifier.js';
import Pizza from './Pizza.js';

const PizzaItem = (props) => (
		<li key={props.key}>
			<Pizza 
				name={props.pizza.name}
				ing={props.pizza.ingredients}
			/>
			<ul>
				<Modifier
					key={props.pizza.id}
					data={props.pizza.list}
				/>
			</ul>
		</li>
)


export default PizzaItem;