import React from 'react'

export default function Trending(props) {
  return (
        <div>
            <div id="trending" className="trending">
            <div className="trending-overlay">
                <img src={props.logo} />
                <button>SHOP NOW</button>
            </div>
            <img
                id="lotf-trending"
                className="trending-banner"
                src={props.banner}
            />
        </div>
    </div>
  )
}
