import Vue from "vue";
import VueRouter from "vue-router";
import routeConfig from "./routes";
import store from "../store"
import * as api from "../api";
import {
  setTitle,
  findMenuId
} from '@/common/utils'
//加载路由中间件
Vue.use(VueRouter);
// 寻找子菜单的父类
function findMenuParent(tag) {
  let tagCurrent = []
  const menu = store.getters.menu
  tagCurrent.push(tag)
  return tagCurrent

}


//定义路由
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: routeConfig,
})
const whiteList = ['/login', '/404'];
const lockPage = '/lock';
const loginPage = '/login';
router.beforeEach((to, from, next) => {

  const value = to.query.src ? to.query.src : to.path
  const label = to.query.name ? to.query.name : to.name
  if (whiteList.indexOf(value) === -1) {
    store.commit('ADD_TAG', {
      label: label,
      value: value,
      query: to.query
    })
  }
  if (from.name!=='login') {

    if (store.getters.isLock && to.path !== lockPage) {
      next({
        path: lockPage
      })
    }else if(store.getters.menuList.length == 0){
      next({
        path: loginPage
      })
    }else{
      let list = store.getters.menuList;
      if(list.some(item => item.path == to.meta.requirePath)){
        next();
      }
    }

  }else {
    next();

  }
});
router.afterEach((to, from, next) => {
  setTimeout(() => {
    const tag = store.getters.tag;
    setTitle(tag.label);
    store.commit('SET_TAG_CURRENT', findMenuParent(tag))

  }, 0)
});
export default router
