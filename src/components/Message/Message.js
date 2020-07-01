import React from 'react'
import './Message.css'

function Message (props) {

  // message: "hgf"
  // message_identifier: "user2:user10"
  // sender: 10
  // time: "2020-07-01T07:45:59.915Z"

  const {messageData, isSender} = props
  const {message, message_identifier, sender, time} = messageData
  return (
    <div className={`message-spacer-${isSender}`}>
      <div className={isSender ? 'sent-message' : 'recieved-message'}>
        {message}
      </div>
    </div>
  )
}

export default Message