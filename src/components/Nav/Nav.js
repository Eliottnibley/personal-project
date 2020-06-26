import React from 'react'
import './Nav.css'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import { logoutUser } from '../../redux/userReducer'
import Axios from 'axios'

function Nav (props) {
  const history = useHistory()

  if (!props.isLoggedIn){
    history.push('/')
  }

  function toggleSelect (path) {
    history.push(path)
    // insert dynamic styling for the menu selector
  }

  function logout () {
    Axios.delete('/api/auth/logout')
    .then(res => {
      props.logoutUser()
    })
    .catch (err => {
      console.log('logout did not work')
    })
  }

  if (!props.isLoggedIn) {
    return (
      <div className='nav-container'>
        <h1>
          WorkSpace
        </h1>
        <div className='nav-menu'>
          <ul>
            <li className='/' onClick={() => toggleSelect('/')}>Home</li>
            <li className='/getstarted' onClick={() => toggleSelect('/getstarted')}>Get Started</li>
            <li className='/contactus' onClick={() => toggleSelect('/contactus')}>Contact Us</li>
            <li className='/login' onClick={() => toggleSelect('/login')}>Login</li>
          </ul>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='nav-container'>
        <h1>
          WorkSpace
        </h1>
        <div className='nav-menu'>
          <ul>
            <li onClick={() => history.push('/')}>Home</li>
            <li onClick={() => history.push('/company')}>Company</li>
            <li onClick={() => history.push('/contactus')}>Contact Us</li>
            <li onClick={() => logout()}>Logout</li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {logoutUser})(Nav)