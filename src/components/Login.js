import React from 'react'
import {useState, useEffect} from 'react'
import './Login.css'
import {Link} from 'react-router-dom'

function Login (prop) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  function submitForm (e) {
    e.preventDefault()
  }
  
  return (
    <div className='login-container'>
      <form onSubmit={e => submitForm(e)}>
        <input placeholder='Email' value={email}onChange={e => setEmail(e.target.value)}/>
        <input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
        <button onClick={(e) => submitForm(e)}>Login</button>
        <p>Don't have an account?</p>
        <Link to='/register'>Click Here</Link>
      </form>
    </div>
  )
}

export default Login