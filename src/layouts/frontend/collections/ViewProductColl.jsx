import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const ViewProductColl = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState();
  let { slug } = useParams();

  const productCount = product.length;

  useEffect(() => {
    let IsMounted = true;

    axios.get(`/api/fetchProduct/` + slug).then((res) => {
      if (IsMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.product_data.product);
          setCategory(res.data.product_data.category);
          setLoading(false);
        }
      } else if (res.data.status === 400) {
        swal("Warning", res.data.message, "");
      } else if (res.data.status === 404) {
        navigate("/collections");
        swal("Warning", res.data.message, "error");
      }
    });

    return () => {
      IsMounted = false;
    };
  }, []);

  if (loading) {
    return <h4>Loding Products...</h4>;
  } else {
    var showProductList = "";

    if (productCount) {
      showProductList = product.map((item) => {
        return (
          <div className="col-md-3" key={item.id}>
            <div className="card">
              <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                <img
                  src={`http://localhost:8000/${item.image}`}
                  className="w-100"
                  alt={item.name}
                />
              </Link>

              <div className="card-body">
                <Link to={`/collections/${item.category.slug}/${item.slug}`} >
                  <h5>{item.name}</h5>
                </Link>
              </div>
            </div>
          </div>
        );
      });
    }else{
        showProductList = 
        <div className="col-md-12">
            <h4> No Product Available for {category.name}</h4>
        </div>
    }
  }

  return (
    <div>
      <Navbar />
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Collections / {category.name}</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">{showProductList}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductColl;
