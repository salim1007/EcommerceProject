import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewCollections = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let IsMounted = true;

    axios.get(`/api/getCategory`).then((res) => {
      if(IsMounted){
        if (res.data.status === 200) {
          setCategory(res.data.category);
          setLoading(false);
        }
      }
      
    });

    return () => {
      IsMounted = false;
    }

  }, []);

  if (loading) {
    return <h4>Loding Categories...</h4>;
  } else {
    var showCategoryList = "";
    showCategoryList = category.map((item) => {
      return (
        <div className="col-md-4" key={item.id}>
          <div className="card">
            <Link>
              <img src="" className="w-100" alt={item.name} />
            </Link>
            <div className="card-body">
              <Link to={`/collections/${item.slug}`}>
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <Navbar />
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category Page</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">
            <h6>Category Data</h6>
            {showCategoryList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCollections;
