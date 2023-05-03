import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);

  let { category, product } = useParams();

  useEffect(() => {
    let IsMounted = true;

    axios
      .get(`/api/view-productdetail/` + category + `/` + product)
      .then((res) => {
        if (IsMounted) {
          if (res.data.status === 200) {
            setProduct(res.data.product);
            setLoading(false);
          }
        } else if (res.data.status === 404) {
          navigate("/collections");
          swal("Warning", res.data.message, "error");
        }
      });

    return () => {
      IsMounted = false;
    };
  }, []);

  const handleIncrement = ()=>{
    if( quantity < 10){
      setQuantity(prevCount => prevCount + 1);
    }
    
  }
  const handleDecrement = ()=>{
    if( quantity > 1){
      setQuantity(prevCount => prevCount - 1);
    }
   
  }

  const submitAddToCart = (e)=>{
    e.preventDefault();

    const data = {
      product_id: products.id,
      product_qty:quantity,
      product_name:products.name,
    }

    axios.post(`/api/add-to-cart`, data).then(res => {
      if(res.data.status === 201){
        swal("Success", res.data.message,"success");
      
      }
        //Already Added To Cart...
      else if(res.data.status === 409){
        swal("Success", res.data.message,"success");
      }
      else if(res.data.status === 401){
        swal("Error", res.data.message,"error");
      }
      else if(res.data.status === 404){
        swal("Error", res.data.message,"error");
      }
    });
  }

  if (loading) {
    return <h4>Loding Product Detail...</h4>;
  } else {
    var avail_stock = "";
    if (products.qty > 0) {
      avail_stock = (
        <div>
          <label className="btn-sm btn-success px-4 mt-2">In stock</label>

          <div className="row">
            <div className="col-md-3 mt-3">
              <div className="input-group">
                <button type="button" onClick={handleDecrement} className="input-group-text">
                  -
                </button>
                <div  className="form-control text-center">{quantity}</div>
                <button type="button" onClick={handleIncrement} className="input-group-text">
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button onClick={submitAddToCart} type="button" className="btn btn-primary w-100 ">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      avail_stock = (
        <div>
          <label htmlFor="" className="btn-sm btn-danger px-4 mt-2">
            Out of stock
          </label>
        </div>
      );
    }
  }

  return (
    <div>
      <Navbar />
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>
            Collections / {products.category.name} / {products.name}
          </h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 border-end">
              <img
                src={`http://localhost:8000/${products.image}`}
                alt={products.name}
                className="w-100"
              />
            </div>
            <div className="col-md-8">
              <h4>
                {products.name}
                <span className="float-end badge btn-sm btn-danger badge-pil">
                  {products.brand}
                </span>
              </h4>
              <p> {products.description} </p>
              <h4 className="mb-1">
                Rs: {products.selling_price}
                <s className="ms-2">Rs: {products.original_price} </s>
              </h4>
              <div>{avail_stock}</div>
              <button type="button" className="btn btn-danger mt-3 ">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
