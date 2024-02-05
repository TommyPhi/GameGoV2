import Header from "./components/header";
import React from "react";
import ProductGrid from "./components/ProductGrid";
import { useSearchParams } from "react-router-dom";

export default function Filtered() {
  // React Hook that returns the search query from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  // Variable that holds the search query
  const query = searchParams.get("search");
  // Variable that holds the search query url
  const urlSearch = "/filter?search=" + query;

  // This is a functional component that returns a JSX element with the search results
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>GameGO</title>s
      <Header />
      <main id="main">
        <div id="productsHeader">
          <h1>Results for: "{query}"</h1>
        </div>
        <div id="products">
          <ProductGrid url={urlSearch} />
        </div>
      </main>
    </>
  );
}
