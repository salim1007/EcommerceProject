import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const EditCategory = () => {
  const [categoryInput, setCategoryInput] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  //params
  let { id } = useParams();

  useEffect(() => {
    axios.get(`/api/edit-category/` + id).then((res) => {
      if(res.data.status === 200) {
        setCategoryInput(res.data.category);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/admin/view-category");
      }
      setLoading(false);
    });
  }, []);

  const handleInput = (e) => {
    e.persist();
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
 
  };

  const updateCategory = (e) => {
    e.preventDefault();

    const data = categoryInput;

    axios.put(`/api/update-category/` + id, data).then(res => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
       
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/admin/view-category");
      }
    });
  };

  if (loading) {
    return <h3>Loading Edit Category...</h3>;
  }

  return (
    <div className="container-fluid px-4">
      <form onSubmit={updateCategory} >
        <h1 className="mt-4"> Edit Category</h1>
        <button
          type="button"
          onClick={() => navigate("/admin/view-category")}
          className="btn btn-primary btn-sm float-end"
        >
          Back
        </button>

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
              <input
                type="text"
                name="slug"
                onChange={handleInput}
                value={categoryInput.slug || ""}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInput}
                value={categoryInput.name || ""}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                name="description"
                onChange={handleInput}
                value={categoryInput.description || ""}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group mb-3 p-2">
              <label>Status</label>
              <input
                type="checkbox"
                onChange={handleInput}
                value={categoryInput.status || ""}
                name="status"
              />
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
                onChange={handleInput}
                value={categoryInput.meta_title || ""}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Meta Keywords</label>
              <textarea
                type="text"
                name="meta_keyword"
                onChange={handleInput}
                value={categoryInput.meta_keyword || ""}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <textarea
                type="text"
                name="meta_descrip"
                onChange={handleInput}
                value={categoryInput.meta_descrip || ""}
                className="form-control"
              ></textarea>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 float-end">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
