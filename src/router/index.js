import Vue from 'vue'
import Router from 'vue-router'

import Conversation from '@/components/Conversation'
import NewPrivateMessage from '@/components/NewPrivateMessage'
import UserCreditos from '@/components/UserCreditos'
import UserData from '@/components/UserData'
import UserDatosBancarios from '@/components/UserDatosBancarios'
import UserFavoritos from '@/components/UserFavoritos'
import UserMetodoEnvio from '@/components/UserMetodoEnvio'
import UserNotificaciones from '@/components/UserNotificaciones'
import UserPriloverStar from '@/components/UserPriloverStar'
import UserTuCloset from '@/components/UserTuCloset'
import UserTusCompras from '@/components/UserTusCompras'
import UserTusVentas from '@/components/UserTusVentas'
import UserValoraciones from '@/components/UserValoraciones'
import AyudaAumentarVentas from '@/pages/AyudaAumentarVentas'
import AyudaComoCobrar from '@/pages/AyudaComoCobrar'
import AyudaComoComprar from '@/pages/AyudaComoComprar'
import AyudaComoEnviar from '@/pages/AyudaComoEnviar'
import AyudaComoFunciona from '@/pages/AyudaComoFuncionaPrilov'
import AyudaDevolverProducto from '@/pages/AyudaDevolverProducto'
import AyudaPreguntasFrecuentes from '@/pages/AyudaPreguntasFrecuentes'
import AyudaPriloverStar from '@/pages/AyudaPriloverStar'
import AyudaTerminos from '@/pages/AyudaTerminos'
import Closet from '@/pages/Closet'
import Valoraciones from '@/pages/Valoraciones'
import CompraGuest from '@/pages/CompraGuest'
import Contenido from '@/pages/Contenido'
import EditarProducto from '@/pages/EditarProducto'
import Home from '@/pages/Home'
import Instashop from '@/pages/Instashop'
import PasswordRecoverySet from '@/pages/PasswordRecoverySet'
import PasswordRequest from '@/pages/PasswordRequest'
import Producto from '@/pages/Producto'
import ProductosFiltrado from '@/pages/ProductosFiltrado'
import PublicarVenta from '@/pages/PublicarVenta'
import PublicarVentaPendiente from '@/pages/PublicarVentaPendiente'
import Search from '@/pages/Search'
import SignUp from '@/pages/SignUp'
import User from '@/pages/User'
import Compra from '@/pages/compra'
import prilovers from '@/pages/prilovers'

import beforeEach from './beforeEach'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Elige la ropa que no usas y dale una segunda oportunidad',
        metaTags: [
          { name: 'description', content: 'Únete a la comunidad de Clósets más cool de Chile. Descubre productos que te encantan y compralos casi regalados.' }
        ]
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/password',
      name: 'password',
      component: PasswordRequest
    },
    {
      path: '/password/token/:tokenString/:email',
      name: 'password-recovery',
      component: PasswordRecoverySet
    },
    {
      path: '/compra-invitado',
      name: 'compra-guest',
      component: CompraGuest,
      meta: {
        title: 'Estás a un paso de completar tu compra'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true
      },
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
          path: 'creditos',
          name: 'user-creditos',
          component: UserCreditos
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
          path: 'notificaciones/:threadId',
          name: 'conversation',
          component: Conversation
        },
        {
          path: 'privado/:recipientId',
          name: 'privateMessage',
          component: NewPrivateMessage
        },
        {
          path: 'tu-closet',
          name: 'user-tu-closet',
          component: UserTuCloset
        },
        {
          path: 'prilover-star',
          name: 'user-prilover-star',
          component: UserPriloverStar
        },
        {
          path: 'valoraciones',
          name: 'user-valoraciones',
          component: UserValoraciones
        },
        {
          path: 'tus-favoritos',
          name: 'user-tus-favoritos',
          component: UserFavoritos
        }
      ]
    },
    {
      path: '/publicar-venta',
      name: 'publicar-venta',
      component: PublicarVenta
    },
    {
      path: '/editar-producto/:productId',
      name: 'editar-producto',
      component: EditarProducto,
      meta: {
        requiresAuth: true,
        title: 'Editar producto',
        metaTags: [
          { name: 'description', content: 'Edita los atributos y comisión de tu produco' }
        ]
      }
    },
    {
      path: '/venta-publicada/pendiente',
      name: 'venta-publicada-pendiente',
      component: PublicarVentaPendiente
    },
    {
      path: '/producto/:slug',
      name: 'product',
      component: Producto
    },
    {
      path: '/closet/:userId',
      name: 'closet',
      component: Closet
    },
    {
      path: '/closet/:userId/valoraciones',
      name: 'valoraciones',
      component: Valoraciones
    },
    {
      path: '/compra/:path?',
      name: 'compra',
      component: Compra,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search/:query',
      name: 'search',
      component: Search
    },
    // Instashop debe ser de primer nivel.
    // Tiene su propia página.
    // Si una usuaria llega a la campaña, redirigir
    // a primer nivel.
    {
      path: '/shop/campanas/instashop',
      redirect: '/instashop'
    },
    {
      path: '/instashop',
      name: 'Instashop',
      component: Instashop
    },
    // Closet room es una campaña, sin página propia
    // pero que la URL debe ser de primer nivel.
    // SI la usuaria visita la campaña, redirigir a primer nivel.
    // La ruta de primer nivel es un alias a la página
    // estándar de campañas.
    {
      path: '/shop/campanas/closet-room',
      redirect: 'closet-room'
    },
    {
      path: '/closetroom',
      name: 'closet-room',
      component: ProductosFiltrado,
      props: {type: 'campanas', slug: 'closetroom'}
    },
    {
      path: '/shop',
      name: 'productos',
      component: ProductosFiltrado
    },
    {
      path: '/shop/:type/:slug',
      name: 'productos-filtrado',
      component: ProductosFiltrado,
      props: true
    },
    {
      path: '/prilovers',
      name: 'prilovers',
      component: prilovers
    },
    {
      path: '/contenido',
      name: 'contenido',
      component: Contenido
    },
    {
      path: '/como-enviar',
      name: 'como-enviar',
      component: AyudaComoEnviar
    },
    {
      path: '/como-cobrar',
      name: 'como-cobrar',
      component: AyudaComoCobrar
    },
    {
      path: '/aumentar-ventas',
      name: 'aumentar-ventas',
      component: AyudaAumentarVentas
    },
    {
      path: '/ser-prilover',
      name: 'ser-prilover',
      component: AyudaPriloverStar
    },
    {
      path: '/devolver-producto',
      name: 'devolver-producto',
      component: AyudaDevolverProducto
    },
    {
      path: '/como-comprar',
      name: 'como-comprar',
      component: AyudaComoComprar
    },
    {
      path: '/como-funciona-prilov',
      name: 'como-funciona',
      component: AyudaComoFunciona
    },
    {
      path: '/preguntas-frecuentes',
      name: 'preguntas-frecuentes',
      component: AyudaPreguntasFrecuentes
    },
    {
      path: '/terminos',
      name: 'terminos',
      component: AyudaTerminos
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach(beforeEach)

export default router
