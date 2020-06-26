import React from 'react'
import './RegisterCompany.css'
import {useEffect, useState} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'

function RegisterCompany (props) {
  const [name, setName] = useState('')
  const history = useHistory()

  function submitForm (e) {
    e.preventDefault()
    Axios.post('/api/auth/registercompany', {name: name})
    .then(res => {
      history.push(`/register/${res.data.id}`)
    })
    .catch(err => {
      alert('Company name is already taken')
    })
  }

  return (
    <div className='register-company-container'>
      <form onSubmit={(e) => submitForm(e)}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder='Company Name'></input>
        <button onClick={(e) => submitForm(e)}>Register</button>
      </form>
    </div>
  )
}

export default RegisterCompany