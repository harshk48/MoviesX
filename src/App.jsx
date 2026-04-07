
import React from 'react'
import './App.css'
import Header from '../src/header.jsx'
import {  Route, Routes } from 'react-router-dom';
import Login from './login.jsx';  
import Home from './home.jsx';
import Details from './details.jsx';
function App() {
 

  return (
    <>
    <div>
<Header/>
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/details' element={<Details/>} />
  {/* <Route path='/wishList' element={<WishList/>} /> */}
  <Route path='/Login' element={<Login/>} />
</Routes>
    </div>

    
    </>
  )
}

export default App
