import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import SignUp from '@/pages/SignUp'
import Pass from '@/pages/Pass'
import User from '@/pages/User'
import UserData from '@/components/UserData'
import PublicarVenta from '@/pages/publicar-venta'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
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
    },
    { path: '/publicar-venta',
      name: PublicarVenta,
      component: PublicarVenta
    }
  ]
})
