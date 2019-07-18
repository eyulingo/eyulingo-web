import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/LoginView.vue'
import DistInfo from '../components/DistInfo.vue'
import StoreInfo from '../components/StoreInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/distInfo',
          name: 'distInfo',
          component: DistInfo
        },
        {
          path: '/storeInfo',
          name: 'storeInfo',
          component: StoreInfo
        }
      ]
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
