import React, { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Home from "../Home";

const Login = () => {
  const navigate = useNavigate();

  if (localStorage.getItem("auth_token")) {
    return <Home />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post(`api/login`, { email, password }).then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_name", res.data.username);

            if (res.data.role === "admin") {
              swal("Success", res.data.message, "success");
              navigate("/admin/dashboard");
            } else {
              swal("Success", res.data.message, "success");
              navigate("/admin");
            }
          } else if (res.data.status === 401) {
            swal("Warning!", res.data.message, "warning");
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-header">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                      Login
                    </button>
                  </div>
                </form>
                <p>
                  don't have an account yet? <Link to="/register">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
