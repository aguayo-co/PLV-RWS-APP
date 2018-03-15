import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import SignUp from '@/pages/SignUp'
import Pass from '@/pages/Pass'
import User from '@/pages/User'
import UserData from '@/components/UserData'
import PublicarVenta from '@/pages/publicar-venta'
import Producto from '@/pages/Producto'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/password',
      name: 'password',
      component: Pass
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: 'data',
          component: UserData
        }
      ]
    },
    {
      path: '/publicar-venta',
      name: 'publicar-venta',
      component: PublicarVenta
    },
    {
      path: '/producto/:product-slug',
      name: Producto,
      component: Producto
    }
    // Provisional, no borrar proxima implementacion bajo
    // indicacion de Juan David
    //
    // { path: '/producto/:product-slug',
    //   name: Producto,
    //   component: Producto
    // }
  ]
})
