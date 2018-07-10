<template lang="pug">
nav.user-menu
  ul.user-menu__list(:class="{openUserMenu : menuUsuaria}")
    li.user-menu__item
      router-link.user-menu__icon.i-shop(
        @click.native="closeMenuUsuaria",
        :to="{ name: 'user-tu-closet'}",
        title="Ir a tu Clóset")
    li.user-menu__item
      router-link.user-menu__icon.i-bell(
        @click.native="closeMenuUsuaria",
        :to="{ name: 'user-notificaciones'}",
        title="Ver Tus Notificaciones")
    li.user-menu__item
      router-link.user-menu__icon.i-user(
        @click.native="closeMenuUsuaria",
        :to="{ name: 'user-data'}",
        title="Ver Tu Perfil")
    li.user-menu__item.user-menu__item_burguer(
      @click.stop="toggleMenuUsuaria")
      span.menu-ico.user-menu__icon(:class="{'menu-ico_open' : menuUsuaria}")
        span.menu-ico__circle
        span.menu-ico__circle
        span.menu-ico__circle
    transition(name='slide-right')
      .side(v-show="menuUsuaria")
        //- User Nav
        nav.user-nav
          //- User Menu lista
          dl.user-nav__list(
            v-for='list in UserNavList')
            dt.user-nav__title {{ list.title }}
            dd.user-nav__item(
              v-for='items in list.items',
              @click.stop="toggleMenuUsuaria")
              router-link.user-nav__link(
                :to='items.url',
                :class='items.ico') {{ items.name }}
                span.badge(v-if="items.notifications && user.notifications > 0") {{ user.notifications }}
          .user-nav__item
            a.user-nav__link(
              @click.prevent='logout()',
              href="#",
              class='i-x') Cerrar Sesión

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserMenuMobile',
  data () {
    return {
      menuUsuaria: false,
      UserNavList: [
        {
          title: 'General',
          items: [
            {
              name: 'Notificaciones',
              url: '/user/notificaciones',
              ico: 'i-bell',
              notifications: true
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
              name: 'Tus Reviews',
              url: '/user/reviews',
              ico: 'i-like'
            },
            {
              name: 'Método De Envío',
              url: '/user/metodos-envios',
              ico: 'i-shipping'
            },
            {
              name: 'Prilover STAR',
              url: '/user/prilover-star',
              ico: 'i-start'
            }
          ]
        }
      ]
    }
  },
  methods: {
    toggleMenuUsuaria: function () {
      this.menuUsuaria = !this.menuUsuaria
    },
    closeMenuUsuaria: function () {
      this.menuUsuaria = false
    },
    logout: function () {
      this.$store.dispatch('user/logOut')
      this.$router.push({name: 'home'})
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
