import React, {Component} from 'react'
import './Nav.css'
import {connect} from 'react-redux'
import { logoutUser } from '../../redux/userReducer'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class Nav extends Component {
  constructor () {
    super()
    this.state = {
      selectedPath: ''
    }
    this.toggleSelect = this.toggleSelect.bind(this)
    this.logout = this.logout.bind(this)
  }

  componenDidMount () {
    
  }

  toggleSelect (path){
    const {selectedPath} = this.state
    const prevElem = document.getElementsByClassName('selected')[0]
    
    if (prevElem) {
      prevElem.className = selectedPath
    }

    const {history} = this.props
    history.push(path)
    
    const elem = document.getElementsByClassName(path)[0]

    elem.className = 'selected'
    this.setState({selectedPath: path})
  }

  logout () {
    Axios.delete('/api/auth/logout')
    .then(res => {
      if(this.props.user.companyId){
        this.props.socket.emit('user logged out', {userIdRemove: this.props.user.userId, companyId: this.props.user.companyId,
        room: `company ${this.props.user.companyId} room`})
      }
      this.props.logoutUser()
    })
    .catch (err => {
      console.log('logout did not work')
    })
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <div className='nav-container'>
          <h1>
            AwayOffice365
          </h1>
          <div className='nav-menu'>
            <ul>
              <li className='/' onClick={() => this.toggleSelect('/')}>Home</li>
              <li className='/getstarted' onClick={() => this.toggleSelect('/getstarted')}>Get Started</li>
              <li className='/contactus' onClick={() => this.toggleSelect('/contactus')}>Contact Us</li>
              <li className='/login' onClick={() => this.toggleSelect('/login')}>Login</li>
            </ul>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='nav-container'>
          <h1>
            AwayOffice365
          </h1>
          <div className='nav-menu'>
            <ul>
              <li id="profile" className='/profile' onClick={() => this.toggleSelect('/profile')}>{`${this.props.user.firstname} ${this.props.user.lastname}`}</li>
              <li className='/company' onClick={() => this.toggleSelect('/company')}>{this.props.user.companyName ? this.props.user.companyName : "Company"}</li>
              {/* <li className='/contactus' onClick={() => this.toggleSelect('/contactus')}>Contact Us</li> */}
              <li onClick={() => this.logout()}>Logout</li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {logoutUser})(Nav))