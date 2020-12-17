import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav/Nav'
import { connect } from 'react-redux';
import Axios from 'axios';

function App(props) {
  if (props.user) {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      e.stopPropagation()

      props.socket.emit('user logged out', {userIdRemove: props.user.userId, companyId: props.user.companyId, room: `company ${props.user.companyId} room`})

      props.logoutUser()

      Axios.delete('/api/auth/logout')
    })
  }

  return (
    <div className='app-container'>
      <Nav/>
      {routes}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(App)
