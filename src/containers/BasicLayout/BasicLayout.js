import React, { Component } from 'react'
import Projects from '../ProjectList/ProjectList'
import CreateProject from '../CreateProject/CreateProject'
import {myEmitter} from '../../events'

import './BasicLayout.css'
import { Layout, Button, Row, Col } from 'antd'
const { Header, Sider, Content } = Layout

class App extends Component {

  openCreateProjectModal() {
    myEmitter.emit('openCreateProjectModal')
  }

  render() {
    return (
      <div>      
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="header" style={{ position: 'fixed', width: '100%', zIndex: '10000', overflow: 'auto' }}>
            <Row>
              <Col span={6}><div className="logo">JSMonitior</div></Col>
              <Col span={6}></Col>
              <Col span={6}></Col>
              <Col span={6}><Button type="primary" size="large" className="add-project" onClick={this.openCreateProjectModal}>新建项目</Button></Col>
            </Row>
          </Header>
          <Layout style={{marginTop: '64px', marginLeft: '200px'}}>
            <Sider width={200} style={{height: '100vh', overflow: 'auto', left: 0, position: 'fixed', top: '64px'}}>
              <Projects />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content style={{ overflow: 'auto'}}>
                <this.props.component {...this.props.cprops}/>
              </Content>
            </Layout>
          </Layout>
        </Layout>
        <CreateProject/>
      </div>
    )
  }
}

export default App
