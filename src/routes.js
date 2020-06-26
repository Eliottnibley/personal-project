import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import GetStarted from './components/GetStarted/GetStarted'
import RegisterCompany from './components/RegisterCompany'

export default (
  <Switch>
    <Route path='/login' component={Login}/>
    <Route path='/register/:companyId' component={Register}/>
    <Route path='/getstarted' component={GetStarted}/>
    <Route path='/registercompany' component={RegisterCompany}/>
  </Switch>
)