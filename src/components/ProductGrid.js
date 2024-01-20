import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './productCard'

export default function ProductGrid({url}) {
    
    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch(process.env.BACKEND_URL + url).then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])

    return(
        <>
            {(backendData.map(game => (
                <Link to={`/product/${game.id}`} className='productCard'>
                    <ProductCard key={game.id} image_url={game.game_cover_url} title={game.name} publisher={game.publisher} developer={game.developer} release_date={game.release_date} genres={game.genres} price={game.price}/>
                </Link>
            )))}
        </>
    )
}