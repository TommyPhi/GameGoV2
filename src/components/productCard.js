import React from "react";

// This is a presentational component that displays the information of a single product. It has an image, the product title, the publisher, the price, and the release date.
export default function ProductCard(props) {
  return (
    <div className="cardContainer">
      <div id="topCardContainer">
        <div className="product-img_container">
          <img src={props.image_url} alt={props.title}></img>
        </div>
        <h3 id="productTitle">{props.title}</h3>
        <small id="publisher">{props.publisher}</small>
      </div>
      <div id="bottomCardContainer">
        <h2 id="price">${props.price}</h2>
        <small id="releaseDate">Release Date: {props.release_date}</small>
      </div>
    </div>
  );
}
