import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom';
import userLogo from '../assets/icons/user_icon.png'
import cartLogo from '../assets/icons/cart_icon.png'

export default function Header() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [settingsUrl, setSettingsUrl] = useState('/login')
  const userName = useRef(null);
  const userNameInitial = useRef(null)
  const menuLoginBtn = useRef(null);
  const menuRegisterBtn = useRef(null);
  const menuLogoutBtn = useRef(null);

  useEffect(() => {
    if(localStorage.getItem("currentUser") === null) {
      setLoggedIn(false)
      userName.current.textContent = "Guest"
      userNameInitial.current.textContent = "G"
      menuLoginBtn.current.style.display = "block";
      menuRegisterBtn.current.style.display = "block";
      menuLogoutBtn.current.style.display = "none";
      setSettingsUrl('/login')
    } else {
      setLoggedIn(true)
      setSettingsUrl('/settings')
      userName.current.textContent = "User";
      userNameInitial.current.textContent = localStorage.getItem("currentUser").replaceAll('"', '').toUpperCase()[0];
      menuLoginBtn.current.style.display = "none";
      menuRegisterBtn.current.style.display = "none";
      menuLogoutBtn.current.style.display = "block";
    }
  })

  function logout() {
    if(localStorage.getItem('cart') || localStorage.getItem('cart') === '') {
      fetch(process.env.REACT_APP_BACKEND_URL + '/saveCart', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: localStorage.getItem('userID'),
            cartList: localStorage.getItem('cart')
        })
        }).then(async (response) => {
        const result = await response.json();
        if(result.error) {
            console.log(result.error)
        } else {
            console.log(result.success)
        }
        })
    } else {
      localStorage.clear();
    }
    localStorage.clear();
  }
  

  function openNav() {
    document.getElementById("sidenav").style.width = "350px";
    document.getElementById("sidenav").style.padding = "60px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.querySelector('main').style.filter = "brightness(0.4)";
  }
  
// Function that closes side navigation
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("sidenav").style.padding = "0";
  document.body.style.backgroundColor = "white";
  document.querySelector('main').style.filter = "none";
}
  return (
    <header id="header">
    <nav>
      <div id="sidenav" className="side-nav">
        <div className="top-sidenav">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={closeNav}
          >
            ×
          </a>
        </div>
        <h1>Shop by Category</h1>
        <div className="side-nav-links">
          <a href="/products">Video Games</a>
          <a href="/contact">Contact</a>
          <a href="/login" ref={menuLoginBtn}>Login</a>
          <a href="/register" ref={menuRegisterBtn}>Register</a>
          <a href="/" onClick={logout} ref={menuLogoutBtn}>Logout</a>
        </div>
      </div>
    </nav>
    <nav>
      <div className="main-nav">
        <div className="nav-wrapper">
          <span className="side-nav-btn" onClick={openNav}>
            ☰
          </span>
          <a href="/" className="brand-logo">
            Game<span id="brand-logo-go">Go</span>
          </a>
          <form action="/filter">
            <div>
              <input
                id="nav-search-bar"
                type="text"
                placeholder="Search games, consoles & more"
                name="search"
                autoComplete="off"
              />
            </div>
          </form>
          <div className="nav-btns">
            <div className='navIconBtns'>
              <Link to={settingsUrl}>
                <p ref={userNameInitial}></p>
              </Link>
              <small ref={userName}></small>
            </div>
            <div className='navIconBtns'>
              <Link to='/cart'>
                <img className="headerIcons" id="cart-icon" src={cartLogo} />
              </Link>
              <small>Cart</small>
            </div>
          </div>
        </div>
        <ul className="tabs">
          <a href="#whatsNew">
            <li>WHAT'S NEW?</li>
          </a>
          <a href="#trending">
            <li>TRENDING NOW</li>
          </a>
          <a href="#deals-title">
            <li>DEALS OF THE DAY</li>
          </a>
          <a href="#creator">
            <li>CREATOR SPOTLIGHT</li>
          </a>
          <a href="#gamegostart">
            <li>GAMEGO START</li>
          </a>
        </ul>
      </div>
    </nav>
  </header>
  )
}
