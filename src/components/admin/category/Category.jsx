import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Category = () => {
  const navigate = useNavigate();

const [categoryInput, setCategoryInput]= useState({
    slug: '',
    name: '',
    descrip: '',
    status: '',
    meta_title: '',
    meta_keyword: '',
    meta_descrip: '',
    error_list:[],
});

const handleInput = (e)=>{
    e.persist();
    setCategoryInput({...categoryInput, [e.target.name]: e.target.value})
}

const submitCategory =(e)=>{

    e.preventDefault();
    const data = {
        slug: categoryInput.slug,
        name: categoryInput.name,
        description: categoryInput.descrip,
        status: categoryInput.status,
        meta_title: categoryInput.meta_title,
        meta_keyword: categoryInput.meta_keyword,
        meta_descrip: categoryInput.meta_descrip,
    }

    axios.post(`/api/store-category`, data).then(res=>{
        if(res.data.status===200){
            swal("Success", res.data.message, "success");
            document.getElementById('CATEGORY_FORM').reset();
            navigate("/admin/view-category");

        }else if(res.data.status===400){
            setCategoryInput({...categoryInput, error_list:res.data.errors})
        }
    })
}

    var display_errors = [];

    if(categoryInput.error_list){
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.meta_title,
        ]
    }

  return (
    <div className="container-fluid px-4">

     
      <form onSubmit={submitCategory}  id="CATEGORY_FORM" >
        <h1 className="mt-4">Category</h1>
        {
           display_errors
        }

        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Add Product
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
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
         
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="form-group mb-3">
              <label>Slug</label>
              <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
             
            </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea name="descrip" onChange={handleInput} value={categoryInput.descrip} className="form-control"></textarea>
            </div>
            <div className="form-group mb-3 p-2">
              <label>Status</label>
              <input type="checkbox" onChange={handleInput} value={categoryInput.status} name="status" />
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
              <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Meta Keywords</label>
              <textarea
                type="text"
                name="meta_keyword"
                onChange={handleInput} value={categoryInput.meta_keyword}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <textarea
                type="text"
                name="meta_descrip"
                onChange={handleInput} value={categoryInput.meta_descrip}
                className="form-control"
              ></textarea>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 float-end">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Category;
