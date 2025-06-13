import './App.css';

import BG from './images/PizzaBack.jpg';
import Logo from './images/Logo.jpg';
import Main from './components/Main';

import {
	BrowserRouter as Router,
	NavLink
} from "react-router";

function App() {

	return (
		<Router basename='/PizzaTime'>
			<main>
				<div className='navigation'>
					<img src={Logo} alt="Friendly logo" />
					<nav>
						<NavLink to="/">Home</NavLink><br />
						<NavLink to="/newOrder">Order Pizza</NavLink><br />
						<NavLink to="/locations">Location</NavLink><br />
					</nav>
				</div>
				<div className='background' style={{ backgroundImage: `url(${BG})` }}>
					<link rel="stylesheet" href="https://bootswatch.com/5/sketchy/bootstrap.min.css" />
					<Main />
				</div>
			</main>
		</Router>
	);
}

export default App;
