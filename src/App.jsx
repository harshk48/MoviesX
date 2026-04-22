
import React, { useContext } from 'react'
import './App.css'
import Header from '../src/header.jsx'
import {  Route, Routes } from 'react-router-dom';
import Login from './login.jsx';  
import Category from './category.jsx';
import Details from './details.jsx';
import WishList from './wishlist.jsx';
import Register from './register.jsx';
import Home from './home.jsx';
import { AuthContext } from './context.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
 const {user} = useContext(AuthContext)

  return (
    <>
    <div>
<Header/>
 <ToastContainer />
<Routes>
  
   <Route path='/' element={<Home/>} />
  <Route path='/category' element={<Category/>} />
  <Route path='/details' element={<Details/>} />
  <Route path='/Login' element={<Login/>} />
 {user ?<Route path='/wishList' element={<WishList/>} /> : null} 
  <Route path='/register' element={<Register/>} />
</Routes>
    </div>

    
    </>
  )
}

export default App
