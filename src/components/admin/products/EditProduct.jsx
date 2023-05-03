import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const EditProduct = () => {
  let {id} = useParams();
  const navigate = useNavigate();
  const [categorylist, setCategoryList] = useState([]);
  const [loading, setLoading]= useState(true);
  const [productInput, setProduct] = useState({
    category_id: "",
    slug: "",
    name: "",
    description: "",

    meta_title: "",
    meta_keyword: "",
    meta_descrip: "",

    selling_price: "",
    original_price: "",
    qty: "",
    brand: "",
   
  });

  const [picture, setPicture] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

 const [allcheckbox, setCheckboxes] = useState([]);
  const handleCheckbox = (e)=>{
    e.persist();
    setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
  }

  useEffect(() => {
    axios.get(`/api/all-category`).then((res) => {
      if (res.data.status === 200) {
        setCategoryList(res.data.category);
      }
    });

    axios.get(`/api/edit-product/`+ id).then(res=>{
      if(res.data.status === 200){
        setProduct(res.data.product);
        setCheckboxes(res.data.product);

      }else if(res.data.status === 404){
        swal("Error", res.data.message, "error");
        navigate("/admin/view-product");
      }
      setLoading(false);
    })

  }, []);

  if(loading){
    return <h4>Edit Product Data Loading...</h4>
  }


  const updateProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", picture.image);

    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);

    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_descrip", productInput.meta_descrip);

    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("qty", productInput.qty);
    formData.append("brand", productInput.brand);
    formData.append("featured", allcheckbox.featured ? '1': '0');
    formData.append("popular", allcheckbox.popular ? '1': '0');
    formData.append("status", allcheckbox.status ? '1': '0');

    axios.post(`/api/update-product/` + id, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        console.log(allcheckbox);


      } else if (res.data.status === 422) {
        swal("All fields are mandatory", "", "error");
      }else if(res.data.status === 404){
        swal("Error", res.data.message);
        navigate("/admin/view-product");
      }
    });
  };

  return (
    <div className="container-fluid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
              Edit Product
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              Back
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateProduct} encType="multipart/form-data">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Profile
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-other-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-other"
                  type="button"
                  role="tab"
                  aria-controls="pills-other"
                  aria-selected="false"
                >
                  Other Details
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div
                  className="tab-pane card-body border fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="form-group mb-3">
                    <label htmlFor="">Select Category</label>
                    <select
                      name="category_id"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.category_id}
                    >
                      <option>Select Category</option>
                      {categorylist.map((item) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label>Slug</label>
                    <input
                      type="text"
                      name="slug"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.slug}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.name}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                      onChange={handleInput}
                      value={productInput.description}
                      name="description"
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="form-group mb-3">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.meta_title}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keywords</label>
                  <textarea
                    type="text"
                    name="meta_keyword"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.meta_keyword}
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <textarea
                    type="text"
                    name="meta_descrip"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.meta_descrip}
                  ></textarea>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-other"
                role="tabpanel"
                aria-labelledby="pills-other-tab"
              >
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Selling Price</label>
                    <input
                      type="text"
                      onChange={handleInput}
                      value={productInput.selling_price}
                      name="selling_price"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Original Price</label>
                    <input
                      type="text"
                      name="original_price"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.original_price}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="qty"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.qty}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="brand"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.brand}
                    />
                  </div>
                  <div className="col-md-8 form-group mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={handleImage}
                    />
                    <img src={`http://localhost:8000/${productInput.image}`} width="50px" />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Featured (checked=shown)</label>
                    <input
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.featured === 1? true: false}
                      type="checkbox"
                      name="featured"
                      className="w-50 h-50"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Popular (checked=shown)</label>
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.popular === 1? true: false}
                      name="popular"
                      className="w-50 h-50"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Status (checked=Hidden)</label>
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.status === 1? true: false}
                      name="status"
                      className="w-50 h-50"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
