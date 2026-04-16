import React, {useEffect } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context.jsx'; // Assuming you have a context file for authentication
import { useState  } from 'react';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
const Login = () => {
    const { login  } = useAuth();
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setLocalStored = localStorage.setItem('user', JSON.stringify({ email, password }));
  const getStoredUser = JSON.parse(localStorage.getItem('user'));
   const storedData = JSON.parse(localStorage.getItem('Register'));
const handleLogin = (e) => {
    e.preventDefault();
   setLocalStored
    const user = storedData.find(
      (u) => u.username === getStoredUser.email && u.password === getStoredUser.password
);

            if(user)   {
              login(email);
              alert('Login Successful')
              navigate('/');
              getStoredUser
            }else {
              alert('Invalid email or password')
            }

          }


  return (
    <div className='login'>

        <form action="" method="post"  className='login-form' onSubmit={handleLogin}>
        <h1 className='login-head'>Login</h1>
        <div className='login-inputs'>
            <TextField id="standard-basic" label="email" variant="standard" color='error'  value={email} onChange={(e)=>setEmail(e.target.value)} required/>
             <TextField id="standard-basic" label="Password" variant="standard" color='error'  value={password} onChange={(e)=>setPassword(e.target.value)} required/>
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