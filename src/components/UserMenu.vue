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
        a.user-nav__link(
          :href='items.url',
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
              url: '#',
              ico: 'i-bank-data'
            },
            {
              name: 'Créditos',
              url: '#',
              ico: 'i-credits'
            },
            {
              name: 'Datos Personales',
              url: '#',
              ico: 'i-data'
            }
          ]
        },
        {
          title: 'Compras',
          items: [
            {
              name: 'Tus Compras',
              url: '#',
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
              url: '#',
              ico: 'i-sale'
            },
            {
              name: 'Valoraciones',
              url: '#',
              ico: 'i-start-line'
            },
            {
              name: 'Método de envío',
              url: '#',
              ico: 'i-shipping'
            }
          ]
        }
      ]
    }
  }
}
</script>
