import React, {useState,useEffect} from "react";
import "./Product.css";
import Logo from "../assets/Logo.png";
import { Link } from 'react-router-dom';
import axios from "axios";
import { logInUserReducer } from "../redux/reducers";
import { useNavigate } from "react-router-dom";
import { ResetTvOutlined } from "@mui/icons-material";



const Product = () => {
  const [products, SetProducts] = useState([])
  let navigate = useNavigate();



  const getArtProducts = () => {
    axios.get('http://localhost:8088/api/v1/artProduct/allProducts').then(
       response => {
       
        SetProducts(response.data)     
   })};
   

   const handleAddToCart = async(productid)=> {
      
      const loginUser = JSON.parse(localStorage.getItem('loginUser'))
        if (loginUser){
          const addToCartProduct= {
            user :  loginUser.id,
            product : productid
          }

          

        try {
          const addToCart = await axios.post(
            "http://localhost:8088/api/v1/cart/addToCart",
            addToCartProduct
            )
            console.log(addToCartProduct.response);
            getArtProducts();
            navigate('/Checkout')
        }catch(err){
          alert(err)
        }
      }else{
        alert('Login First')
        navigate('/login')
      }
      
   }
   


  useEffect(() => {
      console.log('hello from ');
      const loginUser = JSON.parse(localStorage.getItem('loginUser'));
      getArtProducts();
  },[]);

 

  return (
   
    <div className="home__row">
    
      
        {
          products.map( product =>{
            return (
              <div className="product">
                  <div className="product__info">
                    <p> {product.productName}</p>
                    <p className="product__price">
                      <small>$</small>
                      <strong>{product.price}</strong>
                    </p>
                    <div className="artist__name">
                    <Link to='/profile'>
                      <p>Jaypee</p>
                    </Link>
                    </div>
                  </div>
                  <img src={product.productPhoto.path} alt="" />
                  <button
                    onClick={() => {handleAddToCart(product._id)}}
                  >Add to Cart</button>
              </div>
          )})
        }
                
        
      
    </div>
  );
};

export default Product;
