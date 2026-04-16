import React from 'react'
import { createContext , useState  , useContext} from 'react';
import { Navigate } from 'react-router-dom';

 
const AuthContext = createContext();

export const  useAuth = () => useContext(AuthContext);
const ContextProvider = ({children}) => {
 
  const [user, setUser] = useState("");
  const [movieDetails, setMovieDetails] = useState([]);
  const [wishList, setWishList] = useState([]);
  const login = (email) =>{
    setUser(email);
  }
  const logout = () => {
    localStorage.removeItem("user");
    setUser("");
  }

  return (
  
          <AuthContext.Provider  value={{ user, setUser , login, logout , movieDetails, setMovieDetails , wishList, setWishList}}>
        {children}
    </AuthContext.Provider>
        
        
    
  )
}

export default ContextProvider;
export {AuthContext };