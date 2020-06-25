import React from 'react'
import {useState, useEffect} from 'react'
import './Register.css'
import Axios from 'axios'

function Register (props) {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setProfilePic] = useState('')

  function submitForm (e) {
    e.preventDefault()
    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      profilePic: profilePic
    }
    Axios.post('/api/auth/register', user)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      alert('The email provided is already linked to an account')
    })
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