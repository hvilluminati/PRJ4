import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { BiLockAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../axioscalls';

const Login = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const nav = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		localStorage.clear();
		console.log(email, password);
		postLogin(email, password).then((e) => {
			if (e) {
				localStorage.setItem('jwt', e.data.jwt);
				console.log(e);
			}
			if (localStorage.getItem('jwt')) nav('/');
		});
	};

	return (
		<>
			<div id='hej'>
				<Link to='/'>
					<button className='button button1'>
						<span>Home</span>
					</button>{' '}
				</Link>
				<div id='idk'>
					<div className='LoginContainer'>
						<div className='title'>Admin Login</div>
						<form className='loginForm' onSubmit={handleSubmit}>
							<div className='input-field'>
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									type='email'
									placeholder='Email'
									className='ClaraIsADummy'
								/>
								<div className='icon'>
									<BiUser />
								</div>
							</div>
							<div className='input-field'>
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type='password'
									placeholder='Password'
									className='ClaraIsADummy'
								/>
								<i className='icon'>
									<BiLockAlt />
								</i>
							</div>
							<button className='button2 login-button' type='submit'>
								{' '}
								Log in
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
