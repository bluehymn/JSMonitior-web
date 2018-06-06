import { createStore } from 'redux'
import reducers from '../reducers'
import * as userActions from '../actions/user'
import * as storage from './localstorage'


const store = createStore(
  reducers, /* preloadedState, */
  // applyMiddleware(ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// 恢复用户信息
if (storage.getItem('JWTTOKEN')) {
  const JWTTOKEN = storage.getItem('JWTTOKEN')
  const USERNAME = storage.getItem('USERNAME')
  store.dispatch(userActions.loginSuccessful(JWTTOKEN, USERNAME))
}

export default store