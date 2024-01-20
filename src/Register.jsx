import React, { useState, useRef } from 'react'
import Header from "./components/header";
import { Link } from 'react-router-dom'

export default function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const errorBlock = useRef(null);
  const errorMessage = useRef(null)

   function handleSubmit(e) {
    e.preventDefault();
    fetch('/createUser', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
   })
  }).then(async (response) => {
    const result = await response.json();
    if(result.error) {
      errorBlock.current.style.display = 'block';
      errorMessage.current.textContent = result.error;
    } else {
      errorBlock.current.style.display = 'none';
      window.location.href = "/login";
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
            <h1>Create Account</h1>
            <small>Create your account to unlock endless perks!</small>
            <div id='errorLoginMessage' ref={errorBlock}>
              <h4 ref={errorMessage}></h4>
            </div>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input type='text' name='username' id='userNameInput' onChange={(e) => setUsername(e.target.value)} autoComplete='none'></input>
              <label>Email</label>
              <input type='text' name='email' id='userEmailInput' onChange={(e) => setEmail(e.target.value)} autoComplete='none'></input>
              <label>Password</label>
              <input type='password' name='password' id='userPasswordInput' onChange={(e) => setPassword(e.target.value)}></input>
              <label>Confirm Password</label>
              <input type='password' name='confirmPassword' id='userConfirmPasswordInput' onChange={(e) => setConfirmPassword(e.target.value)}></input>
              <div id='loginFormButtons'>
                <button id='createAccountBtn' type='submit' onClick={handleSubmit}>Create Account</button>
                <small>OR</small>
                <Link to='/login' id="registerButton">
                  <button>Login</button>
                </Link>
              </div>
            </form>
          </div>
        </main>
      </>
      
    );
}