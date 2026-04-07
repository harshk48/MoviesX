import React from 'react'
import './App.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context.jsx'; // Assuming you have a context file for authentication
import { useState  } from 'react';
const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const setLocalStored = localStorage.setItem('user', JSON.stringify({ email, password }));
const getStoredUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='login'>
        
        <form action="" method="post" >
        <h1 className='login-head'>Login</h1>
        <div className='login-inputs'>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
           </div>
            <Button variant='outlined'onClick={(e)=>{
            e.preventDefault();
            if(email === getStoredUser.email  && password === getStoredUser.password){
                alert('Login Successful')
              
                navigate('/'); 
                login(email); 
               
                
                
            }else{
                alert('invalid INPUT')
                setEmail("")
                setPassword('')
            }
        }}  style={{ backgroundColor: '#a00000', color: '#fff'  , border: 'none'}}>Login</Button>
        </form>
    </div>

  )
}

export default Login