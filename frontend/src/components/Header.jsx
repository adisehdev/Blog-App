import { useState,useEffect,useContext } from "react"
import { Link } from "react-router-dom"
import { userContext } from "../../context/userContext"


const Header = ()=>{
  
  
  const {setUserinfo,userInfo} = useContext(userContext)
  const getProfileInfo = async()=>{
    const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/auth/getProfile`,{
      method : 'GET',
      credentials : 'include',
    })

    const result = await response.json()

    if(response.ok){
      console.log("Header info : login/logout ",result)
      setUserinfo(result)
    }

    if(!response.ok){
      console.log("could not get profile info in frontend : ",result)
    }

    
  }

  const handleLogout = async()=>{
    const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/auth/logout`,{
      method : 'POST',
      credentials : 'include'
    })

    const result = await response.json()

    if(response.ok){ //if logout call successfull
      setUserinfo(null)
    }

    
  }

    useEffect(()=>{
      getProfileInfo()
    },[])

    console.log("useinfo : login/logout ",userInfo)

    const username = userInfo?.username

    
    return (
        <header>
        
        <Link to='/' className='logo'>MyBlog</Link>
        <nav>
          {username && (<>
            <Link to='/create'>Create New Post</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </>)}

          {!username && (<>
            <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          </>)}
          
        </nav>
      </header>
    )
}

export default Header