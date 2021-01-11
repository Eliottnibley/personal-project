import React from 'react'
import {useState} from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../../redux/userReducer'
import {useHistory} from 'react-router-dom'

function Login (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  
  function submitForm (e) {
    e.preventDefault()

    if (!email || !password){
      return alert('Please fill in all information')
    }

    const user = {
      email: email,
      password: password
    }

    Axios.post('/api/auth/login', user)
    .then(res => {
      props.loginUser(res.data)

      props.socket.emit('user logged in', {userId: res.data.userId, companyId: res.data.companyId, room: `company ${res.data.companyId} room`})

      history.push('/company')
    })
    .catch(err => {
      alert(err)
    })
  }
  
  return (
    <div className='login-container'>
      <form onSubmit={e => submitForm(e)}>
        <input placeholder='Email' value={email}onChange={e => setEmail(e.target.value)}/>
        <input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
        <button onClick={(e) => submitForm(e)}>Login</button>
        <p>Don't have an account?</p>
        <Link to={`/register/0`}>Click Here</Link>
      </form>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {loginUser})(Login)