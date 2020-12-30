import request from '@/utils/request'

export function resetEmail(data) {
  return request({
    url: 'api/code/resetEmail?email=' + data,
    method: 'post'
  })
}

export function resetPass(data) {
  return request({
    url: 'api/code/email/resetPass?email=' + data,
    method: 'post'
  })
}
