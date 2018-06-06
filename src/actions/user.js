import {types} from '../utilities/constants'

export function loginSuccessful (jwtToken, username) {
  return {
    type: types.LOGIN_SUCCESSFUL,
    jwtToken,
    username
  }
}