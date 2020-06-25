import React from 'react'
import './Nav.css'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

function Nav (props) {
  const history = useHistory()

  return (
    <div className='nav-container'>
      <div>
        {props.user.firstname}
      </div>
      <div className='nav-menu'>
        <ul>
          <li onClick={() => history.push('/')}>Home</li>
          <li onClick={() => history.push('/getstarted')}>Get Started</li>
          <li onClick={() => history.push('/contactus')}>Contact Us</li>
          <li onClick={() => history.push('/login')}>Login</li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Nav)