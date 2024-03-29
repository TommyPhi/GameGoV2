import React, { useState, useRef, useEffect } from "react";
import Header from "./components/header";
import CartItem from "./components/CartItem";
import PurchaseSummary from "./components/PurchaseSummary";

export default function Cart() {
  const [cart, setCart] = useState(localStorage.getItem("cart"));
  const [backendData, setBackendData] = useState([{}]);
  const [subTotal, setSubTotal] = useState(0);
  const [salesTax, setSalesTax] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartCount, setCartCount] = useState(
    localStorage.getItem("cart").split(",").filter(onlyUnique).length
  );
  const orderSummary = useRef(null);
  const cartContainer = useRef(null);
  const cartMessage = useRef(null);

  // Remove duplicates from array
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  // Remove item from cart
  function handleRemoveClick(e) {
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    let cartArray = localStorage.getItem("cart").split(",");
    backendData.forEach((game) => {
      if (parseInt(game.id) === parseInt(e.target.id)) {
        let currentSubTotal = subTotal;
        currentSubTotal =
          Math.ceil(currentSubTotal * 100) / 100 - parseFloat(game.price);
        let currentShippingFee;
        if (localStorage.getItem("cart") === "") {
          currentSubTotal = 0;
          currentShippingFee = 0;
          orderSummary.current.style.display = "none";
          cartMessage.current.textContent = "Your Cart is Empty";
        } else if (currentSubTotal < 0.05) {
          orderSummary.current.style.display = "none";
          cartMessage.current.textContent = "Your Cart is Empty";
        } else if (currentSubTotal > 59.99) {
          setShippingFee(0);
          currentShippingFee = 0;
        } else {
          setShippingFee(10.65);
          currentShippingFee = 10.65;
        }
        let currentSalesTax = currentSubTotal * 0.0475;
        currentSalesTax = Math.ceil(currentSalesTax * 100) / 100;
        setSalesTax(currentSalesTax);
        setSubTotal(currentSubTotal);
        setTotal(currentSubTotal + currentShippingFee + currentSalesTax);
      }
    });

    cartArray = cartArray.filter((game) => game !== e.target.id);
    localStorage.setItem("cart", cartArray.join(","));
  }

  // Fetch cart data
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(localStorage.getItem("cart"));
      fetch(process.env.REACT_APP_BACKEND_URL + "/getCartProducts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart.split(",") || "[]",
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            orderSummary.current.style.display = "none";
            cartMessage.current.textContent = result.error;
          } else if (!result) {
            cartMessage.current.textContent = "Loading...";
          } else {
            cartMessage.current.textContent = "Your Cart";
            let subTotalPrice = 0;
            let currentShippingFee = 0;
            let currentSalesTax = 0;
            let currentTotal = 0;
            result.forEach((game) => {
              subTotalPrice += parseFloat(game.price);
            });
            if (subTotalPrice > 59.99) {
              currentShippingFee = 0;
            } else {
              currentShippingFee = 10.65;
            }
            currentSalesTax = subTotalPrice * 0.0475;
            currentSalesTax = Math.ceil(currentSalesTax * 100) / 100;
            currentTotal = subTotalPrice + currentSalesTax + currentShippingFee;

            setShippingFee(currentShippingFee);
            setSalesTax(currentSalesTax);
            setSubTotal(subTotalPrice);
            setTotal(currentTotal);
            setBackendData(result);
          }
        });
    } else {
      cartContainer.current.style.display = "none";
      orderSummary.current.style.display = "none";
      cartMessage.current.textContent = "Your Cart is Empty";
    }
  }, []);

  // Clear cart
  function handleClearCart() {
    localStorage.setItem("cart", "");
    cartContainer.current.style.display = "none";
    cartMessage.current.textContent = "Your Cart is Empty";
    orderSummary.current.style.display = "none";
    setTotal(0);
    setShippingFee(0);
    setSubTotal(0);
    setSalesTax(0);
  }

  // This is a component that displays the cart and purchase summary
  return (
    <div>
      <Header />
      <main id="cartMain">
        <h1 id="cartMessage" ref={cartMessage}></h1>
        <div id="cartItemsContainer" ref={cartContainer}>
          {backendData.error ? (
            <p>{backendData.error}</p>
          ) : (
            backendData.map((game) => (
              <CartItem
                key={game.id}
                id={game.id}
                title={game.name}
                price={game.price}
                game_cover_url={game.game_cover_url}
                handleRemove={handleRemoveClick}
                mainPrice={game.price}
              />
            ))
          )}
        </div>
        <div id="purchaseSummary" ref={orderSummary}>
          <PurchaseSummary
            cartCount={cartCount}
            subTotal={Math.ceil(subTotal * 100) / 100}
            tax={salesTax}
            shippingFee={shippingFee}
            total={Math.ceil(total * 100) / 100}
            clearCart={handleClearCart}
          />
        </div>
      </main>
    </div>
  );
}
