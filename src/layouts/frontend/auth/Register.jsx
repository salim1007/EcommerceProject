import React from 'react'
import axios from "axios";
import swal from 'sweetalert';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
import Home from "../Home";


const Register = () => {
    const navigate = useNavigate();

    if(localStorage.getItem("auth_token")){
      return (
       <Home/>
      );
        
     }

    const [firstname, setFirstname] = useState("");
    const [midname, setMidname] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [regno, setRegno] = useState("");
    const [year, setYear]= useState("");
    const [password, setPassword] = useState("");
   
  
    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
              .post(`/api/register`, {
                firstname,
                midname,
                surname,
                email,
                regno,
                year,
                password,
             
              })
              .then((res) => {
                if (res.data.status === 200) {
                  localStorage.setItem("auth_token", res.data.token);
                  localStorage.setItem("auth_name", res.data.username);
                  swal(
                    "You have been successfully Registered!",
                    res.data.message,
                    "success"
                  );
                  navigate("/login");
                }
              });
          });
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div>
      <Navbar/>
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">
              <h4>Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={registerSubmit}>
                <div className="form-group mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Mid Name</label>
                  <input
                    type="text"
                    placeholder="midname"
                    onChange={(e) => setMidname(e.target.value)}
                    value={midname}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Surname</label>
                  <input
                    type="text"
                    placeholder="surname"
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Registration Number</label>
                  <input
                    type="text"
                    placeholder="regno."
                    onChange={(e) => setRegno(e.target.value)}
                    value={regno}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Year of Study</label>
                  <input
                    type="text"
                    placeholder="1,2,3 or 4"
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                    className="form-control"
                  />
                </div>
              
                

                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="form-control"
                    
                  />
                </div>
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
              <p>
                already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register