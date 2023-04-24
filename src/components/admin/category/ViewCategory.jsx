import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const ViewCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get(`/api/view-category`).then((res) => {
      console.log(res.data.category);
      if (res.status === 200) {
        setCategoryList(res.data.category);
      }
      setLoading(false);
    });
  }, []);

  const deleteCategory = (e, id)=>{
 
    e.preventDefault();

    //delete button code.....
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/delete-category/`+ id ).then(res=>{
      if(res.data.status===200){
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      }else if(res.data.message===404){
        swal("Success", res.data.message,"success");
        thisClicked.innerText = "Delete";
      }
    })
  }

  var viewcategory_HTMLTABLE = "";
  if (loading) {
    return <h3>Loading Category...</h3>;
  } else {
    viewcategory_HTMLTABLE = categorylist.map((item) => {
      return (
        <tr key={item.id}>

          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>{item.status}</td>
          
          <td>
            <Link
              to={`edit-category/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button type="button" onClick={(e)=>deleteCategory(e, item.id)} className="btn btn-danger btn-sm">
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Category List
            <button
              onClick={() => navigate("/admin/add-category")}
              className="btn btn-primary btn-sm float-end"
            >
              Add Category
            </button>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{viewcategory_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
