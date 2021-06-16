import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase.js';

import Customer from '../images/Happy.jpg';

class NewUser extends Component {
	
	state = {
		userName: "",
		password: "",
		mail: "",
		redirect: false
	}
	
	onChange = (event) => {
		switch(event.target.id) {
		case "mail":
			this.setState({ mail: event.target.value });
			break;
		case "user":
			this.setState({	userName: event.target.value });
			break;
		case "pass":
			this.setState({	password: event.target.value });
			break;
		default:
			console.log("Zaszła pewna niespójność...")
		}
	}
	
	onClick = (event) => {
		auth.createUserWithEmailAndPassword(this.state.mail, this.state.password)
		.then(() => {
			auth.signInWithEmailAndPassword(this.state.mail, this.state.password)
			.then(loggedUser => {
				loggedUser.user.updateProfile({ displayName: this.state.userName })
			})
			.catch(error => {console.log(error.message);});
			this.setState({redirect: true});
		})
		.catch(error => {console.log(error.message);})
	}
		
	render() {
		if(this.state.redirect) return <Redirect to='/' />;
		return(
		<div style={{display: 'flex', justifyContent: "center", height: 120 + '%'}}>
			<div style={{border: 3 + 'px Solid', backgroundColor: 'AntiqueWhite', width: 50 + '%'}}>
				<img src={Customer} style={{width: 100 + '%', height: 75 + '%'}} alt='Happy Customer'/>
				<h1>Dolacz do nas!</h1>
				<p>Uzyskasz możliwość logowania i przeglądania swojej historii łakomstwa, włącznie z dotychczasową!<br/>
				Ze względu na niepoważną naturę strony niepolecamy stosowania poważnych haseł!</p>
				<div style={{ width: 75 + '%', display: 'grid', gridTemplateColumns: '1fr 2fr', float: 'left'}}>
					<label htmlFor="mail">Adres E-Mail: </label>
					<input id="mail" name="mail" onChange={this.onChange} value={this.mail} type='text'  />
					<label htmlFor="user">Użytkownik: </label>
					<input id="user" name="user" onChange={this.onChange} value={this.userName} type='text'  />
					<label htmlFor="pass">Hasło: </label>
					<input id="pass" name="pass" onChange={this.onChange} value={this.password} type='password' />
				</div>
					<button className="btn btn-light" onClick={this.onClick}>Zarejestruj</button>
			</div>
		</div>
		)
	}
}

export default NewUser;