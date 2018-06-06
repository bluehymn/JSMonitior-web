import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import ReduxThunk from 'redux-thunk'

import App from './containers/App/App'
import registerServiceWorker from './registerServiceWorker'
import './events'
import store from './store/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
