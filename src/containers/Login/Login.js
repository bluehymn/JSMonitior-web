import React from 'react'
import Login from '../../components/Login/Login'
import {bindActionCreators} from 'redux'
import * as userActions from '../../actions/user'
import {connect} from 'react-redux'
import {userLogin} from '../../service/api'

class LoginContainer extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props.location.state)
  }
  
  render() {
    return (
      <div>
        <Login onLogin={this.onLogin.bind(this)}/>
      </div>
    )
  }

  onLogin (username, password) {
    userLogin({
      username,
      password
    })
      .then(response => {
        const jwtToken = response.token
        this.props.actions.loginSuccessful(jwtToken, username)
        this.props.history.push('/home', {logined: true})
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('用户不存在')
        }
      })
  }
}

export default connect(
  null,
  dispatch => ({
    actions: bindActionCreators(userActions, dispatch)
  })
)(LoginContainer)