import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
	createUserWithEmailAndPassword,
	updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase.js';

import Customer from '../../images/Happy.jpg';
import './Register.css';

interface RegisterProps {
	registerUsername: (username: string) => void;
}

function Register({ registerUsername }: RegisterProps) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [emailTaken, setEmailTaken] = useState(false);
	const [password, setPassword] = useState('');
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [invalidPassword, setInvalidPassword] = useState(false);

	const navigate = useNavigate();

	const validate = () => {
		const validEmail = RegExp(/^[\w\d]+(?:(?:\.|\+|-)[\w\d]+)*@[\w]+(?:\.\w+)+$/).test(email);
		const validPassword = password.length >= 6;
		setInvalidPassword(!validPassword);
		setInvalidEmail(!validEmail);

		return validEmail && validPassword;
	}

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		switch (event.target.id) {
			case "email":
				setEmail(event.target.value);
				setInvalidEmail(false);
				setEmailTaken(false);
				break;
			case "username":
				setUsername(event.target.value);
				break;
			case "password":
				setPassword(event.target.value);
				setInvalidPassword(false);
				break;
			default:
				console.error("Something went wrong... Invalid input!")
		}
	}

	const onClick = () => {
		if (validate()) {
			createUserWithEmailAndPassword(auth, email, password)
				.then(() => {
					updateProfile(auth.currentUser!, { displayName: username })
						.catch((error: any) => console.error(error.message));
					registerUsername(username);
					navigate('/');
				})
				.catch((error: any) => {
					console.error(error?.message ?? 'Unknown error');
					if (error?.code === 'auth/email-already-exists') {
						setEmailTaken(true);
					}
				});
		}
	}

	return (
		<div className='register section'>
			<div className='app-card'>
				<img src={Customer} alt='Happy Customer' />
				<h1>Join us!</h1>
				<p>You will gain an ability to log in and looking through your guilty pleasures history, including current one!</p>
				<p>Due to unserious nature of the page and no real protections, we recommend not using strong passwords, nor currently used ones!</p>
				<p>In truth, you won't even need to confirm your email address to log in!</p>
				<p>Though due to authenticator provider policies, password still needs at least 6 characters.</p>
				<div className='register-form'>
					<label htmlFor="email">E-email Address: </label>
					<input id="email" name="email" onChange={onChange} value={email} type='text' />
					{invalidEmail ? <p className='input-error'>This does not seem like an email...</p> : ''}
					{emailTaken ? <p className='input-error'>Email is already in use!</p> : ''}
					<label htmlFor="username">Username: </label>
					<input id="username" name="username" onChange={onChange} value={username} type='text' />
					<label htmlFor="password">Password: </label>
					<input id="password" name="password" onChange={onChange} value={password} type='password' />
					{invalidPassword ? <p className='input-error'>The password needs at least 6 characters!</p> : ''}
				</div>
				<div className="register-button">
					<button className="btn btn-dark" onClick={onClick}>Register</button>
				</div>
			</div>
		</div>
	);
}

export default Register;