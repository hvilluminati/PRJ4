import React, { useState } from 'react';
import { BiUser } from "react-icons/bi";
import { BiLockAlt } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import {postLogin} from '../axioscalls';

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const nav = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.clear();
        console.log(email, password)
        postLogin(email, password).then((e) =>{
            if (e){ localStorage.setItem('jwt', e.data.jwt); console.log(e)}
            if(localStorage.getItem('jwt')) nav('/')
            
        })
    }

	return (
        <>
		<div  id='hej'>
           <Link to='/'>
                    <button className='button button1'>
                        <span>Home</span>
                    </button>{' '}
            </Link>
            <div id="idk">   
                <div className='LoginContainer'>
                    <div className="title">Admin Login</div>
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email'/>
                            <div className="icon"><BiUser /></div>
                        </div>
                        <div className="input-field">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'/>
                            <i className="icon"><BiLockAlt /></i>
                        </div>
                        <button className="login-button" type='submit'> Log in</button>



                    </form>
                 </div>	
            </div>
			</div>
		</>
	);
};

export default Login;
