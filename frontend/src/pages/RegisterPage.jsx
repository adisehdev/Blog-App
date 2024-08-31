import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleRegister = async(e)=>{
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({username,password})
    })

    const result = await response.json()

    if(response.ok){
        alert('Registeration Succesfull')
    }

    if(!response.ok){
        alert(result.error)
    }

    setPassword("")
    setUsername("")
  }





  return (
    <form className="register" onSubmit={handleRegister}>
      <h1>Register</h1>
      
      <input
        type="text"
        placeholder="username"
        id="username-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      
      <input
        type="password"
        placeholder="password"
        id="password-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Register</button>
    </form>
  );
};

export default Register;
