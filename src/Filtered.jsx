import Header from "./components/header";
import React from 'react'
import ProductGrid from "./components/ProductGrid";
import { useSearchParams } from 'react-router-dom'

export default function Filtered() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("search");
    const urlSearch = process.env.BACKEND_URL + '/filter?search=' + query;

    return (
        <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GameGO</title>
        <Header />
        <main id="main">
        <div id="products">
            <ProductGrid url={urlSearch}/>
        </div>
        </main>
      </>
      
    );
}