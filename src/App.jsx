
import React from 'react'
import './App.css'
import Header from '../src/header.jsx'
import {  Route, Routes } from 'react-router-dom';
import Login from './login.jsx';  
import Home from './home.jsx';
import Details from './details.jsx';
import WishList from './wishlist.jsx';
import Register from './register.jsx';
function App() {
 

  return (
    <>
    <div>
<Header/>
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/details' element={<Details/>} />
  <Route path='/Login' element={<Login/>} />
  <Route path='/wishList' element={<WishList/>} />
  <Route path='/register' element={<Register/>} />
</Routes>
    </div>

    
    </>
  )
}

export default App
