import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <div className='sign-in-div'>
      <form className="sign-in-form">
        <p className="sign-in-form-title">Sign in to your account</p>
        <div className="sign-in-input-container">
          <input type="email" placeholder="Enter email" />
          <span>
          </span>
        </div>
        <div className="sign-in-input-container">
          <input type="password" placeholder="Enter password" />
        </div>
        <button type="submit" className="sign-in-submit">
          Sign in
        </button>
        <p className="signup-link">
          No account? 
          <Link to="/register">Register</Link>
        </p>
      </form> 
    </div>
  )
}

export default Login