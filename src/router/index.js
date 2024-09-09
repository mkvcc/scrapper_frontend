import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: "/robots",
        name: "robots",
        meta: {
          title: "ربات ها",
        },
        component: () =>
          import("../views/Robots.vue"),
      },
      {
        path: "/executes",
        name: "executes",
        meta: {
          title: "اجرا ها",
        },
        component: () =>
          import("../views/Executes.vue"),
      },
      {
        path: "/history/:id",
        name: "history",
        meta: {
          title: "تاریخچه",
        },
        component: () =>
          import("../views/ExecutesHistory.vue"),
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
