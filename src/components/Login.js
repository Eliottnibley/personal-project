import React from 'react'
import {useState, useEffect} from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../redux/userReducer'

function Login (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  function submitForm (e) {
    e.preventDefault()

    const user = {
      email: email,
      password: password
    }

    Axios.post('/api/auth/login', user)
    .then(res => {
      props.loginUser(res.data)
    })
    .catch(err => {
      alert('Email or Password is incorrect')
    })
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

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {loginUser})(Login)