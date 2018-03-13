<template lang="pug">
//- HEADER PAGE
.page-header
  .layout-inner
    header.header__bar
      //- brand
      a.page-brand(
        href='/',
        title='Ir a la página de inicio')
        PageHeaderBrand
      //- Menu
      PageHeaderMenu
      //- search
      PageHeaderSearch
      //- user
      nav.tool-user
        ul.tool-user__grid
          li.tool-user__item.i-bag
            //-vue variable productos en el carrito
            small.badge 1
          //- Is authenticated
          li.tool-user__item.tool-user__item_auth(v-if= 'getAuth')
            figure.tool-user__grid(
              @click='toggleBox()')
              small.badge.badge_user 2
              span.tool-user__avatar
                //-vue variable Notificaciones usuario
                img.tool-user__photo(
                  v-if='user.picture'
                  src='user.picture',
                  alt='')
                span.tool-user__letter(
                  v-else
                ) {{ user.first_name.charAt(0) }}
              //-vue variable user name
              figcaption.tool-user__name {{ user.first_name }}
            transition(name='toggle-scale')
              .user-auth__menu.toggle-box(
                  v-show='active')
                ul.user-auth__list.toggle-box__list
                  li.user-auth__item
                    router-link.user-auth__link(
                      to="/user",
                      title="Ir a tu cuenta") Tu cuenta
                  li.user-auth__item
                    a.user-auth__link(
                      href="",
                      title="Ir a tus compras") Tus compras
                  li.user-auth__item
                    a.user-auth__link(
                      href="",
                      title="Ir a tus Ventas") Tus Ventas
                  li.user-auth__item
                    a.user-auth__link(
                      href="",
                      title="Ir a Centro de mensajes") Centro de mensajes
                  li.user-auth__item
                    a.user-auth__link(
                      @click='logout()'
                      href="/home",
                      title="Cerrar sesión de usuario") Cerrar sesión
          //- Is NOT authenticated
          li.tool-user__item.i-user(v-else
            @click='open') Ingresar
</template>

<script>
// import axios from 'axios'
import PageHeaderBrand from '@/components/PageHeader-brand'
import PageHeaderMenu from '@/components/PageHeader-menu'
import PageHeaderSearch from '@/components/PageHeader-search'

export default {
  name: 'PageHeader',
  components: {
    PageHeaderBrand,
    PageHeaderMenu,
    PageHeaderSearch
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    open: function () {
      this.$emit('open')
    },
    close: function () {
      this.$emit('close')
    },
    toggleBox: function () {
      this.active = !this.active
    },
    logout: function () {
      this.$store.dispatch('user/logOut')
    }
  },
  computed: {
    user () {
      return this.$store.state['user']
    },
    getAuth () {
      return this.$store.getters['user/auth']
    }
  }
}
</script>
