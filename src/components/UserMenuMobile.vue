<template lang="pug">
nav.user-menu
  ul.user-menu__list(:class="{openUserMenu : menuUsuaria}")
    li.user-menu__item
      a(href="#", title="title").user-menu__icon.i-shop
    li.user-menu__item
      a(href="#", title="title").user-menu__icon.i-bell
    li.user-menu__item
      a(href="#", title="title").user-menu__icon.i-user
    li.user-menu__item.user-menu__item_burguer(@click.stop="openMenuUsuaria")
      span.menu-ico.user-menu__icon(:class="{'menu-ico_open' : menuUsuaria}")
        span.menu-ico__line
        span.menu-ico__line
        span.menu-ico__line
    transition(name='slide-right')
      .side(v-show="menuUsuaria")
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
  name: 'UserMenuMobile',
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
              url: '/user/tus-compras',
              ico: 'i-bag'
            },
            {
              name: 'Tus favoritos',
              url: '/user/tus-favoritos',
              ico: 'i-favorite'
            }
          ]
        },
        {
          title: 'Ventas',
          items: [
            {
              name: 'Tu closet',
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
      ],
      menuUsuaria: false
    }
  },
  methods: {
    openMenuUsuaria: function () {
      this.menuUsuaria = !this.menuUsuaria
      console.log('click')
    }
  }
}
</script>
