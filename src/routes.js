import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

export default (
  <Switch>
    <Route path='/login' component={Login}/>
    <Route path='/register' component={Register}/>
  </Switch>
)