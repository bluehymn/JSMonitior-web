import {types} from '../utilities/constants'
import * as storage from '../store/localstorage'

const INITIAL_STATE = {
  username: null,
  jwtToken: window.localStorage.getItem('JWTTOKEN'),
  logined: false
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESSFUL:
      storage.setItem('JWTTOKEN', action.jwtToken)
      storage.setItem('USERNAME', action.username)
      return Object.assign({}, state, {
        username: action.username,
        jwtToken: action.jwtToken,
        logined: true
      })
    default:
      return state
  }
}