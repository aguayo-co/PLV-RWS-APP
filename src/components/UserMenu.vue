<template lang="pug">
.side
  .side__sticky
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
              url: '/user/notificaciones',
              ico: 'i-bell'
            },
            {
              name: 'Datos Bancarios',
              url: '/user/datos-bancarios',
              ico: 'i-bank-data'
            },
            {
              name: 'Créditos',
              url: '/user/creditos',
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
              url: '/user/tus-compras',
              ico: 'i-bag'
            },
            {
              name: 'Tus Favoritos',
              url: '/user/tus-favoritos',
              ico: 'i-favorite'
            }
          ]
        },
        {
          title: 'Ventas',
          items: [
            {
              name: 'Tu Clóset',
              url: '/user/tu-closet',
              ico: 'i-closet'
            },
            {
              name: 'Tus Ventas',
              url: '/user/tus-ventas',
              ico: 'i-sale'
            },
            {
              name: 'Valoraciones',
              url: '/user/valoraciones',
              ico: 'i-start'
            },
            {
              name: 'Método De Envío',
              url: '/user/metodos-envios',
              ico: 'i-shipping'
            },
            {
              name: 'Cerrar Sesión',
              url: '#',
              ico: 'i-x'
            }
          ]
        }
      ]
    }
  }
}
</script>
