import { combineReducers } from 'redux'
import project from './project-reducer'
import user from './user-reducer'

const App = combineReducers({
  project,
  user
})

export default App