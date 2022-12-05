import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import SignUpPage from "./pages/SignUpPage";
import AddArtProduct from "./components/AddProduct";
import Product from "./components/Product";
import Checkout from "./components/Checkout";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/addNewProduct" element={<AddArtProduct />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
