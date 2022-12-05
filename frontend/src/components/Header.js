import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../assets/Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, Navigate, useRouteLoaderData } from "react-router-dom";

//react-router
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { useSelect } from "@mui/base";

//axios
import axios from "axios";

const Header = () => {
  const [isLogin, SetIsLogin] = useState(false);
  const dispatch = useDispatch();

  //useNavigate
  let navigate = useNavigate();
  const [numOfProducts, SetNumOfProducts] = useState(0);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  // console.log(loginUser);
  console.log();

  useEffect(() => {
    if (loginUser === null) {
      SetIsLogin(false);
    } else {
      SetIsLogin(true);
      dispatch({
        type: "LOGIN_USER",
        payload: loginUser,
      });
    }
  }, []);
  const userLogin = useSelector((state) => state);

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="" />
      </Link>
      <div className="header__search">
        <input className=" header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="navName">
            {isLogin
              ? `Hello, ${userLogin.logUser.fullname.split(" ")[0]}`
              : `Hello, Guest`}
          </span>

          {/* If islogin === true, signin link will hide, if islogin === false, signin link show   */}
          {isLogin ? (
            ""
          ) : (
            <Link to="/login">
              <span className="navOption">Sign In</span>
            </Link>
          )}
        </div>

        {/* If islogin === true, signup link will hide, if islogin === false, signup link show   */}
        {isLogin ? null : (
          <div className="header__option">
            <Link to="/signup">
              <span className="navOption">Sign up</span>
            </Link>
          </div>
        )}

        {isLogin && (
          <button
            type="button"
            onClick={(event) => {
              localStorage.clear();

              // alert('successfully logout');
              window.location.reload();
            }}
          >
            logout
          </button>
        )}

        {/* <div className="header__option">
          <span className="navOption">Prime</span>
        </div> */}
        <div className="header__optionBasket">
          <Link to="/checkout">
            <ShoppingCartIcon />
          </Link>
          <span className="navOption basket__quantity">{numOfProducts}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
