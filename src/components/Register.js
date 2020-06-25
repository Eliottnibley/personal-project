import React from 'react'
import {useState, useEffect} from 'react'
import './Register.css'

function Register (props) {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setProfilePic] = useState('')

  function submitForm (e) {
    e.preventDefault()

  }

  return (
    <div className='register-container'>
      <form onSubmit={e => submitForm(e)}>
        <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
        <input placeholder='Firstname' value={firstname} onChange={e => setFirstname(e.target.value)}/>
        <input placeholder='Lastname' value={lastname} onChange={e => setLastname(e.target.value)}/>
        <input placeholder='Profile picture' value={profilePic} onChange={e => setProfilePic(e.target.value)}/>
        <button onClick={(e) => submitForm(e)}>Register</button>
      </form>
    </div>
  )
}

export default Register