import React from "react";
import "./Home.css";
import Product from "./Product";
import Hero from "../assets/hero-section.jpg";


const Home = () => {



  

  return (
    
    <div className="home">
      <div className="home__container">
      
        <img className="home__image" src={Hero} alt="background" />
        
        <Product />
      
        
        {/* 
        <div className="home__row">
          <Product />
          <Product />
          
        </div>
        <div className="home__row">
          <Product />
        
        </div> */}
      </div>
    </div>
  );
};

export default Home;
