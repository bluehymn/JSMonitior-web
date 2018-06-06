import React from 'react'
import {Input, Button} from 'antd'
import { Link } from 'react-router-dom'

 class Login extends React.Component {
   
  userName = null
  password = null

  handleUserNameChange (e) {
    this.userName = e.target.value
  }

  handlePasswordChange (e) {
    this.password = e.target.value
  }

  handleLogin () {
    this.props.onLogin(this.userName, this.password)
  }

  render () {
    return (
      <div>
        <Input onChange={this.handleUserNameChange.bind(this)}/>
        <Input onChange={this.handlePasswordChange.bind(this)}/>
        <Button type="primary" onClick={this.handleLogin.bind(this)}>登录</Button>
        <Link to="/home"><Button type="primary" >主页</Button></Link>
        
      </div>
    )
  }
  
}

export default Login