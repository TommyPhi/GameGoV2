import React, { useEffect, useState, useRef } from "react";

// Importing components
import DealCard from "./components/dealCard";
import HomeHeader from "./components/homeHeader";

// Importing images and videos
import sm2Logo from "./assets/images/SpiderMan2_logo.png";
import sm2Video from "./assets/videos/spiderman2trailer.mp4";
import lotfLogo from "./assets/images/lotf-logo.png";
import lotfTrending from "./assets/images/lotf-trending.jpg";
import palLogo from "./assets/images/pal-logo.png";
import palBanner from "./assets/images/palworld-banner.png";
import avatarLogo from "./assets/images/avatar-logo.png";
import avatarBanner from "./assets/images/avatar-banner.jpeg";
import smMM from "./assets/images/spidermanmm-cover.png";
import rd2Cover from "./assets/images/readdead2-cover.png";
import mHuntCover from "./assets/images/mh-world-cover.png";
import arkAscend from "./assets/images/arkascended-cover.png";
import creatorSpotlight from "./assets/images/penguinz0.png";
import Trending from "./components/Trending";

export default function Home() {
  // Array of images
  const logoArray = [lotfLogo, palLogo, avatarLogo];
  const bannerArray = [lotfTrending, palBanner, avatarBanner];

  // Variables
  const MINUTE_MS = 5000;
  const maxCount = 2;

  // State variables
  const [logo, setLogo] = useState(logoArray[0]);
  const [banner, setBanner] = useState(bannerArray[0]);
  const index1 = useRef(null);
  const index2 = useRef(null);
  const index3 = useRef(null);

  let currentIndex = 0;

  // Functions
  function setIndex1() {
    currentIndex = 0;
    index1.current.style.backgroundColor = "black";
    index2.current.style.backgroundColor = "#f1f1f1";
    index3.current.style.backgroundColor = "#f1f1f1";
    setLogo(logoArray[currentIndex]);
    setBanner(bannerArray[currentIndex]);
    return currentIndex;
  }

  function setIndex2() {
    currentIndex = 1;
    index1.current.style.backgroundColor = "#f1f1f1";
    index2.current.style.backgroundColor = "black";
    index3.current.style.backgroundColor = "#f1f1f1";
    setLogo(logoArray[currentIndex]);
    setBanner(bannerArray[currentIndex]);
    return currentIndex;
  }

  function setIndex3() {
    currentIndex = 2;
    index1.current.style.backgroundColor = "#f1f1f1";
    index2.current.style.backgroundColor = "#f1f1f1";
    index3.current.style.backgroundColor = "black";
    setLogo(logoArray[currentIndex]);
    setBanner(bannerArray[currentIndex]);
    return currentIndex;
  }

  // UseEffect that sets the interval for the trending section
  useEffect(() => {
    index1.current.style.backgroundColor = "black";
    const interval = setInterval(() => {
      if (currentIndex == maxCount) {
        currentIndex = 0;
        setLogo(logoArray[currentIndex]);
        setBanner(bannerArray[currentIndex]);
      } else {
        currentIndex++;
        setLogo(logoArray[currentIndex]);
        setBanner(bannerArray[currentIndex]);
      }
      switch (currentIndex) {
        case 0:
          index1.current.style.backgroundColor = "black";
          index2.current.style.backgroundColor = "#f1f1f1";
          index3.current.style.backgroundColor = "#f1f1f1";
          break;
        case 1:
          index1.current.style.backgroundColor = "#f1f1f1";
          index2.current.style.backgroundColor = "black";
          index3.current.style.backgroundColor = "#f1f1f1";
          break;
        case 2:
          index1.current.style.backgroundColor = "#f1f1f1";
          index2.current.style.backgroundColor = "#f1f1f1";
          index3.current.style.backgroundColor = "black";
          break;
      }
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  // JSX that returns the home page
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
          <video
            className="hero-video"
            muted="true"
            autoPlay="true"
            loop="true"
          >
            <source src={sm2Video} type="video/mp4" />
          </video>
        </div>
        <Trending logo={logo} banner={banner} />
        <div id="trendingTabs">
          <div ref={index1} onClick={setIndex1}></div>
          <div ref={index2} onClick={setIndex2}></div>
          <div ref={index3} onClick={setIndex3}></div>
        </div>
        <h1 className="home-title" id="deals-title">
          DEALS OF THE DAY
        </h1>
        <div className="deals">
          <DealCard
            img={smMM}
            gameTitle="Marvel’s Spider-Man: Miles Morales"
            retailPrice="$49.99"
            salePrice="$29.99"
          />
          <DealCard
            img={rd2Cover}
            gameTitle="Red Dead Redemption 2"
            retailPrice="$59.99"
            salePrice="$23.99"
          />
          <DealCard
            img={mHuntCover}
            gameTitle="Monster Hunter: World"
            retailPrice="$29.99"
            salePrice="$14.99"
          />
          <DealCard
            img={arkAscend}
            gameTitle="ARK: Survival Ascended"
            retailPrice="$44.99"
            salePrice="$40.49"
          />
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
