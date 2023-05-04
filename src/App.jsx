import React, { useState } from "react";
import Login from "./layouts/frontend/auth/Login";
import Register from "./layouts/frontend/auth/Register";
import { Routes, Route, Navigate, Link } from "react-router-dom";


import axios from "axios";
import MasterLayout from "./layouts/admin/MasterLayout";

import Dashboard from "./components/admin/dashboard";
import Profile from "./components/admin/Profile";
import Home from "./layouts/frontend/Home";
import Footer from "./layouts/admin/Footer";
import Category from "./components/admin/category/Category";
import ViewCategory from "./components/admin/category/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";
import AddProduct from "./components/admin/products/AddProduct";
import ViewProduct from "./components/admin/products/ViewProduct";
import EditProduct from "./components/admin/products/EditProduct";

import ViewCollections from "./layouts/frontend/collections/ViewCollections";
import ViewProductColl from "./layouts/frontend/collections/ViewProductColl";
import ProductDetail from "./layouts/frontend/collections/ProductDetail";
import Cart from "./layouts/frontend/Cart";
import Checkout from "./layouts/frontend/Checkout";


axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/collections" element={<ViewCollections/>}/>
        <Route path="/cart"  element={<Cart/>}/>
        <Route path="/checkout"  element={<Checkout/>}/>
        <Route path="/collections/:slug" element={<ViewProductColl/>}/>
        <Route path="/collections/:category/:product" element={<ProductDetail/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<MasterLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-category" element={<Category/>} />
          <Route path="view-category" element={<ViewCategory/>} />
          <Route path="view-category/edit-category/:id" element={<EditCategory/>} />
          <Route path="add-product" element={<AddProduct/>} />
          <Route path="view-product" element={<ViewProduct/>} />
          <Route path="view-product/edit-product/:id" element={<EditProduct/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
