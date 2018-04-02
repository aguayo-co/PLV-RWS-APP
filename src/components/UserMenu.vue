<template lang="pug">
.side
  h2.headline Tu cuenta
  //- User Nav
  nav.user-nav
    //- User Menu lista
    dl.user-nav__list(
      v-for='list in UserNavList')
      dt.user-nav__title {{ list.title }}
      dd.user-nav__item(
        v-for='items in list.items')
        router-link.user-nav__link(
          :to='items.url',
          :class='items.ico') {{ items.name }}

</template>

<script>
export default {
  name: 'UserMenu',
  data () {
    return {
      UserNavList: [
        {
          title: 'General',
          items: [
            {
              name: 'Notificaciones',
              url: '#',
              ico: 'i-bell'
            },
            {
              name: 'Datos Bancarios',
              url: '/user/datos-bancarios',
              ico: 'i-bank-data'
            },
            {
              name: 'Créditos',
              url: '#',
              ico: 'i-credits'
            },
            {
              name: 'Datos Personales',
              url: '/user/data',
              ico: 'i-data'
            }
          ]
        },
        {
          title: 'Compras',
          items: [
            {
              name: 'Tus Compras',
              url: '/user/tus-ventas',
              ico: 'i-bag'
            },
            {
              name: 'Tus favoritos',
              url: '#',
              ico: 'i-favorite'
            }
          ]
        },
        {
          title: 'Ventas',
          items: [
            {
              name: 'Tu closet',
              url: '#',
              ico: 'i-closet'
            },
            {
              name: 'Tus Ventas',
              url: '/user/tus-ventas',
              ico: 'i-sale'
            },
            {
              name: 'Valoraciones',
              url: '#',
              ico: 'i-start-line'
            },
            {
              name: 'Método de envío',
              url: '/user/metodos-envios',
              ico: 'i-shipping'
            },
            {
              name: 'Cerrar sesión',
              url: '#',
              ico: ''
            }
          ]
        }
      ]
    }
  }
}
</script>
