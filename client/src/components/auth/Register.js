import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e)=> 
  {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username,password, phone}),
    },{withCredentials: true})
    .then((r) => {
      setIsLoading(false);
      if (r.ok) 
      {
        r.json().then((user) => {
          if(user.errors){
            setErrors(user.errors)
          }
          else{
            console.log("success", user)
            toast.success("User saved successfully!!")
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
    <h4 className="text-center mt-5 mb-2 ">Register Account</h4>
      <div className="alert">
          {errors.map((err) => (
            <div className="text-danger" key={err}>{err}</div>
          ))}
        </div>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username</label>
          <input className="form-control" type="text" autoComplete="off"
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input className="form-control" type="text" autoComplete="off"
            value={phone} onChange={(e) => setPhone(e.target.value)}
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
          <label>Password Confirmation</label>
          <input className="form-control" type="password" 
            value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="none"
          />
          {passwordConfirmation!=password?
          <small class="form-text text-danger">Password doesn't match!</small>:""
          }

        </div>

        <div className="form-group">
          <div className="text-right">
            <button disabled={passwordConfirmation!=password} className="btn btn-outline-success px-5" type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
          </div>
        </div> 
      </form>
      <ToastContainer/>

   </>
  );
}

export default Register;
