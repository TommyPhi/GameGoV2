import React, {useState} from "react";
import Header from "./components/header";
import ProductGrid from "./components/ProductGrid";

export default function Products() {

    const [isSortOpen, setIsSortOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [url, setUrl] = useState('/database')

    function handleSortDropdown() {
      if(isSortOpen == false) {
        const dropDown = document.getElementById('sortDropdown');
        dropDown.style.display = 'flex';
        dropDown.style.flexDirection = 'column';
        setIsSortOpen(true);
      } else {
        const dropDown = document.getElementById('sortDropdown');
        dropDown.style.display = 'none';
        setIsSortOpen(false);
      }
    }

    function handleFilterDropdown() {
      if(isFilterOpen == false) {
        const dropDown = document.getElementById('filterDropdown');
        dropDown.style.display = 'flex';
        dropDown.style.flexDirection = 'column';
        setIsFilterOpen(true);
      } else {
        const dropDown = document.getElementById('filterDropdown');
        dropDown.style.display = 'none';
        setIsFilterOpen(false);
      }
    }

    const handleSort = (sortBy) => {
      setUrl(`/sort?sortBy=${sortBy}`);
    };

    const handleFilter = (filterBy) => {
      setUrl(`/filterBy?category=${filterBy}`);
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
            <div id="dropDownBtns">
            <div className="dropdown">
              <button onClick={handleSortDropdown}>Sort by &#9660;</button>
              <div id="sortDropdown" class="dropdown-content">
                <button onClick={() => handleSort('priceLowToHigh')}>Price Low To High</button>
                <button onClick={() => handleSort('priceHighToLow')}>Price High To Low</button>
                <button onClick={() => handleSort('nameA-Z')}>Product Name A - Z</button>
                <button onClick={() => handleSort('nameZ-A')}>Product Name Z - A</button>
                <button onClick={() => handleSort('ratingHighToLow')}>Rating High To Low</button>
                <button onClick={() => handleSort('ratingLowToHigh')}>Rating Low To High</button>
              </div>
            </div>
            <div className="dropdown">
              <button onClick={handleFilterDropdown}>Filter by &#9660;</button>
              <div id="filterDropdown" class="dropdown-content">
                <button onClick={() => handleFilter('Singleplayer')}>Single Player</button>
                <button onClick={() => handleFilter('Multiplayer')}>Multiplayer</button>
                <button onClick={() => handleFilter('RPG')}>RPG (Role-Playing Game)</button>
                <button onClick={() => handleFilter('Hack')}>Beat 'em up / Hack & Slash</button>
                <button onClick={() => handleFilter('Adventure')}>Adventure</button>
                <button onClick={() => handleFilter('Indie')}>Indie</button>
                <button onClick={() => handleFilter('Shooter')}>Shooter</button>
                <button onClick={() => handleFilter('Puzzle')}>Puzzle</button>
                <button onClick={() => handleFilter('Simulator')}>Simulator</button>
              </div>
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