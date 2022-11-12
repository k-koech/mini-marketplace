import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/EditProduct.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productAlt from "./productAlt.png";
import { useNavigate } from "react-router-dom";
import {CiLocationOn} from "react-icons/ci"

const EditProduct = ({user}) => 
{
  const navigate = useNavigate()
  const parameters = useParams()
  const [product, setProduct] = useState()

  // edit
  const [location, setLocation] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

 
  function handleEditProduct(e) {
        e.preventDefault();
        const productId = parameters.id
        const inputs =  {name, description, location}
        
        console.log(inputs)

        setErrors([]);
        setIsLoading(true);

        fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
        })
        .then((r) => 
        {
          setIsLoading(false);
          if (r.ok) 
          {
              r.json().then((response) => {
              if(response.errors){
                  setErrors(response.errors)
              }
              else{
                  toast("Product save successfully")

              }
              });
          } 
          else {
              r.json().then((err) => setErrors(err.errors));
          }
        });
    }
  // end of edit
  useEffect(()=>
  {
    fetch(`/api/products/${parameters.id}`)
    .then((response)=> response.json() )
    .then((product)=>{
       setProduct(product)
       console.log("Products ", product)
    })
   },[]);

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
  // console.log("userProduct ",product.user_id)

  
    return (
      <>
      <div className="container-fluid card">

      <div className="jumbotron row">
        <div className="col-md-4 bg-white rounded d-flex justify-content-center align-items-center">
           <img src={productAlt} className="image-fluid w-75 "/>
        </div>
        <div className="col-md-8">
          <div className="card mb-4 p-3">
            {
              user?
              (user && user.id) == (product && product.user_id)?
                <div className="text-right">
                  <button onClick={deleteProduct} className="btn border-none text-danger">Delete product</button>
                </div>:""
              :""
            }
            <hr/>
            <h4>{product && product.name}</h4>
            <h6><CiLocationOn/> {product && product.location}</h6>
            <p className="lead">{product && product.description}</p>
          </div>    
            
        </div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
      {
    
      (user && user.id) == (product && product.user_id)?
      <div className="card p-3 col-md-8">
            <h5>Update product</h5>
            <form onSubmit={handleEditProduct}>
                  <div className="form-group">
                    <label>Product Name</label>
                    <input className="form-control" type="text" autoComplete="off"
                       value={name || product && product.name } onChange={(e)=>setName(e.target.value)}  />
                  </div>

                  <div className="form-group">
                    <label>Product Description</label>
                    <textarea  className="form-control" type="text" autoComplete="off"
                       value={description || product && product.description } onChange={(e)=>setDescription(e.target.value)}  />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input className="form-control" type="text" autoComplete="off"
                       name="location" value={location || product && product.location } 
                       onChange={(e)=>setLocation(e.target.value)}  />
                  </div>         
                 
                  <div className="form-group">
                    <div className="text-right">
                        <button disabled={!user } className="btn btn-outline-dark px-5" type="submit">
                            {
                            isLoading?
                            <div className="spinner-border p-0 m-0" role="status">
                            </div> : "Save"
                            }
                        </button>
                    </div>
                  </div> 
              </form>
          </div>
          :""
          
        }


          </div>

      </div>
      </>
    )
  };
  
  export default EditProduct;