import React from "react";
import Profile from "../assets/jp.jpg";
import "./UserProfile.css";
import Product from "../components/Product";
import Header from "../components/Header";
const UserArtist = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="header-container">
          <div className="header-profile"></div>
          <h1 class="main-heading">Jaypee</h1>
          <div className="overlay-header"></div>
          <div className="overlay-header2"></div>
          <div className="body">
            {/* Profile Picture */}
            <img src={Profile} alt="Logo" className="body-image" />

            <div className="u-clearfix"></div>
            <div className="body-info">
              <p>
                Each person has his or her own experiences as an artist. My
                interest in art started at a really young age and I have no one
                better to thank than my very passionate teachers in elementary
                school. From as early as first grade, I can remember doing
                several different art projects that helped to shape my skills
                and creativity. In third grade, I got the pleasure of painting
                with a local artist who came to teach us the art of water
                coloring. In fifth grade I learned how to draw things in
                perspective.
              </p>
            </div>

            <div className="card u-clearfix">
              <span className="card-heading">Artworks</span>
              <span className="card-more"></span>
              <ul className="card-list">
                <li>
                  <Product />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserArtist;
