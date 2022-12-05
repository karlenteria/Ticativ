import React from "react";
import "./Footer.css";
import Logo from "../assets/Logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col first">
            <div className="col__logo">
              <img src={Logo} alt="" />
              <span className="footer__span">The essence of true feelings</span>
            </div>
          </div>

          <div className="col list">
            <h4>Payment Method</h4>
            <ui className="list-unstyled">
              <li>Paypal</li>
            </ui>
          </div>
          <div className="col list">
            <h4>Customer Care</h4>
            <ui className="list-unstyled">
              <li>How to Buy</li>
              <li>Shipping and Delivery</li>
              <li>Product Policy</li>
              <li>How to return</li>
            </ui>
          </div>

          <div className="col list">
            <h4>Ticativ</h4>
            <ui className="list-unstyled">
              <li>About Ticativ</li>
              <li>Terms and Condition</li>
              <li>Privacy Policy</li>
              <li>Intellectual Property Protection</li>
            </ui>
          </div>
        </div>

        <div className="row__copyright">
          <div className="copyright__area">
            <h4>&#169; ticativ 2022 All Rights Reserved</h4>
          </div>
          <div className="footer__social">
            <ui className="list__unstyled">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <TwitterIcon />
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer">
                  <PinterestIcon />
                </a>
              </li>
            </ui>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
