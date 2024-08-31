import { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, setUserinfo } = useContext(userContext);
  const navigate = useNavigate();

  // useEffect(()=>{
    
  // },[userInfo])

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      alert("logged in");
      setUserinfo(result);
      setUsername("");
      setPassword("");
      navigate("/");
    }

    if (!response.ok) {
      alert(result.error);
      setUsername("");
      setPassword("");
    }
  };


  // if(userInfo)navigate("/")
  


  return (
    <form className="login" onSubmit={handleLogin}>
      <h1>Login</h1>
      
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

      <button>Login</button>
    </form>
  );
};

export default Login;
