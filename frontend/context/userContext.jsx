import { createContext, useState } from "react";


export const userContext = createContext({})


const UserContextProvider = ({children})=>{
    const [userInfo,setUserinfo] = useState({}) //global stare
    return (
        <userContext.Provider value={{userInfo,setUserinfo}}>
            {children}
        </userContext.Provider>
    )
}


export default UserContextProvider