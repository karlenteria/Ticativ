import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import Header from "./Header";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import axios from "axios";

// This values are the props in the UI
const amount = "2";
const currency = "USD";
const style = { layout: "vertical" };
const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
          });
        }}
      />
    </>
  );
};
const Checkout = () => {
  const [cartProducts, SetCartProducts] = useState([{}]);
  

  const getCartProducts = (userId) => {
    // console.log(userId)
    axios.post('http://localhost:8088/api/v1/cart/userCart', userId).then(
       response => {
      //  console.log(response)
     
        // console.log(productId)
      
        SetCartProducts(response.data.products)
            
   })};

   const removedToCart = (userId, product) => {
    const removed = {
      user: userId.user,
      product: product
    }
    // console.log(userId)
    axios.post('http://localhost:8088/api/v1/cart/removeToCart', removed).then(
       response => {
      //  console.log(response)
     
      // console.log(productId)
      console.log(response)
            
   })};

   const removeToCartHandle = (productId) => {
    const loginUser = JSON.parse(localStorage.getItem('loginUser'));
    removedToCart(loginUser.id, productId);
   }

   useEffect(() => {
    console.log('hello from ');
    const loginUser = JSON.parse(localStorage.getItem('loginUser'));
    const user = {
      user: loginUser.id
    }
    getCartProducts(user);
    
},[]);


const total = () => {
  let total = 0;
  for (let i = 0; i < cartProducts.length; i++ ){
      console.log(i)
      total =+ cartProducts[i].price
      console.log(total)
  }
  
  return total;
  
}
total()
console.log(cartProducts)



  return (
    <>
      <Header />
      <div className="row" style={{ margin: "20px" }}>
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
           {/* getProductsDetail(cartProduct) */}
            {
              cartProducts.map(cartProduct => {
                return (
                

                  <li className="list-group-item d-flex justify-content-between lh-condensed flex-nowrap">
                    <div>
                      
                      <h6 className="my-0">{cartProduct.productName}</h6>
                      <small className="text-muted">{cartProduct.productDesc}</small>
                    </div>
      
                    <span className="text-muted">P{cartProduct.price}</span>
                    
                    <button
                      onClick={() =>{
                        removeToCartHandle()
                      }}>
                    <NotInterestedIcon 
                      className="style"
                       />
                    </button>
                </li>
     
                 )
            })
      
          } 
           
            

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$1505</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" novalidate="">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  value=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  value=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label for="username">Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">@</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  required=""
                />
                <div className="invalid-feedback" style={{ width: "100%" }}>
                  Your username is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label for="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label for="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required=""
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label for="address2">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="Apartment or suite"
              />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label for="country">Country</label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  required=""
                >
                  <option value="">Choose...</option>
                  <option>Philippines</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label for="state">State</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  required=""
                >
                  <option value="">Choose...</option>
                  <option>Baguio City</option>
                  <option>Tuguegarao, Cagayan</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label for="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>

            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="same-address"
              />
              <label className="custom-control-label" for="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="save-info"
              />
              <label className="custom-control-label" for="save-info">
                Save this information for next time
              </label>
            </div>
            <hr className="mb-4" />

            <h4 className="mb-3">Payment</h4>
            <div className="custom-control custom-radio">
              <input
                id="paypal"
                name="paymentMethod"
                type="radio"
                className="custom-control-input"
                required=""
              />
              <label className="custom-control-label" for="paypal">
                Paypal
              </label>
            </div>

            <hr className="mb-4" />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
