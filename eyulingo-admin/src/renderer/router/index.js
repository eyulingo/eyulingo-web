import Vue from 'vue'
import Router from 'vue-router'
import AdminView from '../views/AdminHomeView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    }
  ]
})
