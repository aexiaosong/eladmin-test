const getters = {
  // api
  baseApi: state => state.api.baseApi,
  sqlApi: state => state.api.sqlApi,
  swaggerApi: state => state.api.swaggerApi,
  updateAvatarApi: state => state.api.updateAvatarApi,
  imagesUploadApi: state => state.api.imagesUploadApi,
  fileUploadApi: state => state.api.fileUploadApi,
  // app
  size: state => state.app.size,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // permission
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  // user
  roles: state => state.user.roles,
  user: state => state.user.user,
  loadMenus: state => state.user.loadMenus,
  token: state => state.user.token,
  // tagsView
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
