import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e)=> {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    fetch("http://127.0.0.1:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username,password, image_url: imageUrl, bio,}),
    },{withCredentials: true})
    .then((r) => {
      setIsLoading(false);
      if (r.ok) 
      {
        r.json().then((user) => {
          if(user.errors){
            setErrors(user.errors)
            console.log("success", user)
          }
          else{
            console.log("success", user)

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
        </div>

        <div className="form-group">
          <label>Profile Image</label>
          <input className="form-control" type="text"
            autoComplete="none" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea className="form-control" type="text" rows="3"
            autoComplete="none" value={bio} onChange={(e) => setBio(e.target.value)}
          />
        </div>
      
        <div className="form-group">
          <div className="text-right"><button className="btn btn-outline-success px-5" type="submit">{isLoading ? "Loading..." : "Sign Up"}</button></div>
        </div> 
      </form>

   </>
  );
}

export default Register;
