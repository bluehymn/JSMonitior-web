import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {myEmitter} from '../../events'
import { Table, Radio } from 'antd'
import {getErrors} from '../../service/api'
import {Link} from 'react-router-dom'
import './ErrorList.css'

class ApiList extends Component {
  pid = null
  page = 1
  pageSize = 20
  columns = [
    {
      title: 'Message',
      dataIndex: 'message',
      width: 120,
      render: (text, record) => {
        return (<Link to={'/error/' + record._id}>{text}</Link>)
      }
    },
    {
      title: 'Url',
      dataIndex: 'url',
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
    },
    {
      title: '操作',
      key: 'edit',
      width: 220,
      render: (text, record) => {
        return (
          <React.Fragment>
            <Radio.Group size="small" onChange={this.handleSizeChange}>
              <Radio.Button value="1">紧急</Radio.Button>
              <Radio.Button value="2">重要</Radio.Button>
              <Radio.Button value="3">普通</Radio.Button>
              <Radio.Button value="3">忽略</Radio.Button>
            </Radio.Group>
          </React.Fragment>
        )
      }
    }
  ]
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      total: 0
    }
    myEmitter.on('createdNewApi', () => {
      console.log('createdNewApi')
    })
  }

  componentDidUpdate (prevProps) {
    console.log(prevProps.location)
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged()
    }
  }

  onRouteChanged () {
    this.pid = this.props.match.params.pid
    this.getApis()
  }

  componentDidMount() {
    myEmitter.on('switchProject', pid => {
      if (this.pid === pid) return
      this.pid = pid
    })
  }

  openCreateApiModal () {
    myEmitter.emit('openCreateApiModal', this.pid)
  }

  getApis () {
    const pagesize = 20
    getErrors(this.pid, this.page, pagesize)
      .then(response => {
        let list = response.data
        this.setState({
          list: list,
          total: response.total
        })
      })
  }

  changePage (page) {
    this.page = page
    this.getApis()
  }

  delApi () {
    axios({
      url: '/api',
      method: 'get'
    })
  }

  render() {
    return (
      <div className="ApiList">
        <Radio.Group size="large" onChange={this.handleSizeChange} style={{marginTop: 15, marginBottom: 15}}>
          <Radio.Button value="0">所有</Radio.Button>
          <Radio.Button value="1">紧急</Radio.Button>
          <Radio.Button value="2">重要</Radio.Button>
          <Radio.Button value="3">普通</Radio.Button>
          <Radio.Button value="-1">忽略</Radio.Button>
        </Radio.Group>
        <Table
          columns={this.columns}
          dataSource={this.state.list}
          rowKey={(record) => {return record._id}}
          pagination={{
            total: this.state.total,
            pageSize: this.pageSize,
            onChange: this.changePage.bind(this)
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pid: state.project.pid
  }
}

export default connect(
  mapStateToProps
)(ApiList)