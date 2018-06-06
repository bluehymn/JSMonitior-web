import React from 'react'
import ErrorItem from '../../components/Error/Error'
import {getError} from '../../service/api'

class ApiDetailContainer extends React.Component {
  id = null
  constructor(props) {
    super(props)
    console.log(props.match.params)
    this.id = props.match.params.id
    this.state = {
      data: {
        message: null
      }
    }
    this.getApiDetail(this.id)
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged()
    }
  }

  onRouteChanged () {
    this.id = this.props.match.params.pid
    this.getApiDetail(this.id)
  }

  getApiDetail (id) {
    getError(id)
      .then(response => {
        this.setState({
          data: response.data
        })
      })
  }

  render () {
    return (
      <div>
        <ErrorItem ref="test" data={this.state.data}/>
      </div>
    )
  }
}

export default ApiDetailContainer