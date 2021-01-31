import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '仪表盘',
    component: () => import('../views/dashboard/index')
  },
  {
    path: '/dashboard',
    name: '仪表盘',
    component: () => import('../views/dashboard/index')
  },
  {
    path: '/data',
    component: () => import('../views/data/index'),
    children:[
      {
        path:'/',
        redirect:'project'
      },
      {
        path: 'project',
        name: '项目数据表',
        component: () => import('../views/data/project')
      },
      {
        path: 'developer',
        name: '开发数据表',
        component: () => import('../views/data/developer')
      },
      {
        path: 'tester',
        name: '测试数据表',
        component: () => import('../views/data/tester')
      },
      // {
      //   path: 'planner',
      //   name: '策划数据表',
      //   component: () => import('../views/data/planner')
      // },
      {
        path: 'bug',
        name: 'BUG数据表',
        component: () => import('../views/data/bug')
      }
    ]
  },
  {
    path: '/chart',
    component: () => import('../views/chart/index'),
    children: [
      {
        path:'/',
        redirect:'tester'
      },
      // {
      //   path: 'project',
      //   name: '项目图表',
      //   component: () => import('../views/chart/project')
      // },
      // {
      //   path: 'developer',
      //   name: '开发图表',
      //   component: () => import('../views/chart/developer')
      // },
      {
        path: 'tester',
        name: '测试图表',
        component: () => import('../views/chart/tester')
      },
      // {
      //   path: 'planner',
      //   name: '策划图表',
      //   component: () => import('../views/chart/planner')
      // },
      {
        path: 'bug',
        name: 'BUG图表',
        component: () => import('../views/chart/bug')
      }
    ]
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
