import React from "react";
import { Link } from "react-router-dom";
import { FaPinterestP, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.scss";



const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
    
        <div className="footer-top">

          <div className="footer-col">
            <ul className="footer-links">
              <li>
                <Link to="/returns">Returns Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/trade-terms">
                  Terms & Conditions - Trade Accounts
                </Link>
              </li>
              <li>
                <Link to="/delivery">Delivery & Tracking</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/sitemap">Site Map</Link>
              </li>
              <li>
                <Link to="/returns-request">Request a Return/Exchange</Link>
              </li>
              <li>
                <Link to="/price-match">Price Match Promise</Link>
              </li>
              <li>
                <Link to="/gift-vouchers">Gift Vouchers</Link>
              </li>
              <li>
                <Link to="/glossary">Glossary</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <ul className="footer-links">
              <li>
                <Link to="/trade">Trade Application</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col address-col">
            <h5 className="footer-title">House of Isabella Limited</h5>
            <div className="address-text">
              <p>Unit 5405</p>
              <p>PO Box 6945</p>
              <p>LONDON W1A 6US</p>
              <p className="company-no">
                Company No. 12065582 - VAT No. 200662553
              </p>
            </div>
          </div>
          <div className="footer-col newsletter-col">
            <h5 className="newsletter-title">JOIN OUR NEWSLETTER</h5>
            <form className="newsletter-form">
              <input type="email" placeholder="Email address" />
              <button type="submit">SUBMIT</button>
            </form>

            <div className="social-icons">
              <a href="#" className="social-link">
                <FaXTwitter />
              </a>
              <a href="#" className="social-link">
                <FaPinterestP />
              </a>
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-link">
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <span className="visit-text">visit our Australian site:</span>
          <a
            href="https://houseofisabella.com.au"
            target="_blank"
            rel="noreferrer"
          >

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg"
              alt="Australia"
              className="flag-icon"
            />
          </a>
        </div>
      </div>


      <div className="footer-bottom-wrapper">
        <div className="container footer-bottom">
          <div className="copyright">
            <p>&copy; 2026 House of Isabella UK All rights reserved.</p>
          </div>

          <div className="payment-icons">
        
            <img
              src="https://cdn.shopify.com/s/files/1/0159/8662/2518/files/payment-shopay_424x.jpg?v=1658123674"
              alt="Payments"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
