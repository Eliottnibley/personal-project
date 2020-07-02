import React from 'react'
import './Message.css'

function Message (props) {

  // message: "hgf"
  // message_identifier: "user2:user10"
  // sender: 10
  // time: "2020-07-01T07:45:59.915Z"
  // newTime: Wed Jul 01 2020 08:52:32 GMT-0600 (Mountain Daylight Time)

  const {messageData, isSender} = props
  let {message, time} = messageData
  time = time.toString()
  time = time.split('')
  let min = [time[14], time[15]].join('')
  let hour = parseInt([time[11], time[12]].join(''))
  let morn = 'PM'
  if (hour > 12){
    hour -= 12
    morn = 'AM'
  }
  if(hour === 0){
    hour = 12
  }
  const newTime = `${hour}:${min} ${morn}`

  return (
    <div className={`message-spacer-${isSender}`}>
      <div className={isSender ? 'sent-message' : 'recieved-message'}>
        {message}
      </div>
      <div className='time-container'>
        {newTime}
      </div>
    </div>
  )
}

export default Message