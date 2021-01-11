import React, {Component} from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import Loader from 'react-loader-spinner'
import Message from '../Message/Message'
import './Chat.css'

class Chat extends Component {
  constructor(props) {
    super()
    this.state = {
      messages: [],
      otherUser: null,
      inputText: '',
      currentRoom: '',
      isLoading: true
    }

  }

  updateScroll () {
    setTimeout(() => {
      let myDiv = document.getElementsByClassName('messages')
      if (myDiv[0]) {
        myDiv[0].scrollTop = myDiv[0].scrollHeight
      }
    }, 100)
  }

  getChatData = async (props) => {
    const {userId} = props.match.params

    if (parseInt(userId) < parseInt(this.props.user.userId)){
      this.setState({currentRoom: `user${userId}:user${this.props.user.userId}`})
    }
    else {
      this.setState({currentRoom: `user${this.props.user.userId}:user${userId}`})
    }

    const res = await Axios.get(`/api/company/chat?userId=${userId}&myId=${this.props.user.userId}`)
    
    const profile = await Axios.get(`/api/company/${userId}`)

    this.setState({messages: res.data, otherUser: profile.data})
    this.updateScroll()
  }

  componentWillMount() {
    if (!this.props.isLoggedIn){
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(props) {
    this.setState({isLoading: true})
    this.setState({otherUser: null})
    this.getChatData(props)
  }

  componentDidMount() {
    this.getChatData(this.props)

    this.props.socket.on('sending message to room', data => {
      if (data.room == this.state.currentRoom) {
        const mess = this.state.messages
        mess.push(data.message)

        this.setState({messages: mess})
        this.updateScroll()

        Axios.put(`/api/messages/changeRead/${this.props.user.userId}/${this.state.currentRoom}`)
        .then(res => {
          console.log('messages have been read')
        })
      }
    })
  }

  submit (event) {
    event.preventDefault()
    event.stopPropagation()

    if (!this.state.inputText) {
      return
    }
    
    const timeStamp = new Date()

    const messageData = {
      message: this.state.inputText,
      time: timeStamp.toISOString(),
      sender: this.props.user.userId,
      identifier: this.state.currentRoom,
      read: false
    }

    this.props.socket.emit('message to room', {room: this.state.currentRoom, message: messageData})

    Axios.post('/api/company/message', messageData)
    .then(res => {
      console.log('messge post into database')
    })
    .catch(err => {
      console.log(err)
    })

    this.setState({inputText: ''})
  }

  render () {
    if (this.state.otherUser && this.state.isLoading && this.state.currentRoom) {
      this.setState({isLoading: false})
    }

    if (!this.state.isLoading) {
      const {messages, otherUser, inputText} = this.state
      const myId = this.props.user.userId

      const messagesMap = messages.map(elem => {
        return (
          <Message 
            key={elem.time} 
            isSender={elem.sender === myId} 
            messageData={elem} 
          />
        )
      })

      return (
        <div className='chat-container'>
          <div className='messages'>
            {messagesMap}
          </div>
          <div className='input-bar'>
            <form onSubmit={e => this.submit(e)}>
              <input 
              placeholder={otherUser ? `Messege ${otherUser.firstname} ${otherUser.lastname}` : ''}
              value={inputText}
              onChange={e => this.setState({inputText: e.target.value})}></input>
              <button onClick={(e) => this.submit(e)}>Send</button>
            </form> 
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='chat-container'>
          <div className='loader-container'>
            <Loader
              type='ThreeDots'
              color="#00BFFF" 
              height={200} 
              width={200}
            />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Chat)