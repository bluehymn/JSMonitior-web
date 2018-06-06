import {types} from '../utilities/constants'

const INITIAL_STATE = {
  projectId: null,
  projects: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SWITCH_PROJECT:
      return Object.assign({}, state, {
        projectId: action.projectId
      })
    case types.INSERT_PROJECT:
      let projects = state.project.concat()
      projects.push(action.project)
      return Object.assign({}, state, {
        projects: projects
      })
    case types.REFRESH_PROJECTS:
      return Object.assign({}, state, {
        projects: action.projects
      })
    case types.DELETE_PROJECT:
      let id = action.id
      let list = state.projects.concat()
      for (let i = 0; i < list.length; i++ ) {
        if (list[i]._id === id) {
          list.splice(i, 1)
          break
        }
      }
      return Object.assign({}, state, {
        projects: list
      })
    default:
      return state
  }
}
