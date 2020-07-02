import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import GetStarted from './components/GetStarted/GetStarted'
import RegisterCompany from './components/RegisterCompany/RegisterCompany'
import Company from './components/Company/Company'
import JoinCompany from './components/JoinCompany/JoinCompany'
import Profile from './components/Profile/Profile'

export default (
  <Switch>
    <Route path='/login' component={Login}/>
    <Route path='/register/:companyId' component={Register}/>
    <Route path='/getstarted' component={GetStarted}/>
    <Route path='/registercompany' component={RegisterCompany}/>
    <Route path='/company' component={Company}/>
    <Route path='/joincompany' component={JoinCompany}/>
    <Route path='/profile' component={Profile}/>
  </Switch>
)