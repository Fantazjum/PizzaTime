
import './About.css';
import HP from '../../images/HappyPizza.jpg';

function About() {
	return (
		<div className='section'>
			<div className='about-content'>
				<img src={HP} className='banner' alt='Happy pizzeria banner' />
				<h1>Happy pizzeria</h1>
				<p>In happy pizzeria  we let people order a pizza with no risk of putting on weight!</p>
				<p>Try today and oder a pizza of your dreams!</p>
			</div>
		</div>
	);
}

export default About;