import userReducer from './userReducer'
import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

export default createStore(userReducer, applyMiddleware(promiseMiddleware))