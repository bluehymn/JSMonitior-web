import React from 'react'
import { Router, Route, Redirect } from 'react-router-dom'
import ErrorList from '../containers/ErrorList/ErrorList'
import ErrorItem from '../containers/Error/Error'
import Login from '../containers/Login/Login'
import history from '../utilities/history'
import store from '../store/store'
import BasicLayout from '../containers/BasicLayout/BasicLayout'

export default function () {
  return (
    <Router history={history}>
      <div>
        <Route path="/login" component={Login} />
        <AuthorizedRoute path="/home" component={ErrorList} />
        <AuthorizedRoute path="/project/:pid/errors" component={ErrorList} />
        <AuthorizedRoute path="/error/:id" component={ErrorItem} />
      </div>
    </Router>
  )
}

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const logined = store.getState().user.logined
        if (logined) {
          return (
            <BasicLayout component={Component} cprops={props}/>
          )
        } else {
          return <Redirect
            to = {{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        }
      }}
    />
  )
}

