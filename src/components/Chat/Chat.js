import React, {Component} from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import Message from '../Message/Message'
import './Chat.css'

class Chat extends Component {
  constructor(props) {
    super()
    this.state = {
      messages: [],
      otherUser: {},
      inputText: '',
      currentRoom: ''
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

    this.props.socket.emit('join room', {room: this.state.currentRoom})
    

    this.setState({messages: res.data})

    const profile = await Axios.get(`/api/company/${userId}`)

    this.setState({otherUser: profile.data})
    this.updateScroll()
  }

  componentWillMount() {
    if (!this.props.isLoggedIn){
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(props) {
    this.getChatData(props)
  }

  componentDidMount() {
    this.getChatData(this.props)

    this.props.socket.on('sending message to room', () => {
      Axios.get(`/api/company/chat?userId=${this.state.otherUser.id}&myId=${this.props.user.userId}`)
      .then(res => {
        this.setState({messages: res.data})
        this.updateScroll()
      })
      .catch(err => {
        console.log(err)
      })
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
      text: this.state.inputText,
      time: timeStamp.toISOString(),
      sender: this.props.user.userId,
      identifier: this.state.currentRoom
    }

    Axios.post('/api/company/message', messageData)
    .then(res => {
      this.props.socket.emit('message to room', {room: this.state.currentRoom})
      this.setState({inputText: ''})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render () {
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
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Chat)