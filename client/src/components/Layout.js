import { Outlet, Link } from "react-router-dom";
import {MdBusinessCenter} from "react-icons/md"
import Footer from "./Footer";
import { useEffect } from "react";


const Layout = ({user, setUser}) => 
{

  useEffect(()=>{
    fetch("/loggedin")
    .then((res)=>{
			if(res.ok){
				res.json().then((data)=> {
          setUser(data.user)
        })
      
			}
		})
    
  
  }, [])
  console.log("Logged in? ", user)
  
   function handleLogoutClick() {
    fetch("/logout", {
      method: "DELETE", 
    })  
    .then(response => {
      if(response.ok)
      {
        console.log("logout")
          setUser(null);
      }
    })
    .catch(error => {
      console.log("Logout error", error);
    });
  }

  return (
    <>
    <nav id="navbar-example2" className="navbar navbar-light bg-transparent container">
    
      <Link className="text-success m-3" to="/">
       <MdBusinessCenter size={60} />
      </Link>
      
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        {
          user?
          <>
         <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-expanded="false">
            {user.username}
          </Link>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="#one"></Link>
            <Link className="dropdown-item" to="#two">Profile</Link>
            <div role="separator" className="dropdown-divider"></div>
            <Link className="dropdown-item" to="#three">
            <button className="nav-link" onClick={handleLogoutClick} >Logout</button>
            </Link>
          </div>
        </li>
        </>
         
         :
         <li className="nav-item">
            <Link className="nav-link" to="/auth">Login/Register</Link>
         </li>
        }
        
      </ul>
    </nav>
     
     <div className="container main-container">
            <Outlet />
     </div>

     <Footer/>
    </>
  )
};

export default Layout;