import React from 'react'
import './Admin.css'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

function Admin (props) {
  const history = useHistory()

  if (!props.isLoggedIn){
    history.push('/')
  }
  if (!props.user.isAdmin){
    history.push('/company')
  }

  return (
    <div className='admin-container'>
      <div className='people-manager'>
        <h5>Manage Company Members</h5>
        <p>This is where admins can controls people inside the company. You can view member profiles, drop members from your company, and invite new members.</p>
        <button onClick={() => history.push('/company/managemembers')}>Manage Members</button>
      </div>
      <div className='chatgroup-manager'>
        <h5>Manage Chat Groups</h5>
        <p>This is where admins can control all of the activity that happens with the chat groups for the company. You can add remove chat groups at anytime.</p>
        <button>Manage Groups</button>
      </div>
      <div className='projects-manager'>
        <h5>Manage Company Projects</h5>
        <p>This is where admins can control and organize project managment. Projects can be created, edited, an removed from here</p>
        <button>Manage Projects</button>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Admin)