import React from 'react'
import {bindActionCreators} from 'redux'
import * as projectActions from '../../actions/project'
import {connect} from 'react-redux'
import {myEmitter} from '../../events'
import { Modal, Input } from 'antd'
import request from '../../utilities/request'

export class AddProject extends React.Component {
  constructor(props) {
    super(props)
    myEmitter.on('openCreateProjectModal', () => {
      this.showModal()
    })
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  state = {
    visible: false,
    confirmLoading: false,
    name: null
  }

  showModal() {
    this.setState({
      visible: true,
    })
  }

  handleCancel() {
    this.setState({
      visible: false,
    })
  }

  handleOk() {
    request({
      method: 'post',
      url: '/project',
      token: true,
      data: {
        name: this.state.name
      }
    })
      .then(response => {
        let ret = response
        this.setState({
          visible: false
        })
        this.props.dispatch('insertProject', ret.data)
      })
      .catch(error => {

      })
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  render () {
    const { visible, confirmLoading } = this.state

    return (
      <Modal
        title="Create New Project"
        visible={visible}
        onOk={this.handleOk.bind(this)}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel.bind(this)}
      >
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore="Project Name" defaultValue="NewProject" onChange={this.handleNameChange}/>
        </div>
      </Modal>
    )
  }
}

export default connect(
  dispatch => ({
    actions: bindActionCreators(projectActions, dispatch)
  })
)(AddProject)
