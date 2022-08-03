import { createRouter, createWebHistory } from 'vue-router'
const IndexView = () => import(/* webpackChunkName: "index" */ '@/views/IndexView.vue')
const ZhiyuanPlan = () => import(/* webpackChunkName: "ZhiyuanPlan" */ '@/views/ZhiyuanPlan.vue')
const MemberView = () => import(/* webpackChunkName: "MemberView" */ '@/views/MemberView.vue')

const routes = [
  {
    path: '/',
    name: 'Index',
    component: IndexView,
    meta: {
      title: '高考志愿填报'
    }
  },
  {
    path: '/zhiyuanplan',
    name: 'ZhiyuanPlan',
    component: ZhiyuanPlan,
    meta: {
      title: '我的志愿方案',
      requireUserAuthority: 1
    }
  },
  {
    path: '/member',
    name: 'Member',
    component: MemberView,
    meta: {
      title: '会员中心'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
