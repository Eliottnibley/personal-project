import React from 'react'
import './Member.css'

function Member (props) {
  const {member} = props
  return (
    <div className='member-container'>
      <div className='online-indicator'></div>
      <div className='pic-container'>
        <img src={member.profile_pic}/>
      </div>
      <div className='member-info'>
        <div className='member-name'>
          {`${member.firstname} ${member.lastname}`}
        </div>
        <div className='member-email'>
          {`${member.email}`}
        </div>
        <div className='member-buttons'>
          <button className='chatbutton'>Chat</button>
        </div>
      </div>
    </div>
  )
}

export default Member