import React ,{useState} from 'react'
import { Navigate } from 'react-router-dom'
import './App.css'

const Register = () => {

 const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleRegister = (e) => {
  e.preventDefault();
 let existingUsers = [];
  try {
    const storedData = localStorage.getItem('Register');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      // Ensure it's an array
      existingUsers = Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('Error parsing localStorage:', error);
    existingUsers = [];
  }
  // 1. Get existing users (IMPORTANT)

  // 2. Check duplicate user
   const alreadyExists = existingUsers.some((user) => user.username === username);
  
  if (alreadyExists) {
    alert('User already registered ❌');
    setUsername('')
    setPassword('')
    return;
  }

  // 3. Create new user object
 const newUser = { username, password };
  // 4. Add to array
 existingUsers.push(newUser);

  localStorage.setItem('Register', JSON.stringify(existingUsers));
  alert("Registration successful ✅");

  // 6. Clear input fields
  setUsername('');
  setPassword('');
};


  return (
    <div>
      <form action="" method="post" className='login-form' onSubmit={handleRegister}>
    <h1 className='login-head'>Register Your Account</h1>
    <label htmlFor="email">Username</label>
    <input type="text" id="email" placeholder='Enter your email' value={username}  onChange={(e)=>setUsername(e.target.value)}/>
    <label htmlFor="password">Set Password</label>
    <input type="password" id="password" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <button type='submit'>Register</button>
</form>


    </div>
  )
}

export default Register