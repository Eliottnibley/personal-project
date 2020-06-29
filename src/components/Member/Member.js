import React from 'react'
import './Member.css'

function Member (props) {
  const {member} = props
  return (
    <div className='member-container'>
      {`this is ${member.firstname} ${member.lastname}`}
    </div>
  )
}

export default Member