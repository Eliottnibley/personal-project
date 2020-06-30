import React, {useState, useEffect} from 'react'
import './Company.css'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Switch, Route} from 'react-router-dom'
import io from 'socket.io-client'
import ChatGroups from '../ChatGroups/ChatGroups'
import Files from '../Files/Files'
import Projects from '../Projects/Projects'
import Admin from '../Admin/Admin'
import ManageMembers from '../ManageMembers/ManageMembers'
import Axios from 'axios'
import Member from '../Member/Member'

function Company (props) {
  const [selectedPath, setSelectedPath] = useState('')
  const [members, setmembers] = useState([])
  const [membersLoggedIn, setMembersLoggedIn] = useState([])
  const history = useHistory()

  useEffect(() => {
    if(!props.isLoggedIn){
      history.push('/')
    }
  
    if(!props.user.companyId){
      history.push('/joincompany')
    }
    else {
      Axios.get(`/api/company/members/${props.user.companyId}`)
      .then(res => {
        setmembers(res.data)
      })
      .catch(err => {
        console.log(err)
      })

      Axios.get(`/api/currentLogins?companyId=${props.user.companyId}`)
      .then(res => {
        setMembersLoggedIn(res.data)
      })
      .catch(err => {
        console.log(err)
      })

      props.socket.emit('join room', {room: `company ${props.user.companyId} room`})

      props.socket.on('logged in array updated', data => {
        setMembersLoggedIn(data)
      })
    }
  }, [history, props.isLoggedIn, props.user.companyId])


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
  
  const membersMap = members.map(elem => {
    return (
      <Member member={elem} loggedIn={membersLoggedIn.includes(elem.id)} key={elem.id}/>
    )
  })

  if(props.user.isAdmin){
    return (
      <div className='company-container'>
        <div className='company-content'>
          <Switch>
            <Route path='/company/chatgroups' component={ChatGroups}/>
            <Route path='/company/files' component={Files}/>
            <Route path='/company/projects' component={Projects}/>
            <Route path='/company/admin' component={Admin}/>
            <Route path='/company/managemembers' component={ManageMembers}/>
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
          <div className='memberlist'>
            {membersMap}
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
          <div className='memberlist'>
            {membersMap}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Company)