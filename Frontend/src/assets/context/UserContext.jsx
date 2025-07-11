import { createContext,useState } from "react";
import React from 'react'
export  const UserDataContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState({
        email: '', 
        fullName:{
            firstName:'',
            lastname:''
        } });
  return (
    <div>
        <UserDataContext.Provider value={{user,setUser}}>
            {children}
        </UserDataContext.Provider>
      
    </div>
  )
}

export default UserContext
