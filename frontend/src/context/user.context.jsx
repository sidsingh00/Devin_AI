// eslint-disable-next-line no-unused-vars
import React, {createContext,useState, useContext} from 'react'

export const UserContext = createContext();

export const UserProvider = ( children ) =>{
    const [user,setUser] = useState(null);

    return(
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
