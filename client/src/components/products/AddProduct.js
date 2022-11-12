import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = ({user}) => {
    const [location, setLocation] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);


    function handleAddProduct(e) {
        e.preventDefault();
        const user_id = user.id
        const inputs =  {name, description, location}
        
        console.log(inputs)

        setErrors([]);
        setIsLoading(true);
    
        fetch("/api/products", {
        method: "POST",
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
                 setLocation(""); setName(""); setDescription("")
                  toast.success("Product save successfully")
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
      <div className="bg-light my-2 p-3 text-right">
        <button disabled={!user} title={!user && "Login to add product"} className="btn btn-outline-success" data-toggle="modal" data-target="#addProductModal">Add a product</button>
      </div>

        <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addProductModalLabel">Add Product you want to sell</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

              <div className="alert">
                {errors && errors.map((err) => (
                  <div className="text-danger" key={err}>{err}</div>
                ))}
              </div>
              <ToastContainer/>
              <form onSubmit={handleAddProduct}>
                  <div className="form-group">
                    <label>Product Name</label>
                    <input className="form-control" type="text" autoComplete="off"
                       value={name || "" } onChange={(e)=>setName(e.target.value)}  />
                  </div>

                  <div className="form-group">
                    <label>Product Description</label>
                    <textarea className="form-control" type="text" autoComplete="off"
                       value={description || "" } onChange={(e)=>setDescription(e.target.value)}  />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input className="form-control" type="text" autoComplete="off"
                       name="location" value={location || "" } 
                       onChange={(e)=>setLocation(e.target.value)}  />
                  </div>         

                  <div className="form-group">
                    <div className="text-right">
                        <button className="btn btn-outline-success px-5" type="submit">
                            {
                            isLoading?
                            <div className="spinner-border p-0 m-0" role="status">
                            </div> : "Post"
                            }
                        </button>
                    </div>
                  </div> 
              </form>
               
               
              </div>
              
            </div>
          </div>
        </div>
  
      </>
    )
  };
  
  export default AddProduct;