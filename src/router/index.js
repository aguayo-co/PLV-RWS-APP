import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import SignUp from '@/pages/SignUp'
import Pass from '@/pages/Pass'
import User from '@/pages/User'
import UserData from '@/components/UserData'
import UserMetodoEnvio from '@/components/UserMetodoEnvio'
import UserDatosBancarios from '@/components/UserDatosBancarios'
import UserTusVentas from '@/components/UserTusVentas'
import UserTusCompras from '@/components/UserTusCompras'
import UserTuCloset from '@/components/UserTuCloset'
import UserNotificaciones from '@/components/UserNotificaciones'
import UserValoraciones from '@/components/UserValoraciones'
import PublicarVenta from '@/pages/PublicarVenta'
import Producto from '@/pages/Producto'
import Compra from '@/pages/compra'
import Categoria from '@/pages/categoria'

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
          component: UserDatosBancarios
        },
        {
          path: 'tus-ventas',
          name: 'user-tus-ventas',
          component: UserTusVentas
        },
        {
          path: 'tus-compras',
          name: 'user-tus-compras',
          component: UserTusCompras
        },
        {
          path: 'notificaciones',
          name: 'user-notificaciones',
          component: UserNotificaciones
        },
        {
          path: 'tu-closet',
          name: 'user-tu-closet',
          component: UserTuCloset
        },
        {
          path: 'valoraciones',
          name: 'user-valoraciones',
          component: UserValoraciones
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
      path: '/compra/:id?',
      name: 'compra',
      component: Compra,
      props: true
    },
    {
      path: '/categoria',
      name: 'Categoria',
      component: Categoria
    }
  ]
})
