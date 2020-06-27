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
            WorkSpace
          </h1>
          <div className='nav-menu'>
            <ul>
              <li className='/' onClick={() => this.toggleSelect('/')}>Home</li>
              <li className='/getstarted' onClick={() => this.toggleSelect('/getstarted')}>Get Started</li>
              <li className='/contactus' onClick={() => this.toggleSelect('/contactus')}>Contact Us</li>
              <li className='/login/0' onClick={() => this.toggleSelect('/login/0')}>Login</li>
            </ul>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='nav-container'>
          <h1>
            WorkSpace
          </h1>
          <div className='nav-menu'>
            <ul>
              <li className='/' onClick={() => this.toggleSelect('/')}>Home</li>
              <li className='/company' onClick={() => this.toggleSelect('/company')}>Company</li>
              <li className='/contactus' onClick={() => this.toggleSelect('/contactus')}>Contact Us</li>
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