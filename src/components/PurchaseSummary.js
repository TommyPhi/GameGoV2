import React from "react";

// This is a presentational component that displays the order summary. It has the subtotal, shipping & handling, estimated tax, and the estimated total. It also has a button to proceed to checkout and a button to clear the cart.
export default function PurchaseSummary(props) {
  return (
    <div id="orderSummary">
      <h3>Order Summary</h3>
      <div id="orderDetails">
        <div id="preTotalInfo">
          <div className="preTotalDetail">
            <p>Subtotal ({props.cartCount} items): </p>
            <p>${props.subTotal}</p>
          </div>
          <div className="preTotalDetail">
            <p>Shipping & Handling: </p>
            <p>${props.shippingFee}</p>
          </div>
          <div className="preTotalDetail">
            <p>Estimated Tax: </p>
            <p>${props.tax}</p>
          </div>
        </div>
        <div className="preTotalDetail">
          <h2>Estimated Total: </h2>
          <h2>${props.total}</h2>
        </div>
      </div>
      <button id="checkoutBtn">PROCEED TO CHECKOUT</button>
      <small>OR</small>
      <button onClick={props.clearCart}>CLEAR CART</button>
    </div>
  );
}
