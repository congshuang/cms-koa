import NotFoundView from "../components/404.vue";
import login from "../pages/other/login.vue";


const routes = [
  {path: '/login', component: login, name: '登陆',meta: {requiresAuth: true}},
  {path: '/404', component: NotFoundView, name: '404',meta: {requiresAuth: true}},
  {path: '/lock', component: (resolve) => require(['@/components/layout/lock.vue'],resolve),meta: {requiresAuth: true}, name: 'lock'},
  {path: '*', redirect: '/404'},
  {
    path: '',
    component: (resolve) => require(['@/app.vue'],resolve),
    name: '系统设置',
    meta: {requiresAuth: true},
    children: [
      {path: '/', component: (resolve) => require(['@/pages/other/index.vue'],resolve), name: '主页',meta: {requirePath: '/'},},
      {path: '/test', component: (resolve) => require(['@/pages/other/test.vue'],resolve), name: '测试',meta: {requirePath: '/test'}},
    ]
  }
]


export default routes

