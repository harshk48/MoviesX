import React from 'react'
import { createContext , useState  , useContext} from 'react'; 
const AuthContext = createContext();
export const  useAuth = () => useContext(AuthContext);
const ContextProvider = ({children}) => {
  const [user, setUser] = useState("");
  const login = (email) => setUser(email);
  const logout = () => setUser(null);

  return (
  
          <AuthContext.Provider  value={{ user, setUser , login, logout }}>
        {children}
    </AuthContext.Provider>
        
        
    
  )
}

export default ContextProvider;
export {AuthContext}