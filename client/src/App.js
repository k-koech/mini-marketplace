import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import EditProduct from './components/products/EditProduct';

import {useEffect, useState} from "react"
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);

 
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


  // if (!user) return <Login onLogin={setUser} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Home user={user} />} />
          <Route path="products/:id" element={<EditProduct user={user} />} />

          <Route path="/auth" element={<Auth onLogin={setUser}/>} />
         
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
