import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';

import './LoginPanel.css';

interface LoginPanelProps {
	logout: () => void;
	usr?: string | null;
	logged: boolean;
};

function LoginPanel({ logged, logout, usr }: LoginPanelProps) {
	const [password, passField] = useState('');
	const [mail, mailField] = useState('');

	const navigate = useNavigate();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		switch (event.target.id) {
			case "mail":
				mailField(event.target.value);
				break;
			case "password":
				passField(event.target.value);
				break;
			default:
				console.error("Something went wrong... Invalid input!")
		}
	}

	const onClick = () => {
		if (!logged) {
			signInWithEmailAndPassword(auth, mail, password)
				.catch((error: any) => console.error(error.message))
				.finally(() => navigate('/'));
		} else {
			logout();
			setTimeout(() => auth.signOut(), 10);
			navigate('/');
		}

		mailField('');
		passField('');
	}

	const valid = mail.length && password.length;

	const content = logged ? (
		<>
			<h2>Welcome {usr}!</h2>
			<NavLink to="/history" className='link-history'>Order history</NavLink>
			<NavLink to="/" className="btn btn-dark" onClick={onClick}>Sign out</NavLink>
		</>
	) : (
		<div className='login-inputs'>
			<label htmlFor="mail">E-mail address: </label>
			<input id="mail" name="mail" onChange={onChange} value={mail} type='text' />
			<label htmlFor="password">Password: </label>
			<input id="password" name="password" onChange={onChange} value={password} type='password' />
			<button className="btn btn-dark" onClick={onClick} disabled={!valid}>Log in</button>
			<NavLink className="btn btn-dark" to='/register'>Register</NavLink>
		</div>
	)

	return (
		<div className='login-panel'>
			{content}
		</div>
	)
}

export default LoginPanel;