import React from 'react'
import {Row, Col} from 'antd'
import './Error.css'

export default class ErrorDetail extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      data: {}
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      data: nextProps.data
    })
  }

  render () {
    return (
      <div className="error-detail-content">
        <h3 style={{ marginBottom: 16, marginTop: 15 }}>Error 详情</h3>
        <Row className="row">
          <Col span={4}>Message</Col><Col span={20}>{this.state.data.message}</Col>
        </Row>
        <Row className="row">
          <Col span={4}>File</Col><Col span={20}>{this.state.data.file}</Col>
        </Row>
        <Row className="row">
          <Col span={4}>Url</Col><Col span={20}>{this.state.data.url}</Col>
        </Row>
        <Row className="row">
          <Col span={4}>Time</Col><Col span={20}>{this.state.data.timestamp}</Col>
        </Row>
        <Row className="row">
          <Col span={4}>Line</Col><Col span={20}>{this.state.data.line}</Col>
        </Row>
        <Row className="row">
          <Col span={4}>Col</Col><Col span={20}>{this.state.data.col}</Col>
        </Row>
        <Row className="row">
          <Col span={4}>Http Headers</Col><Col span={20}>{this.state.data.ua}</Col>
        </Row>
      </div>
    )
  }
}