const initialState = {
  user: {},
  isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(user) {
  const action = {
    type: LOGIN_USER,
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
      return{...state, user: action.payload, isLoggedIn: true}
    case LOGOUT_USER:
      return {...state, ...action.payload}
    default:
      return initialState
  }
}