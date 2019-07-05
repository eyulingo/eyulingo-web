import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/LoginView.vue'
import AdminView from './views/AdminHomeView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    }
  ]
})
