import React from 'react'
import {useHistory} from 'react-router-dom'
import './Member.css'

function Member (props) {
  const {member} = props
  const history = useHistory()

  return (
    <div className='member-container'>
      <div className={`online-indicator-${props.loggedIn}`}></div>
      <div className='pic-container'>
        <img alt='' src={member.profile_pic}/>
      </div>
      <div className='member-info'>
        <div className='member-name'>
          {`${member.firstname} ${member.lastname}`}
        </div>
        <div className='member-email'>
          {`${member.email}`}
        </div>
        <div className='member-buttons'>
          <button onClick={() => {
            props.deSelectPath()
            history.push(`/company/chat/${member.id}`)}
           } className='chatbutton'>Chat</button>
        </div>
      </div>
    </div>
  )
}

export default Member