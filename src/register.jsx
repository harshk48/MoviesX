import React from 'react'
import './App.css'
const Register = () => {
  return (
    <div>
      <form action="" method="post" className='login-form'>
    <h1 className='login-head'>Register Your Account</h1>
    <label htmlFor="email">Email</label>
    <input type="text" id="email" placeholder='Enter your email' />
    <label htmlFor="password">Password</label>
    <input type="password" id="password" placeholder='Enter your password' />
    <button type='submit'>Register</button>
</form>


    </div>
  )
}

export default Register