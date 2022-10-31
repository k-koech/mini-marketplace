import React, { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import auth from "./auth/auth.png"
import "./css/Auth.css"

function Auth({ onLogin }) 
{
  const [toggle, setToggle] = useState(true)
  
  return (
    <div className="row auth ">
        <div className="col-md-6 px-0  d-flex align-items-center justify-content-center">
               <img src={auth} />
        </div>

        <div className="col-md-6  d-flex align-items-center justify-content-center">
            <div>
            <div className="text-center">
                <button className="btn btn-outline-dark" onClick={ () => setToggle(!toggle) }>
                 {toggle?"Login":"Register"}
                </button>
            </div>
           
            <hr/>
            {
                toggle ?
                <Register onLogin={onLogin} />
                :
                <Login onLogin={onLogin} />
            }
            </div>        
        </div>
    </div>
  );
}

export default Auth;
