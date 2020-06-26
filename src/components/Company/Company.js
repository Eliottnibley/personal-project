import React from 'react'
import './Company.css'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'

function Company (props) {
  const history = useHistory()

  if(!props.isLoggedIn){
    history.push('/')
  }
  
  if(props.user.isAdmin){
    return (
      <div className='company-container'>
        <div className='company-nav'>
          <div className='company-nav-menu'>
            <ul>
              <li>Chat Groups</li>
              <li>Files</li>
              <li>Projects</li>
              <li>Admin</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='company-container'>
        <div className='company-nav'>
          <div className='company-nav-menu'>
            <ul>
              <li>Chat Groups</li>
              <li>Files</li>
              <li>Projects</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Company)