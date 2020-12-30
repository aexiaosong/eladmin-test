import router from './routers'
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css'
import Config from '@/settings'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { filterAsyncRouter } from '@/store/modules/permission'
import { buildMenus } from '@/api/system/menu'

NProgress.configure({ showSpinner: false }) // 进度环显示隐藏

const whiteList = ['/login'] // 不进行重定向的白名单

router.beforeEach((to, from, next) => {
  // 修改网页标题
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start() // 开启进度条
  if (getToken()) { // cookie里有token
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') { // 已经登录直接跳转到首页
      next({ path: '/' })
      NProgress.done() // 进度条结束
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(() => { // 拉取user_info
          // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else if (store.getters.loadMenus) { // 登录时未拉却菜单，在此处拉取
        // 修改成false，防止死循环(再次进来时就是false不会再去拉取菜单)
        store.dispatch('updateLoadMenus')
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else { // cookie里面没有token
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done() // 进度条结束
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const sdata = JSON.parse(JSON.stringify(res))
    const rdata = JSON.parse(JSON.stringify(res))
    const sidebarRoutes = filterAsyncRouter(sdata)
    const rewriteRoutes = filterAsyncRouter(rdata, true)
    rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })

    store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
      router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
    store.dispatch('SetSidebarRouters', sidebarRoutes)
  })
}

router.afterEach(() => {
  NProgress.done() // 进度条结束
})
