import React from 'react'
import './Nav.css'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

function Nav (props) {
  const history = useHistory()

  function toggleSelect (path) {
    history.push(path)
    // insert dynamic styling for the menu selector
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
        <div>
          
        </div>
        <div className='nav-menu'>
          <ul>
            <li onClick={() => history.push('/')}>Home</li>
            <li onClick={() => history.push('/getstarted')}>Company</li>
            <li onClick={() => history.push('/contactus')}>Contact Us</li>
            <li onClick={() => history.push('/login')}>Logout</li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Nav)