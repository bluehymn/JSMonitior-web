import React from 'react'
import './style.css'
import {Row, Col, Icon} from 'antd'

export default function Project ({data, deleteProject}) {
  return (
    <Row className="project">
      <Col span={18}>{data.name}</Col>
      <Col span={6} style={{textAlign: 'right'}}>
        <Icon type="delete" className="delete" onClick={deleteProject}/>
      </Col>
    </Row>
  )
}