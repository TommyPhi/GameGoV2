import React from "react";

// This is a presentational component that displays the information of a single deal. It has an image, the game title, the retail price, and the sale price.
export default function DealCard(props) {
  return (
    <div className="deal-item">
      <div className="image-container">
        <img src={props.img} />
      </div>
      <div className="deal-info">
        <h3>{props.gameTitle}</h3>
        <h4>{props.retailPrice}</h4>
        <h2>{props.salePrice}</h2>
      </div>
    </div>
  );
}
