import './App.css';

import BG from './images/PizzaBack.jpg';
import Logo from './images/Logo.jpg';
import Main from './components/Main.js';

import {
	BrowserRouter as Router,
	NavLink
} from "react-router-dom";

function App() {

  return (
	<Router basename={process.env.PUBLIC_URL}>
	  <main>
		<div style={{position: 'fixed', top: 15 + '%', left: 100 + 'px', width: 10 + 'em', border: 3 + 'px solid indianRed', backgroundColor: 'beige', textAlign: 'center'}}>
		<img src={Logo} alt="Friendly logo" style={{borderRadius: 50 + '%', width: 8 + 'em'}} />
		<nav>
			<NavLink to="/" exact>Strona główna</NavLink><br />
			<NavLink to="/newOrder">Zamów pizzę</NavLink><br />
			<NavLink to="/locations">Lokalizacja</NavLink><br />
		</nav>
		</div>
		<div style={{minHeight: 100 + 'vh',backgroundImage: `url(${BG})`, backgroundAttachment: 'fixed', backgroundSize: "cover", textAlign: "center"}}>
		<link rel="stylesheet" href="https://bootswatch.com/5/sketchy/bootstrap.min.css" />
		<Main />
		</div>
	  </main>
	 </Router>
  );
}

export default App;
