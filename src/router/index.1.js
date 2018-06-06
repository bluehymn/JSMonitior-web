import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import ApiList from '../containers/ApiList/ApiList'
import ApiDetail from '../containers/ApiDetail/ApiDetail'
import Login from '../containers/Login/Login'
import history from '../utilities/history'
// import store from '../store/store'
import BasicLayout from '../containers/BasicLayout/BasicLayout'

export default function () {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthorizedRoute
            path="/"
          />
        </Switch>
        {/* <AuthorizedRoute path="/project/:pid/apis" component={ApiList} />
        <AuthorizedRoute path="/home" component={ApiList} />
        <PrivateRoute path="/api/:id" component={ApiDetail} /> */}
      </div>
    </Router>
  )
}

// component={<Component {...props} />}

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  // const route = (
  //   <Route
  //     {...rest}
  //     render={props => {
  //       const logined = store.getState().user.logined
  //       if (logined) {
  //         return (
  //           <BasicLayout component={Component} cprops={props}/>
  //         )
  //       } else {
  //         return <Redirect
  //           to = {{
  //             pathname: "/login",
  //             state: { from: props.location }
  //           }}
  //         />
  //       }
  //     }}
  //   />
  // )
  const routes = () => (
    <div>
      <Route path="/api/:id" component={ApiDetail} />
      <Route path="/project/:pid/apis" component={ApiList} />
      {/* <Route path="/home" component={ApiList} /> */}
      
    </div>
  )
  return (
    <BasicLayout routes={routes}/>
  )
}

