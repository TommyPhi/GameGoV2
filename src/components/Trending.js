import React from "react";

// This is a presentational component that displays the trending section of the website. It has an image of the logo of the trending section, a button to shop now, and an image of the banner of the trending section.
export default function Trending(props) {
  return (
    <div>
      <div id="trending" className="trending">
        <div className="trending-overlay">
          <img src={props.logo} />
          <button>SHOP NOW</button>
        </div>
        <img
          id="lotf-trending"
          className="trending-banner"
          src={props.banner}
        />
      </div>
    </div>
  );
}
