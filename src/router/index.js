import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import SingUp from '@/pages/SingUp'
import Pass from '@/pages/Pass'
import User from '@/pages/User'
import UserData from '@/components/UserData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/singup',
      name: 'SingUp',
      component: SingUp
    },
    {
      path: '/password',
      name: 'Pass',
      component: Pass
    },
    { path: '/user',
      component: User,
      children: [
        {
          path: 'data',
          component: UserData
        }
      ]
    }
  ]
})
