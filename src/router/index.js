import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import SignUp from '@/pages/SignUp'
import Pass from '@/pages/Pass'
import User from '@/pages/User'
import UserData from '@/components/UserData'
import UserMetodoEnvio from '@/components/UserMetodoEnvio'
import DatosBancarios from '@/components/DatosBancarios'
import PublicarVenta from '@/pages/publicar-venta'
import Producto from '@/pages/Producto'
import Compra from '@/pages/compra'

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
          name: 'user-data',
          component: UserData
        },
        {
          path: 'metodos-envios',
          name: 'user-metodos-envios',
          component: UserMetodoEnvio
        },
        {
          path: 'datos-bancarios',
          name: 'user-datos-bancarios',
          component: DatosBancarios
        }
      ]
    },
    {
      path: '/publicar-venta',
      name: 'publicar-venta',
      component: PublicarVenta
    },
    {
      path: '/producto/:slug',
      name: 'product',
      component: Producto
    },
    {
      path: '/compra',
      name: 'compra',
      component: Compra
    }
  ]
})
