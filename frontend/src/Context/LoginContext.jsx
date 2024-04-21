import { createContext, useState } from "react";

const LoginContext = createContext(null);

export const LoginContextProvider = ({children}) => {

    const [value, setValue] = useState({
        action: "Sign Up",
        isLoggedIn: false
    });

    const changeAction = (action) => {
        setValue({
            ...value,
            action: action
        });
    }

    const setIsLoggedIn = (isLoggedIn) =>{
        setValue({
            ...value,
            isLoggedIn: isLoggedIn
        })
    }

  return (
    <LoginContext.Provider value={{value, changeAction, setIsLoggedIn}}>{children}</LoginContext.Provider>
  )
}

export default LoginContext