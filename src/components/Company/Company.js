import React, {useState} from 'react'
import Axios from 'axios'
import './Company.css'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Switch, Route} from 'react-router-dom'
import ChatGroups from '../ChatGroups/ChatGroups'
import Files from '../Files/Files'
import Projects from '../Projects/Projects'
import Admin from '../Admin/Admin'

function Company (props) {
  const [selectedPath, setSelectedPath] = useState('')
  const history = useHistory()

  if(!props.isLoggedIn){
    history.push('/')
  }

  function togglePath (path) {
    const prevElem = document.getElementsByClassName('company-selected')[0]

    if(prevElem){
      prevElem.className = selectedPath
    }

    history.push(path)

    const elem = document.getElementsByClassName(path)[0]

    elem.className = 'company-selected'
    setSelectedPath(path)
  }
  
  if(props.user.isAdmin){
    return (
      <div className='company-container'>
        <div className='company-content'>
          <Switch>
            <Route path='/company/chatgroups' component={ChatGroups}/>
            <Route path='/company/files' component={Files}/>
            <Route path='/company/projects' component={Projects}/>
            <Route path='/company/admin' component={Admin}/>
          </Switch>
        </div>
        <div className='company-nav'>
          <div className='company-nav-menu'>
            <ul>
              <li className='/company/chatgroups' onClick={() => togglePath('/company/chatgroups')}>Chat Groups</li>
              <li className='/company/files' onClick={() => togglePath('/company/files')}>Files</li>
              <li className='/company/projects' onClick={() => togglePath('/company/projects')}>Projects</li>
              <li className='/company/admin' onClick={() => togglePath('/company/admin')}>Admin</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='company-container'>
        <div className='company-content'>
          <Switch>
            <Route path='/company/chatgroups' component={ChatGroups}/>
            <Route path='/company/files' component={Files}/>
            <Route path='/company/projects' component={Projects}/>
          </Switch>
        </div>
        <div className='company-nav'>
          <div className='company-nav-menu'>
            <ul>
              <li className='/company/chatgroups' onClick={() => togglePath('/company/chatgroups')}>Chat Groups</li>
              <li className='/company/files' onClick={() => togglePath('/company/files')}>Files</li>
              <li className='/company/projects' onClick={() => togglePath('/company/projects')}>Projects</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Company)