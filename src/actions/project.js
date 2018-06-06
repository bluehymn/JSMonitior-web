import {types} from '../utilities/constants'

export function switchProject (id) {
  return {
    type: types.SWITCH_PROJECT,
    projectId: id
  }
}

export function insertProject (project) {
  return {
    type: types.INSERT_PROJECT,
    project: project
  }
}

export function refreshProjects (projects) {
  return {
    type: types.REFRESH_PROJECTS,
    projects: projects
  }
}

export function deleteProject (id) {
  return {
    type: types.DELETE_PROJECT,
    id: id
  }
}