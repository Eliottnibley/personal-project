import React from 'react'
import {useState} from 'react'
import './Register.css'
import Axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../../redux/userReducer'
import {useHistory} from 'react-router-dom'

function Register (props) {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const {companyId} = props.match.params

  const history = useHistory()

  function submitForm (e) {
    e.preventDefault()

    if (!firstname || !lastname || !email || !password || !profilePic){
      return alert('Please fill in all information')
    }

    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      profilePic: profilePic,
      companyId: companyId
    }

    if (parseInt(companyId) === 0){
      user.isAdmin = false
    }
    else {
      user.isAdmin = true
    }
    
    Axios.post('/api/auth/register', user)
    .then(res => {
      props.loginUser(res.data)
      history.push('/')
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

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {loginUser})(Register)