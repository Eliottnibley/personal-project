import React from 'react'
import './GetStarted.css'
import {useHistory} from 'react-router-dom'

function GetStarted (props) {
  const history = useHistory()

  return (
    <div className='get-started-container'>
      <h3>Where to get started?</h3>
      <div className='register-options'>
        <div className='start-company'>
          <h4>Register New Company</h4>
          <p>When registering a new company group you will be prompted to give your group a name and then register yourself as the admin of that group. Once registered, you will gain access to all of the functionality of WorkSpace. This includes granting access for others to join your group, starting new projects, and tracking timelines of group activity.</p>
          <button onClick={() => history.push('/registercompany')} className='register-company-button'>Register New Company</button>
        </div>
        <div className='register-user'>
          <h4>Register New User</h4>
          <p>When registering a new user, you will be prompted to provide some information about yourself. It isn't anything to personal, just a name, email, and profile picture. This information is used to help identify you in whatever group you join. Notice, registering does not join a group for you.</p>
          <button onClick={() => history.push('/register/0')} className='register-user-button'>Register New User</button>
        </div>
      </div>
    </div>
  )
}

export default GetStarted