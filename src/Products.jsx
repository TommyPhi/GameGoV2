import React, {useState} from "react";
import Header from "./components/header";
import ProductGrid from "./components/ProductGrid";

export default function Products() {

    const [isOpen, setIsOpen] = useState(false)
    const [url, setUrl] = useState(process.env.REACT_APP_BACKEND_URL + '/database')

    function handleDropdown() {
      if(isOpen == false) {
        const dropDown = document.getElementById('sortDropdown');
        dropDown.style.display = 'flex';
        dropDown.style.flexDirection = 'column';
        setIsOpen(true);
      } else {
        const dropDown = document.getElementById('sortDropdown');
        dropDown.style.display = 'none';
        setIsOpen(false);
      }
    }

    const handleSort = (sortBy) => {
      setUrl(process.env.REACT_APP_BACKEND_URL + `/sort?sortBy=${sortBy}`);
    };

    return (
        <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GameGO</title>
        <link rel="stylesheet" href="styles.css" />
        <link rel="stylesheet" href="products.css" />
        <Header />
        <main id="main">
          <div id='productsHeader'>
            <h1>Video Games</h1>
            <div className="dropdown">
            <button onClick={handleDropdown}>Sort by &#9660;</button>
              <div id="sortDropdown" class="dropdown-content">
                <button onClick={() => handleSort('priceLowToHigh')}>Price Low To High</button>
                <button onClick={() => handleSort('priceHighToLow')}>Price High To Low</button>
                <button onClick={() => handleSort('nameA-Z')}>Product Name A - Z</button>
                <button onClick={() => handleSort('nameZ-A')}>Product Name Z - A</button>
                <button onClick={() => handleSort('ratingHighToLow')}>Rating High To Low</button>
                <button onClick={() => handleSort('ratingLowToHigh')}>Rating Low To High</button>
              </div>
            </div>
          </div>
          <div id="products">
            <ProductGrid key={url} url = {url} />
          </div>
        </main>
      </>
      
    );
}