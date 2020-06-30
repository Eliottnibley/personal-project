import io from 'socket.io-client'

const initialState = {
  user: {},
  socket: io.connect(':3030'),
  isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(user) {
  const action = {
    type: LOGIN_USER,
    socket: io.connect(':3030'),
    payload: user
  }

  return action
}


export function logoutUser () {
  const action = {
    type: LOGOUT_USER,
    payload: initialState
  }

  return action
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return{...state, user: action.payload, socket: action.socket, isLoggedIn: true}
    case LOGOUT_USER:
      return {...state, ...action.payload}
    default:
      return initialState
  }
}