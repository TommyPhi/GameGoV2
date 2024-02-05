import React from "react";
import googleStoreLogo from "../assets/images/download-on-the-google-store-badge.png";
import appleStoreLogo from "../assets/images/download-on-the-app-store-badge.png";

// This is a presentational component that displays the footer of the website. It has links to help, legal & privacy, about us, and sign up. It also has a form to sign up for exclusive promotions, coupons, and events, and links to download the app. It also has links to connect with the website on social media and a list of countries.
export default function footer() {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>HELP</h3>
          <ul>
            <li>
              <a href="#">Frequently Asked Questions</a>
            </li>
            <li>
              <a href="#">Order Status</a>
            </li>
            <li>
              <a href="#">GameGO Promotion Card</a>
            </li>
            <li>
              <a href="#">Recall Notices</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>LEGAL &amp; PRIVACY</h3>
          <ul>
            <li>
              <a href="#">CA Privacy Acts</a>
            </li>
            <li>
              <a href="#">CA Transparency Act</a>
            </li>
            <li>
              <a href="#">Conditions of Use</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">GameGo Start Terms &amp; Conditions</a>
            </li>
            <li>
              <a href="#">Your Privacy Choices</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>ABOUT US</h3>
          <ul>
            <li>
              <a href="#">Accessibility</a>
            </li>
            <li>
              <a href="#">Affiliates</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Investors</a>
            </li>
            <li>
              <a href="#">Game Informer</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>SIGN UP</h3>
          <p>Get Exclusive Promotions, Coupons, and Events</p>
          <form>
            <input
              id="footer-sign-up"
              type="text"
              placeholder="Enter your E-mail"
              name="signup"
              autoComplete="off"
            />
          </form>
          <h3>GET THE APP</h3>
          <div className="app-store-img">
            <img src={googleStoreLogo} alt="apple app store link" />
            <img src={appleStoreLogo} alt="google play store link" />
          </div>
          <h3>CONNECT WITH US</h3>
          <div className="footer-connections">
            <i className="fa-brands fa-discord" />
            <i className="fa-brands fa-github" />
            <i className="fa-brands fa-instagram" />
            <i className="fa-brands fa-youtube" />
          </div>
        </div>
      </div>
      <div className="sub-footer">
        <p>© GAMEGO 2023</p>
        <div className="footer-countries">
          <a href="#">Oceania</a>
          <a href="#">Northern America</a>
          <a href="#">Baguette</a>
          <a href="#">Germany</a>
          <a href="#">Boot</a>
        </div>
      </div>
    </footer>
  );
}
