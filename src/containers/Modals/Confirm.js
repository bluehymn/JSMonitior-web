import React, { Component } from 'react'
import { Modal } from 'antd'
import {myEmitter} from '../../events'

export default class Confirm extends Component {

  constructor(props) {
    super(props)
    myEmitter.on('openConfirm', ({title, text, okCallback, cancelCallback}) => {
      this.setState({
        visible: true
      })
      this.title = title || '提示'
      this.text = text
      this.okCallback = okCallback
      this.cancelCallback = cancelCallback
    })
  }

  state = {
    visible: false,
    confirmLoading: false
  }

  showModal() {
    this.setState({
      visible: true
    })
  }

  handleCancel() {
    this.setState({
      visible: false,
    })
    this.cancelCallback()
  }

  handleOk() {
    this.okCallback()
      .then(() => {
        this.setState({
          visible: false,
        })
      })
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  render () {
    const { visible, confirmLoading } = this.state

    return (
      <Modal
        title="提示"
        visible={visible}
        onOk={this.handleOk.bind(this)}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel.bind(this)}
      >
        {this.text}
      </Modal>
    )
  }
}
