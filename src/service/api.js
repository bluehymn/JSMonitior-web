import request from '../utilities/request'

export async function userLogin (params){
  return request({
    url: '/login',
    method: 'put',
    data: params
  })
}

export async function getProjects () {
  return request({
    url: '/project',
    method: 'get',
    token: true
  })
}

export async function getError (id) {
  return request({
    url: '/error/' + id,
    method: 'get',
    token: true
  })
}

export async function getErrors (pid, page, pagesize) {
  return request({
    url: `/project/${pid}/errors?page=${page}&pagesize=${pagesize}`,
    method: 'get',
    token: true
  })
}
