import React from "react";

import DealCard from "./components/dealCard";
import HomeHeader from './components/homeHeader'

import sm2Logo from "./assets/images/SpiderMan2_logo.png"
import sm2Video from "./assets/videos/spiderman2trailer.mp4"
import lotfLogo from "./assets/images/lotf-logo.png"
import lotfTrending from "./assets/images/lotf-trending.jpg"
import smMM from "./assets/images/spidermanmm-cover.png"
import rd2Cover from "./assets/images/readdead2-cover.png";
import mHuntCover from "./assets/images/mh-world-cover.png";
import arkAscend from "./assets/images/arkascended-cover.png";
import creatorSpotlight from "./assets/images/penguinz0.png";

export default function Home() {
    return (
        <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GameGO</title>
  <link rel="stylesheet" href="App.css" />
  <HomeHeader />
  <main id="main">
    <div id="whatsNew" className="hero">
      <div className="hero-text">
        <img src={sm2Logo} />
        <p>Available Now</p>
        <button>SHOP NOW</button>
      </div>
      <video className="hero-video" muted="true" autoPlay="true" loop="true">
        <source src={sm2Video} type="video/mp4" />
      </video>
    </div>
    <div id="trending" className="trending">
      <div className="trending-overlay">
        <img src={lotfLogo} />
        <button>SHOP NOW</button>
      </div>
      <img
        id="lotf-trending"
        className="trending-banner"
        src={lotfTrending}
      />
    </div>
    <h1 className="home-title" id="deals-title">
      DEALS OF THE DAY
    </h1>
    <div className="deals">
      <DealCard img={smMM} gameTitle="Marvel’s Spider-Man: Miles Morales" retailPrice="$49.99" salePrice="$29.99"/>
      <DealCard img={rd2Cover} gameTitle="Red Dead Redemption 2" retailPrice="$59.99" salePrice="$23.99"/>
      <DealCard img={mHuntCover} gameTitle="Monster Hunter: World" retailPrice="$29.99" salePrice="$14.99"/>
      <DealCard img={arkAscend} gameTitle="ARK: Survival Ascended" retailPrice="$44.99" salePrice="$40.49"/>
    </div>
    <h1 className="home-title">CREATOR SPOTLIGHT</h1>
    <div id="creator" className="creator-spotlight">
      <div className="spotlight-container">
        <img src={creatorSpotlight} />
      </div>
    </div>
    <div id="gamegostart" className="gamesGoStart">
      <h1>GameGo START</h1>
      <ul>
        <li>Quicker Delivery</li>
        <li>Exclusive Deals</li>
        <li>Discounts On ALL Products</li>
        <li>Rewards System</li>
        <li>Increased Trade-In Rewards</li>
      </ul>
    </div>
  </main>
</>

    );
}