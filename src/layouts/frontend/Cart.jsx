import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Navbar from "./Navbar";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

  

    var totalCartPrice = 0;
    var totalCartPriceFx = 0;


    useEffect(() => {

      let IsMounted = true;
      

//Authorizer token..........
      if(!localStorage.getItem("auth_token")){
        swal("Warning", "Login to go to Cart Page","warning");
        navigate("/home");
    }
//.......................... 

      axios.get(`/api/cart`).then((res) => {
        if (IsMounted) {
          if (res.data.status === 200) {
            setCart(res.data.cart);
            setLoading(false);
          }
        } else if (res.data.status === 401) {
        //   navigate("/collections");
          swal("Warning", res.data.message, "warning");
        }
      });

      return () => {
        IsMounted = false;
      };
    }, []);

    const handleDecrement = (cart_id) => {
        setCart(cart => cart.map((item)=>cart_id === item.id ? {...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1:0)} : item));
        updateCartQantity(cart_id,"dec");
    }

    const handleIncrement = (cart_id) => {
        setCart(cart => cart.map((item)=>cart_id === item.id ? {...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1:0)} : item));
        updateCartQantity(cart_id,"inc");

    }

    const updateCartQantity =(cart_id, scope)=>{
        axios.put(`/api/cart-updateqty/`+ cart_id + `/` + scope).then(res=>{
            if(res.data.status === 200){
                // swal("Success", res.data.message,"success");
            }
        })
    }
    const deleteCartItem=(e, cart_id)=>{
      e.preventDefault();
     
      const thisClicked = e.currentTarget;
      thisClicked.innerText = "Removing";

      axios.delete(`/api/delete-cartItem/${cart_id}`).then(res=>{
        if(res.data.status === 200){
          swal("Success", res.data.message,"success");
          thisClicked.closest("tr").remove();

        }else if(res.data.status === 404){
          swal("Error", res.data.message,"error");
          thisClicked.innerText = "Remove";

        }
      })
    }

    if (loading) {      return <h4>Loading Cart Detail...</h4>;
    }

    var viewCart = "";

    if(cart.length > 0){
        viewCart = (

            <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Total Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
              {  viewCart = cart.map((item)=>{
                totalCartPrice += item.product_qty;
                totalCartPriceFx += item.product_qty;
                    return (

                    <tr key={item.id}>
                      
                        <td width="10%">
                            <img src="" alt={item.product_name} width="50px" height="50px" />
                        </td>
                        <td>{item.product_name}</td>
                        <td width="15%" className="text-center">{item.product_qty}</td>
                        <td width="15%" >
                            <div className="input-group">
                                <button type="button" onClick={()=>handleDecrement(item.id)} className="input-group-text">-</button>
                                <div className="form-control text-center">{item.product_qty}</div>
                                <button type="button" onClick={()=>handleIncrement(item.id)} className="input-group-text">+</button>
                            </div>
                        </td>
                        <td width="15%" className="text-center">{item.product_qty}</td>
                        <td width="10%">
                            <button type="button" onClick={(e)=>deleteCartItem(e,item.id)} className="btn btn-danger btn-sm">Remove</button>
                        </td>
                    </tr>
                         )
                        })}
              </tbody>
            </table>
          </div>
        )
    }else{
       viewCart = (
        <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart Is Empty</h4>

            </div>
        </div>
       )
    }

  return (
    <div>
      <Navbar />
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Cart</h6>
        </div>
      </div>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
             {viewCart}
            </div>

            <div className="col-md-8"></div>
            <div className="col-md-4">
              <div className="card card-body mt-3">
                <h4>Sub Total:
                  <span className="float-end">{totalCartPrice}</span>

                </h4>
                <h4>Grand Total:
                  <span className="float-end">{totalCartPriceFx - 1}</span>

                </h4>
                <hr/>
                <Link to="/checkout" className="btn btn-primary" >Checkout</Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

