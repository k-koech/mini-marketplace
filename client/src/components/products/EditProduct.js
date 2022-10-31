import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/EditProduct.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productAlt from "./productAlt.png";
import { useNavigate } from "react-router-dom";

const EditProduct = () => 
{
  const navigate = useNavigate()

  const parameters = useParams()
  const [product, setProduct] = useState()

  console.log(parameters.id)

  useEffect(()=>
  {
    fetch(`/products/${parameters.id}`)
    .then((response)=> response.json() )
    .then((product)=>{
       setProduct(product)
       console.log("Products ", product)
    })
   },[]);

   const id = parameters.id

   const deleteProduct = ({id = parameters.id}) =>{
		fetch(`/products/${id}`,{
			method: "DELETE"
		})
		.then(res=>{
      console.log("xxx",res)
			if(res.ok){

				toast('Product deleted')
        navigate('/')
				
			}
			else{
        console.log("ERRORS")
				toast('Somethingxxxxx went wrong with your request')
			}
		})
	}

  
    return (
      <>
      <div className="container-fluid card">

      <div className="jumbotron row">
        <div className="col-md-4 bg-white rounded d-flex justify-content-center align-items-center">
           <img src={productAlt} className="image-fluid w-75"/>
        </div>
        <div className="col-md-8">
            <div className="text-right">
               <button onClick={deleteProduct} className="btn border-none text-danger">Delete product</button>
            </div>
            <hr/>
            <hr className="my-4"/>
            <h4>{product && product.name}</h4>
            <p className="lead">{product && product.description}</p>
            
            <a className="btn btn-primary btn-lg" href="#" role="button">Edit</a>
        </div>
      </div>
      </div>
      </>
    )
  };
  
  export default EditProduct;