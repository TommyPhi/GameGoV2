import React from 'react'

export default function CartItem(props) {

  return (
    <div>
      <div className="cartItem">
        <div className='cartItemInfo'>
            <div className="cartMainInfo">
                <div className="cartImgContainer">
                    <img src={props.game_cover_url}></img>
                </div>
                <div class='cartMainInfoText'>
                    <h2>{props.title}</h2>
                    <small>Condition: New</small>
                </div>
            </div>
            <h2>${props.price}</h2>
        </div>
        <div className='cartItemOptions'>
            <div>
                <h4>Quantity:</h4>
                <div className="cartItemButtons">
                    <input type='number' placeholder='Qty' min={0} max={100}></input>
                    <p onClick={props.handleRemove} id={props.id}>Remove</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
