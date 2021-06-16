import React, { useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { auth } from '../firebase.js';

const LogPanel = (props) => {

	const [pass, passField] = useState("");
	const [mail, mailField] = useState("");
	const [redirect, setRedirect] = useState(false);
	
	const onChange = (event) => {
		switch(event.target.id){
		case "mail":
			mailField(event.target.value);
			break;
		case "pass":
			passField(event.target.value);
			break;
		default:
			console.log("Zaszła pewna niespójność...")
		}
	}
	
	const onClick = (event) => {
		if(!props.logged)  auth.signInWithEmailAndPassword(mail, pass).then( () => {
			auth.signInWithEmailAndPassword(mail, pass).then( () => {
			}).catch(error => {
				console.log(error.message);
			})
			setRedirect(true);
			setTimeout( ()=> setRedirect(false), 10);
		})
		else 
		{
			props.logout();
			auth.signOut();
			setRedirect(true);
			setTimeout( ()=> setRedirect(false), 10);
		}
		mailField("");
		passField("");
	}
	
	let inside = props.logged ? (<><h2>Witaj {props.usr}!</h2>
		<NavLink to="/history">Historia zamówień</NavLink>
		<NavLink to="/" className="btn btn-light" onClick={onClick}>Wyloguj</NavLink></>) : (
		<div style={{ width: 75 + '%', display: 'grid', gridTemplateColumns: '12ch auto'}}>
			<label htmlFor="mail">Adres Email: </label>
			<input id="mail" name="mail" onChange={onChange} value={mail} type='text'  />
			<label htmlFor="pass">Hasło: </label>
			<input id="pass" name="pass" onChange={onChange} value={pass} type='password' />
			<NavLink to='/' className="btn btn-light" onClick={onClick}>Zaloguj</NavLink>
			<NavLink className="btn btn-light" to='/register'>Zarejestruj się</NavLink>
		</div>
	)
	
	if(redirect) return <Redirect to='/' />;

	return (
		<div style={{position: 'fixed', top: 15 + '%', right: 15 + 'px', width: 18 + 'em', border: 3 + 'px solid indianRed', backgroundColor: 'beige', textAlign: 'center'}}>
			{inside}
		</div>
	)
}

export default LogPanel;