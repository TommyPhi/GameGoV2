import React, { useState, useRef } from 'react'
import Header from "./components/header";
import { Link } from 'react-router-dom'

export default function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const errorBlock = useRef(null)

     function handleSubmit(e) {
      e.preventDefault();
      fetch(process.env.BACKEND_URL + '/userLogin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
     })
    }).then(async (response) => {
      const result = await response.json();
      if(result.error) {
        errorBlock.current.style.display = "block";
      } else {
        errorBlock.current.style.display = "none";
        localStorage.setItem("currentUser", JSON.stringify(result.username))
        localStorage.setItem("userEmail", JSON.stringify(result.email))
        localStorage.setItem("userID", JSON.stringify(result.userID))
        localStorage.setItem("cart", JSON.stringify(result.cartList).replaceAll('"', ''))
        window.location.href = "/";
      }
    })
    }

    return (
        <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GameGO</title>
        <link rel="stylesheet" href="styles.css" />
        <link rel="stylesheet" href="products.css" />
        <Header />
        <main id="main">
          <div id='loginContainer'>
            <h1>Welcome to GameGo</h1>
            <small>Log in to your GameGo account</small>
            <div id='errorLoginMessage' ref={errorBlock}>
              <h4>Username or password is incorrect</h4>
              <p>Please try again!</p>
            </div>
            <form onSubmit={handleSubmit.bind(this)}>
              <label>Username</label>
              <input type='text' name='username' id='userNameInput' onChange={(e) => setUsername(e.target.value)} autoComplete='none'></input>
              <label>Password</label>
              <input type='password' name='password' id='userPasswordInput' onChange={(e) => setPassword(e.target.value)}></input>
              <div id='loginFormButtons'>
                <button type='submit' id='loginButton'>Login</button>
                <small>OR</small>
                <Link to="/register" id="registerButton">
                  <button>
                    Register
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </main>
      </>
      
    );
}