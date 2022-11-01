import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Outlet } from 'react-router-dom';


function Login({ onLogin }) {
  const navigate = useNavigate();
  const notify = () => toast("Wow so easy!");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  const handleLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username,password}),
    })
    .then((r) => {
      setIsLoading(false);
      if (r.ok) 
      {
        r.json().then((response) => {
          if(r.errors){
            setErrors(response.errors)
          }
          else
          {
            console.log("success", response.user)
            onLogin(response.user)
            toast.success("Logged in successfully")
            setTimeout(() => { 
              navigate(`/`)
            }, 3000)
            
          }
        });
      } 
      else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
    <div>
      <h4 className="text-center mt-5 mb-2">Login</h4>
      <div className="alert">
          {errors.map((err) => (
            <div className="text-danger" key={err}>{err}</div>
          ))}
        </div>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input className="form-control" type="text" autoComplete="off"
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>      
        <div className="form-group">
          <div className="text-right"><button className="btn btn-outline-success px-5" type="submit">{isLoading ? "Loading..." : "Login"}</button></div>
        </div> 
      </form>

      <ToastContainer/>
    </div>    
   </>
  );
}

export default Login;
