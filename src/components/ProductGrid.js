import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./productCard";

// This is a presentational component that displays a grid of products. It receives a URL as a prop, fetches the data from the backend, and maps the data to a ProductCard component.
export default function ProductGrid({ url }) {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + url)
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <>
      {backendData.map((game) => (
        <Link to={`/product/${game.id}`} className="productCard">
          <ProductCard
            key={game.id}
            image_url={game.game_cover_url}
            title={game.name}
            publisher={game.publisher}
            developer={game.developer}
            release_date={game.release_date}
            genres={game.genres}
            price={game.price}
          />
        </Link>
      ))}
    </>
  );
}
