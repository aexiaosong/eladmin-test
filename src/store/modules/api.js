// 适配nginx反向代理
const baseUrl = process.env.VUE_APP_BASE_APU === '/' ? '' : process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 上传头像
    updateAvatarApi: baseUrl + '/api/users/updateAvatar',
    // 图片上传
    imagesUploadApi: baseUrl + '/api/localStorage/pictures',
    // 文件上传
    fileUploadApi: baseUrl + '/api/localStorage',
    // sql监控
    sqlApi: baseUrl + '/druid/index.html',
    // swagger
    swaggerApi: baseUrl + 'swagger-ui.html',
    // baseUrl
    baseApi: baseUrl
  }
}

export default api
