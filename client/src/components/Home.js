import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productAlt from "./products/productAlt.png";
import AddProduct from "./products/AddProduct";
import {CiLocationOn} from "react-icons/ci"


const Home = ({user}) => {
   const [products, setProducts] = useState([])
   
   useEffect(()=>{
    fetch("/products")
    .then((response)=> response.json() )
    .then((products)=>{
       setProducts(products)
       console.log("Products ", products)
    })
   },[]);

    return (
      <>
      <h1>Products</h1>

      <AddProduct user={user} />

      <div className="container-fluid">
        <div className="row m-auto">
          {
          products.length>0?
          products.map((product)=>(
            <Product key={product.id} product={product} />
          ))
          :
          <div className="alert alert-warning text-center mx-auto">No products at the moment!</div>
          }
          
        </div>
      </div>
      </>
    )
  };


  const Product = ({product}) => 
  {
    const navigate = useNavigate()
  
    return (
      <>
      <div className="col-md-4 p-2 mb-2 card">
        <div className="d-flex align-items-center justify-content-center">
                  <img src={productAlt} alt="Loading"  className="image-fluid w-75" />
        </div>
        <h6>{product.name}</h6>
        <h6><CiLocationOn/> {product.location}</h6>
        <button className="btn btn-primary" onClick={()=>navigate(`/products/${product.id}`)} >
          View Product
        </button>
      </div>
      </>
    )
  };
  
  export default Home;