import React, {useEffect } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context.jsx'; // Assuming you have a context file for authentication
import { useState  } from 'react';
const Login = () => {
    const { login  } = useAuth();
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setLocalStored = localStorage.setItem('user', JSON.stringify({ email, password }));
  const getStoredUser = JSON.parse(localStorage.getItem('user'));
const handleLogin = (e) => {
    e.preventDefault();
    
    setLocalStored;
   
            if(email === getStoredUser.email  && password === getStoredUser.password )   {
              login(email); 
              alert('Login Successful')
              navigate('/'); 
            }else {
                alert('Invalid email or password')
            }
          }


  return (
    <div className='login'>
        
        <form action="" method="post"  className='login-form' onSubmit={handleLogin}>
        <h1 className='login-head'>Login</h1>
        <div className='login-inputs'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
           </div> 
           <div>
            
            <span>Don't have an account?</span><Link to="/register">Register</Link>
           </div>
            <Button type='submit' variant='outlined' 
       style={{ backgroundColor: '#a00000', color: '#fff'  , border: 'none'}}>Login</Button>
        </form>
    </div>

  )
}

export default Login