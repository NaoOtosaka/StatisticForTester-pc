import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import * as path from "path";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: '仪表盘',
    component: () => import('../views/dashboard/index')
  },
  {
    path: '/data',
    name: '数据',
    component: () => import('../views/data/index'),
    children:[
      {
        path: '/bug',
        component: () => import('../components/data/BugList')
      }
    ]
  },
  {
    path: '/chart',
    name: '图表',
    component: () => import('../views/chart/index')
  },
  {
    path: '/setting',
    name: '设置',
    component: () => import('../views/setting/index')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
