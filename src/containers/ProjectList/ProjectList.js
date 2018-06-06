import React from 'react'
import request from '../../utilities/request'
import {bindActionCreators} from 'redux'
import * as projectActions from '../../actions/project'
import {connect} from 'react-redux'
import Project from '../../components/Project/Project'
import Confirm from '../Modals/Confirm'
import {myEmitter} from '../../events'
import { Menu } from 'antd'
import {getProjects} from '../../service/api'
import history from '../../utilities/history'

class ProjectList extends React.Component {

  constructor (props) {
    super(props)
    this.getProjects()
    this.state = {
      defaultSelectedProject: null
    }
  }
  
  componentWillUnmount () {}

  selectProject (id) {
    this.props.actions.switchProject(id)
    history.push('/project/' + id + '/errors')
    // myEmitter.emit('switchProject', id)
  }

  getProjects () {
    getProjects()
      .then(response => {
        let list = response
        this.setState({
          defaultSelectedProject: list[0]._id
        })
        this.props.actions.refreshProjects(list)
        if (this.props.projectId === null) {
          this.props.actions.switchProject(this.state.defaultSelectedProject)
          history.replace('/project/' + this.state.defaultSelectedProject + '/errors')
        }
      })
      .catch(function (error) {
        console.log(error.status)
      })
  }

  deleteProject (id, e) {
    e.stopPropagation()
    myEmitter.emit('openConfirm', {
      text: '删除' + id,
      okCallback: () => {
        return new Promise((resolve, reject) => {
          request({
            method: 'delete',
            url: '/project',
            data: {
              id: id
            }
          })
            .then(response => { 
              this.props.actions.deleteProject(id)
              resolve()
            })
            .catch(function (error) {
              console.log(error)
            })
        })
      },
      cancelCallback: () => {console.log('cancel')}
    })
  }

  render() {
    return (
      <div>
        <Menu
          defaultSelectedKeys={[this.state.defaultSelectedProject]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >  
          <Menu.SubMenu key="sub1" title={<span><span>项目</span></span>}>
            {
              this.props.projects.map(item => {
                return (
                  <Menu.Item key={item._id}>
                    <div onClick={() => this.selectProject(item._id)}>
                      <Project data={item} deleteProject={this.deleteProject.bind(this, item._id)}/>
                    </div>
                  </Menu.Item>
                )
              })
            }
          </Menu.SubMenu>
        </Menu>
        <Confirm />
      </div>
    )
  }
}

export default connect(
  state => ({
    projectId: state.project.projectId,
    projects: state.project.projects
  }),
  dispatch => ({
    actions: bindActionCreators(projectActions, dispatch)
  })
)(ProjectList)
