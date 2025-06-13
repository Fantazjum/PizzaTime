
import LocationPicture from '../../images/Tables.jpg';
import './Location.css';

function Location() {

	const locals = ["Never Land", "Hallownest", "Eberron", "Deponia", "Atlantis", "Lordran"];
	const places = locals.map(it => (<li key={it}>{it}</li>));

	return (
		<div className='section location'>
			<div className='app-card'>
				<img src={LocationPicture} alt='HappyPizzeriaBanner' />
				<h1>Happy pizzeria</h1>
				<p>We have locals in many places, most of them imaginary!</p>
				<p className="text-info">Here are some of them:</p>
				<ul className='places-list'>
					{places}
				</ul>
			</div>
		</div>
	);
}

export default Location;