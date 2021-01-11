import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import './Member.css'

function Member (props) {
  const {member} = props
  const history = useHistory()
  const [unread, setUnread] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (!props.chatRoom.includes('undefined') && props.myId){
      Axios.get(`/api/messages/unread/${props.myId}/${props.chatRoom}`) 
      .then(res => {
        setUnread(res.data.count)
      })
      .catch(err => {
        console.log(err)
      })
    }

    props.socket.on('sending message to room', data => {
      Axios.get(`/api/messages/unread/${props.myId}/${props.chatRoom}`) 
      .then(res => {
        setUnread(res.data.count)
      })
      .catch(err => {
        console.log(err)
      })
    })

    props.socket.on('logged in array updated', data => {
      setIsLoggedIn(data.includes(member.id))
    })

    Axios.get(`/api/currentLogins/${props.companyId}/${member.id}`)
      .then(res => {
        console.log(res.data)
        setIsLoggedIn(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [props.chatRoom])

  const readMessages = () => {
    Axios.put(`/api/messages/changeRead/${props.myId}/${props.chatRoom}`)
    .then(res => {
      setUnread(0)
    })
    .catch(err => {
      console.log(err)
    })
  }

  if(props.readFrom == props.chatRoom && unread != 0) {
    setUnread(0)
  }

  return (
    <div className='member-container'>
      <div className={`online-indicator-${isLoggedIn}`}></div>
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
            readMessages()
            props.setReadFrom(props.chatRoom)
            props.deSelectPath()
            history.push(`/company/chat/${member.id}`)}
           } className='chatbutton'>Chat
            {unread == 0 ? '' : <div className='unread-count'>{unread}</div>}
           </button>
        </div>
      </div>
    </div>
  )
}

export default Member