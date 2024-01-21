import React, { useEffect, useState, useRef } from 'react'
import Header from './components/header'
import { useParams } from 'react-router-dom'


export default function SingleProduct() {

    const routeParams = useParams();
    const [backendData, setBackendData] = useState([{}])
    const [genres, setGenres] = useState([])
    const [gameModes, setGameModes] = useState([])
    const [artworks, setArtworks] = useState([])
    const [currentPreview, setCurrentPreview] = useState('')
    const [cart, setCart] = useState('');
    const addCartBtn = useRef(null)

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + `/product?id=${routeParams.id}`).then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
                setGenres(data[0].genres.split(', '))
                setGameModes(data[0].game_modes.split(', '))
                setArtworks(data[0].artworks.split(','))
                setCurrentPreview(data[0].game_cover_url);
            }
        )
    }, [])


    function handleAddToCart() {
      if(!localStorage.getItem('cart')) {
        localStorage.setItem('cart', backendData[0].id)
        setCart(localStorage.getItem('cart'))
        addCartBtn.current.style.backgroundColor = '#3BB143'
        addCartBtn.current.textContent = 'Added to cart!'
        setTimeout(() => {
          addCartBtn.current.style.backgroundColor = 'red'
          addCartBtn.current.textContent = 'Add to Cart'
        }, 2000)

      } else if(localStorage.getItem('cart') !== null) {
        const cartArray = localStorage.getItem('cart').split(',');
        cartArray.push(backendData[0].id)
        localStorage.setItem('cart', `${cartArray.join(',')}`)
        addCartBtn.current.style.backgroundColor = '#3BB143'
        addCartBtn.current.textContent = 'Added to cart!'
        setTimeout(() => {
          addCartBtn.current.style.backgroundColor = 'red'
          addCartBtn.current.textContent = 'Add to Cart'
        }, 2000)
      }
    }

  return (
    <div>
      <Header />
      <main>
      <div id='singleProductPageContainer'>
        <div id="imagePreview">
        <div class='imagePreviewBtn' onClick={() => setCurrentPreview(backendData[0].game_cover_url)}>
              <img src={backendData[0].game_cover_url}></img>
            </div>
          {(artworks.map(artwork => (
            <div class='imagePreviewBtn' onClick={() => setCurrentPreview(artwork)}>
              <img src={artwork}></img>
            </div>
          )))}
        </div>
        <div id='singleProductImageContainer'>
          <img src={currentPreview}></img>
        </div>
        <div id='singleProductMainInfo'>
          <div id='nameAndDev'>
            <h1>{(backendData[0].name)}</h1>
            <small>{(backendData[0].developer)}</small>
          </div>
          <div id="ratingInfo">
            <h3>{backendData[0].rating}</h3>
            <p>Overall Rating</p>
          </div>
          <div id='priceAndDate'>
            <h2>${(backendData[0].price)}</h2>
            <p>Release Date: {(backendData[0].release_date)}</p>
          </div>
          <div id="joinPlus">
              <h4>Get a $5 Reward When You Go Plus</h4>
              <p>Join Plus</p>
            </div>
            <input id="quantitySelect" type='number' placeholder='#' min={0} max={100}></input>
          <div id='deliveryButtons'>
            <button>Pick Up in-store</button>
            <button>Same Day Delivery</button>
            <button>Ship to Home</button>
          </div>
          <div id="shippingDetails">
            <p>FREE shipping on orders $59+</p>
            <small>Arrives shortly after release day</small>
          </div>
          <div>
            <button id="addToCartBtn" ref={addCartBtn} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
        <div id='singleProductSummary'>
          <div id="productDescription">
            <h2>Product Description</h2>
            <p>{(backendData[0].summary)}</p>
          </div>
          <div>
            <h2>Features</h2>
            <div id="features">
              <div className="subFeature">
                <h3>Genres</h3>
                <ul>
                  {(genres.map(genre => (
                    <li>{genre}</li>
                  )))}
                </ul>
              </div>
              <div className='subFeature'>
                <h3>Game Modes</h3>
                <ul>
                  {(gameModes.map(mode => (
                      <li>{mode}</li>
                    )))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}